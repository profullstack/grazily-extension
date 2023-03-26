import { NS, importJsonData, exportJsonData } from "./utils/index.js";
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

function exportJson(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: exportFromStorage,
    args: [NS],
  });
}

function exportFromStorage(NS) {
  console.log("NS:", NS);
  const data = localStorage.getItem(NS);
  console.log("data1: ", data); // Replace this with the data you want to export
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "data.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importJson(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["./utils/import.js"],
  });
}

function handleImport(tab) {
  console.log("Handle import");
  // importJsonData();
}
