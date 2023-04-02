import BaseElement from "./base.js";

export default class EasyApplier extends BaseElement {
  constructor() {
    super();

    this.addEvents = this.addEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.populateForm = this.populateForm.bind(this);
  }

  async render(initial = false) {
    this.innerHTML = `
        ${this.renderStyle()}

        <div id="${this.NS}">
          <popup-header></popup-header>
          <pre>${JSON.stringify(this.jsonData, null, 2)}</pre>
          ${this.renderScreens()}
        </div>
        <div class="main">
          Populate this site: <a href="#" id="populate">${await this.getHostname()}</a>
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
      <job-sites class="screen hide"></job-sites>
      <show-profiles class="screen hide"></show-profiles>
      <import-data class="screen hide"></import-data>
      <export-data class="screen hide"></export-data>
    `;
  }

  async populateForm(e) {
    e.preventDefault();

    // talk to content script
    this.extapi.tabs.query(
      { active: true, currentWindow: true },
      async (tabs) => {
        const activeTab = tabs[0];
        this.extapi.tabs.sendMessage(activeTab.id, {
          type: "apply",
          data: this.currentProfile,
          hostname: await this.getHostname(),
        });
      }
    );
  }

  addEvents() {
    super.addEvents();
    this.populateButton = this.querySelector("#populate");
    this.populateButton.addEventListener("click", this.populateForm);
  }

  removeEvents(initial = false) {
    super.removeEvents(initial);
    if (initial) return;
  }
}

customElements.define("easy-applier", EasyApplier);
