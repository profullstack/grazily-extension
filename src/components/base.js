export default class BaseElement extends HTMLElement {
  constructor() {
    super();
    this.ns = "easyapplier";
    this.handleExport = this.handleExport.bind(this);
    this.importJsonData = this.importJsonData.bind(this);
    this.loadCss = this.loadCSS.bind(this);
    this.updateData = this.updateData.bind(this);

    this.attachShadow({ mode: "open" });
    this.loadCSS("./styles/main.css");

    this.jsonData = JSON.parse(localStorage.getItem(this.ns)) || {
      key1: "value1",
      key2: "value2",
    };
  }

  async loadCSS(url) {
    try {
      const response = await fetch(url);
      const cssText = await response.text();
      this.shadowRoot.querySelector("#main-css").textContent = cssText;
    } catch (error) {
      console.error("Error loading CSS:", error);
    }
  }

  importJsonData(file) {
    try {
      const fileReader = new FileReader();
      fileReader.readAsText(file);

      fileReader.onload = async () => {
        this.jsonData = JSON.parse(fileReader.result);
        localStorage.setItem(this.ns, JSON.stringify(this.jsonData));
        this.triggerUpdate();
        console.log("Imported JSON data:", this.jsonData);
      };
    } catch (error) {
      console.error("Error importing JSON file:", error);
    }
  }

  updateData(key, value) {
    console.log(key, value);
    this.jsonData[key] = value;
    localStorage.setItem(this.ns, JSON.stringify(this.jsonData));
    this.triggerUpdate();
  }

  // exportJsonData(filename = "data.json") {
  //   const dataStr = JSON.stringify(this.jsonData, null, 2);
  //   const blob = new Blob([dataStr], { type: "application/json" });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = filename;
  //   link.click();
  //   setTimeout(() => {
  //     URL.revokeObjectURL(url);
  //     link.remove();
  //   }, 0);
  // }

  async triggerUpdate() {
    const event = new CustomEvent("update");
    this.dispatchEvent(event);
  }

  handleExport(e) {
    e.preventDefault();
    this.exportJsonData(this.ns + "-profile.json");
  }
}
