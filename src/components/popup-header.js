import BaseElement from "./base.js";

class PopupHeader extends BaseElement {
  constructor() {
    super();

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  async render(initial = false) {
    this.innerHTML = `
        <header class="main">
          <a href="https://easyapplier.com" id="logo" target="_blank"><img src="assets/logo.svg" alt="logo" /></a>
          <button id="menu-button"><img src="assets/hamburger.svg" alt="Menu" /></button>
        </header>
        <nav id="menu" class="hide">
          <a href="#">Import</a>
          <a href="#">Export</a>
          <a href="#">New Profile</a>
        </nav>
      `;

    this.removeEvents(initial);
    this.addEvents();
  }

  addEvents() {
    this.hamburger = this.querySelector("#menu-button");
    this.hamburger.addEventListener("click", this.toggleMenu);
    this.addEventListener("update", this.render);
  }

  removeEvents(initial = false) {
    if (initial) return;
    this.hamburger.removeEventListener("click", this.toggleMenu);
    this.removeEventListener("update", this.render);
  }

  toggleMenu(e) {
    e.preventDefault();

    this.menu = this.querySelector("#menu");
    this.menu.classList.toggle("hide");
  }
}

customElements.define("popup-header", PopupHeader);

export default PopupHeader;
