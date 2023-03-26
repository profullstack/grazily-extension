console.log("Content script loaded!");
const NS = "easyapplier";
const b = typeof browser === "undefined" ? chrome : browser;

b.runtime.onMessage.addListener((data) => {
  const { type } = data;
  console.log("type:", type);
  if (type === "importJSON") {
    handleImport();
  } else if (type === "exportJSON") {
    handleExport();
  }
});

// Create an input button and click it which will trigger...
function handleImport() {
  const input = document.createElement("input");
  input.type = "file";
  input.acceptCharset = "utf-8";
  input.click();
  input.addEventListener("change", handleChange, false);
}

// ... a file reader which will allow you to load the file...
function handleChange(e) {
  e.target.removeEventListener("change", handleChange);
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsText(file, "utf-8");
  reader.addEventListener("loadend", handleLoadJSON, false);
  reader.addEventListener("error", (err) => console.error(err), false);
}

// ... which can then be added to the local storage (I've
// used "archive" here, and added that as a property within
// the storage byt YMMV
async function handleLoadJSON(e) {
  const data = JSON.parse(e.target.data);
  console.log("import data:", data);
  await b.storage.local.set(data[NS]);
}

async function handleExport() {
  const res = await b.storage.local.get(NS);
  console.log("res: ", res[NS]);
  const type = "application/json";
  const data = JSON.stringify(res[NS] === undefined ? {} : res[NS]);
  console.log("export data:", data);
  const blob = new Blob([data], { type });
  const urlObj = URL.createObjectURL(blob);
  try {
    sendMessage("downloadJSON", {
      filename: `${NS}-${new Date().toISOString()}.json`,
      url: urlObj,
      saveAs: true,
      conflictAction: "overwrite",
    });
  } catch (err) {
    console.error(err);
  }
}

async function sendMessage(data, opts = {}) {
  const tabInfo = await getCurrentTab();

  b.tabs.sendMessage(tabInfo[0].id, { type: data, ...opts });
}

function getCurrentTab() {
  return b.tabs.query({
    currentWindow: true,
    active: true,
  });
}
