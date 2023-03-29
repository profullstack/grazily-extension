import BaseElement from "./base.js";

export default class ImportData extends BaseElement {
  constructor() {
    super();

    this.addEvents = this.addEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.importJsonData = this.importJsonData.bind(this);
  }

  async render(initial = false) {
    this.innerHTML = `
        <h1>Import Data</h1>
        <div>Import profiles: <input type="file" id="json-file-input" accept="application/json" /></div>
    `;

    this.removeEvents(initial);
    this.addEvents();
  }

  addEvents() {
    super.addEvents();

    this.jsonFileInput = this.querySelector("#json-file-input");
    this.jsonFileInput.addEventListener("change", this.handleFileChange);
  }

  removeEvents(initial = false) {
    super.removeEvents(initial);
    if (initial) return;

    this.jsonFileInput.removeEventListener("change", this.handleFileChange);
  }

  importJsonData(file) {
    try {
      const fileReader = new FileReader();
      fileReader.readAsText(file);

      fileReader.onload = async () => {
        this.jsonData = JSON.parse(fileReader.result);
        localStorage.setItem(this.NS, JSON.stringify(this.jsonData));
        this.triggerUpdate();
        console.log("Imported JSON data:", this.jsonData);
      };
    } catch (error) {
      console.error("Error importing JSON file:", error);
    }
  }

  async handleFileChange(event) {
    console.log("here");
    if (event.target.files.length > 0) {
      console.log("here2");
      const file = event.target.files[0];
      this.importJsonData(file);
      await this.render();
    }
  }
}

customElements.define("import-data", ImportData);
