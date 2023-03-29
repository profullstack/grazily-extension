import BaseElement from "./base.js";

export default class ShowProfiles extends BaseElement {
  constructor() {
    super();

    this.addEvents = this.addEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
  }

  async render(initial = false) {
    this.innerHTML = `
        <h1>Your profiles</h1>
    `;

    this.removeEvents(initial);
    this.addEvents();
  }

  addEvents(initial) {
    super.addEvents();
  }

  removeEvents(initial = false) {
    super.removeEvents(initial);
    if (initial) return;
  }
}

customElements.define("show-profiles", ShowProfiles);
