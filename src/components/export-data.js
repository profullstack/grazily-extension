import BaseElement from "./base.js";

export default class ExportData extends BaseElement {
  constructor() {
    super();

    this.addEvents = this.addEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.handleExport = this.handleExport.bind(this);
    this.exportJsonData = this.exportJsonData.bind(this);
  }

  async render(initial = false) {
    this.innerHTML = `
        <h1>Export Data</h1>
        <div><button type="button">Download</button></div>
    `;

    this.removeEvents(initial);
    this.addEvents();
  }

  addEvents() {
    super.addEvents();
  }

  removeEvents(initial = false) {
    super.removeEvents(initial);
    if (initial) return;
  }

  handleExport(e) {
    e.preventDefault();
    this.exportJsonData(this.ns + "-profile.json");
  }

  exportJsonData(filename = "data.json") {
    const dataStr = JSON.stringify(this.jsonData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
      link.remove();
    }, 0);
  }
}

customElements.define("export-data", ExportData);
