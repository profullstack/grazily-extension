import BaseElement from "./base.js";

export default class EasyApplier extends BaseElement {
  constructor() {
    super();

    this.addEvents = this.addEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
  }

  async render(initial = false) {
    this.innerHTML = `
        ${this.renderStyle()}

        <div id="${this.NS}">
          <popup-header></popup-header>
          <pre>${JSON.stringify(this.jsonData, null, 2)}</pre>
          ${this.renderScreens()}
        </div>
      `;

    await this.loadCSS("../styles/main.css");
    this.removeEvents(initial);
    this.addEvents();
  }

  renderStyle() {
    return `
    <style>
    :host, easy-applier {
      display: block;
      width: 45rem;
    }
    </style>
    <style id="main-css"></style>
    `;
  }

  renderScreens() {
    return `
      <create-profile class="screen hide"></create-profile>
      <show-profiles class="screen hide"></show-profiles>
      <import-data class="screen hide"></import-data>
      <export-data class="screen hide"></export-data>
    `;
  }

  addEvents() {
    super.addEvents();
  }

  removeEvents(initial = false) {
    super.removeEvents(initial);
    if (initial) return;
  }
}

customElements.define("easy-applier", EasyApplier);
