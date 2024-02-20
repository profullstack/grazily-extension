console.log("Content script loaded!");
const NS = "grazilyapplier";
const extapi = typeof browser === "undefined" ? chrome : browser;

extapi.runtime.onMessage.addListener(async (data) => {
  console.log("data2", data);
  const { type, hostname } = data;
  console.log("type:", type);

  if (type === "importJSON") {
    handleImport();
  } else if (type === "exportJSON") {
    handleExport();
  } else if (type === "apply") {
    await handleApplication(data, hostname);
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
  await extapi.storage.local.set(data[NS]);
}

async function handleApplication(data, hostname) {
  console.log("data:", data, "hostname:", hostname);
  const parts = hostname.split(".");
  console.log("parts:", parts);
  const { populate } = grazilyapplier;
  const profile = data.data;
  let site;

  for (const part of parts) {
    console.log("part: ", part);
    if (populate.hasOwnProperty(part)) {
      console.log("Match found:", part, populate[part]);
      site = populate[part];
      break;
    }
  }

  console.log("found site: ", site);

  await populateSite(profile, site);
}

async function populateSite(profile, site) {
  for (let key in site) {
    if (key === "actions") continue;
    console.log(key, site[key], profile[key], profile);
    const { selector, val } = site[key];

    // populate the form
    const el = document.querySelector(selector);
    el.value = profile[key];

    // post process form fields (ie: focus the form field)
    if (site.actions?.set) {
      for (let ev of site.actions.set) {
        if (ev === "keypress") {
          const keyEvent = new KeyboardEvent("keypress", {
            key: "a",
            code: "KeyA",
            charCode: 97,
            keyCode: 65,
            which: 65,
            shiftKey: false,
            ctrlKey: false,
            altKey: false,
            metaKey: false,
            bubbles: true,
            cancelable: true,
          });

          const clickEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
          });

          el.dispatchEvent(clickEvent);
          el.dispatchEvent(keyEvent);
        } else {
          el[ev]();
        }
      }
    }
  }
}

async function handleExport() {
  const res = await extapi.storage.local.get(NS);
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
  extapi.runtime.sendMessage({ type: data, ...opts });
}

// function getCurrentTab() {
//   return b.tabs.query({
//     currentWindow: true,
//     active: true,
//   });
// }
