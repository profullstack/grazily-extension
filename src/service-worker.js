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
      break;
    case "childMenuItem2":
      // Perform the desired action for Child Menu Item 2
      console.log("Export clicked");
      break;
  }
};

if (typeof browser !== "undefined") {
  browser.menus.onClicked.addListener(handleMenuClick);
} else {
  chrome.contextMenus.onClicked.addListener(handleMenuClick);
}
