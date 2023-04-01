import BaseElement from "./base.js";

export default class PopupHeader extends BaseElement {
  constructor() {
    super();

    this.addEvents = this.addEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.showScreen = this.showScreen.bind(this);
  }

  async render(initial = false) {
    this.innerHTML = `
        <header class="main">
          <a href="https://easyapplier.com" id="logo" target="_blank"><img src="assets/logo.svg" alt="logo" /></a>
          <button id="menu-button"><img src="assets/hamburger.svg" alt="Menu" /></button>
        </header>
        <nav id="menu" class="hide">
          <a href="#" id="show-profiles">Show Profiles</a>
          <a href="#" id="create-profile">New Profile</a>
          <a href="#" id="import-data">Import Data</a>
          <a href="#" id="export-data">Export Data</a>
        </nav>
      `;

    this.removeEvents(initial);
    this.addEvents();
  }

  addEvents() {
    this.hamburger = this.querySelector("#menu-button");
    this.hamburger.addEventListener("click", this.toggleMenu);
    this.links = this.querySelectorAll("#menu a");

    for (let link of this.links) {
      link.addEventListener("click", this.showScreen);
    }
  }

  removeEvents(initial = false) {
    super.removeEvents(initial);
    if (initial) return;
    this.hamburger.removeEventListener("click", this.toggleMenu);
    this.links = this.querySelectorAll("#menu a");

    for (let link of this.links) {
      link.removeEventListener("click", this.showScreen);
    }
  }

  showScreen(e) {
    e.preventDefault();
    console.log("showScreen");
    const { id } = e.currentTarget;
    console.log(id);
    const screens = document.querySelectorAll(".screen");

    console.log(screens);

    screens.forEach((screen) => {
      if (screen.tagName.toLowerCase() === id) {
        console.log("here foo", id);
        screen.reset();
        screen.classList.remove("hide");
      } else {
        screen.classList.add("hide");
        screen.reset();
      }
    });

    this.menu.classList.add("hide");
  }

  toggleMenu(e) {
    e.preventDefault();

    this.menu = this.querySelector("#menu");
    this.menu.classList.toggle("hide");
  }
}

customElements.define("popup-header", PopupHeader);
