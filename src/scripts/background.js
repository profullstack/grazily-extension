import { NS, importJsonData, exportJsonData } from "./utils/index.js";
const b = typeof browser === "undefined" ? chrome : browser;

// Create context menu items
const createContextMenuItem = (menuItem) => {
  if (typeof browser !== "undefined") {
    browser.menus.create(menuItem);
  } else {
    chrome.contextMenus.create(menuItem);
  }
};

// Parent menu item
createContextMenuItem({
  id: "parentMenuItem",
  title: "Easy Applier",
  contexts: ["page"],
  // icons: {
  //   16: "assets/icon-16.png",
  //   48: "assets/icon-48.png",
  // },
});

// Child menu items
createContextMenuItem({
  id: "childMenuItem1",
  title: "Import",
  parentId: "parentMenuItem",
  contexts: ["page"],
});

createContextMenuItem({
  id: "childMenuItem2",
  title: "Export",
  parentId: "parentMenuItem",
  contexts: ["page"],
});

// Handle context menu item click
const handleMenuClick = (info, tab) => {
  switch (info.menuItemId) {
    case "childMenuItem1":
      // Perform the desired action for Child Menu Item 1
      console.log("Import clicked");
      handleImport(tab);
      break;
    case "childMenuItem2":
      // Perform the desired action for Child Menu Item 2
      console.log("Export clicked");
      handleExport(tab);
      break;
  }
};

if (typeof browser !== "undefined") {
  browser.menus.onClicked.addListener(handleMenuClick);
} else {
  chrome.contextMenus.onClicked.addListener(handleMenuClick);
}

function handleExport(tab) {
  console.log("Handle export");
  exportJson(tab);
  // exportJsonData(NS + "-profile.json");
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

// function exportJson(tab) {
//   const b = browser || chrome;

//   b.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: exportFromStorage,
//     args: [NS],
//   });
// }

// async function exportFromStorage(NS) {
//   const b = browser || chrome;
//   console.log("NS:", NS);
//   const data = await b.storage.local.get(NS);
//   console.log("data1: ", data); // Replace this with the data you want to export
//   const jsonString = JSON.stringify(data, null, 2);
//   const blob = new Blob([jsonString], {
//     type: "application/json;charset=utf-8",
//   });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = url;
//   link.download = NS + "data.json";
//   link.click();
//   URL.revokeObjectURL(url);
// }

function importJson(tab) {
  sendMessage("importJSON");
  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   files: ["./utils/import.js"],
  // });
}

function exportJson() {
  sendMessage("exportJSON");
}

function handleImport(tab) {
  console.log("Handle import");
  importJson();
}

b.runtime.onMessage.addListener(async (data) => {
  const { type } = data;
  if (type === "downloadJSON") {
    await handleDownload(data);
  }
});

async function handleDownload(data) {
  delete data.type;
  const id = await b.downloads.download(data);
  b.downloads.erase({ id });
}
