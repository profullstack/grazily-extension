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
      handleImport();
      break;
    case "childMenuItem2":
      // Perform the desired action for Child Menu Item 2
      console.log("Export clicked");
      handleExport();
      break;
  }
};

if (typeof browser !== "undefined") {
  browser.menus.onClicked.addListener(handleMenuClick);
} else {
  chrome.contextMenus.onClicked.addListener(handleMenuClick);
}

function handleExport() {
  console.log("Handle export");
  // exportJsonData(NS + "-profile.json");
}

function handleImport() {
  console.log("Handle import");
  // importJsonData();
}
