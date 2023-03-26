console.log("Content script loaded!");
const NS = "easyapplier";
const b = typeof browser === "undefined" ? chrome : browser;

b.runtime.onMessage.addListener((data) => {
  console.log("data2", data);
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
  console.log("res: ", res);
  const type = "application/json;charset=utf-8";
  const data = JSON.stringify(res[NS] === undefined ? {} : res[NS]);
  console.log("export data:", data);
  const blob = new Blob([{ foo: "bar" }], { type });
  const url = URL.createObjectURL(blob);
  // ${new Date().toISOString().replace(/:/g, "-")}
  try {
    sendMessage("downloadJSON", {
      filename: `${NS}-data1.json`,
      url,
      saveAs: true,
      conflictAction: "overwrite",
    });
  } catch (err) {
    console.error(err);
  }
}

async function sendMessage(data, opts = {}) {
  console.log("opts2:", opts);
  b.runtime.sendMessage({ type: data, ...opts });
}

// function getCurrentTab() {
//   return b.tabs.query({
//     currentWindow: true,
//     active: true,
//   });
// }
