import BaseElement from "./base.js";

class EasyApplier extends BaseElement {
  constructor() {
    super();

    this.handleFileChange = this.handleFileChange.bind(this);
    this.render = this.render.bind(this);
    this.addEvents = this.addEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
  }

  async render(initial = false) {
    this.shadowRoot.innerHTML = `
        ${this.renderStyle()}

        <div id="${this.ns}">
          <div id="logo"><img src="assets/logo.svg" alt="logo" /></div>
          <pre>${JSON.stringify(this.jsonData, null, 2)}</pre>
          Import profiles: <input type="file" id="json-file-input" accept="application/json" />
        </div>
      `;

    await this.loadCSS("./styles/main.css");
    this.removeEvents(initial);
    this.addEvents();
  }

  async connectedCallback() {
    await this.render(true);
  }

  renderStyle() {
    return `<style id="main-css"></style>`;
  }

  addEvents() {
    this.jsonFileInput = this.shadowRoot.querySelector("#json-file-input");
    this.jsonFileInput.addEventListener("change", this.handleFileChange);
    this.addEventListener("update", this.render);
  }

  removeEvents(initial = false) {
    if (initial) return;
    this.jsonFileInput.removeEventListener("change", this.handleFileChange);
    this.removeEventListener("update", this.render);
  }

  disconnectedCallback() {
    this.removeEvents();
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

customElements.define("easy-applier", EasyApplier);
