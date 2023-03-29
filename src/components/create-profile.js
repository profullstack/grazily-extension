import BaseElement from "./base.js";

export default class CreateProfile extends BaseElement {
  constructor() {
    super();

    this.addEvents = this.addEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
  }

  async render(initial = false) {
    this.innerHTML = `
        <h1>Add new profile</h1>
    `;

    this.removeEvents(initial);
    this.addEvents();
  }

  addEvents(initial) {
    super.addEvents();
    // this.hamburger = this.querySelector("#menu-button");
    // this.hamburger.addEventListener("click", this.toggleMenu);
  }

  removeEvents(initial = false) {
    super.removeEvents(initial);
    if (initial) return;
  }
}

customElements.define("create-profile", CreateProfile);
