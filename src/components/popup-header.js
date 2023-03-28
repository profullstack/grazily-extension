import BaseElement from "./base.js";

class PopupHeader extends BaseElement {
  constructor() {
    super();
  }

  async render(initial = false) {
    this.innerHTML = `
        <header>
          <a href="https://easyapplier.com" id="logo" target="_blank"><img src="assets/logo.svg" alt="logo" /></a>
        </header>
      `;
  }
}

customElements.define("popup-header", PopupHeader);

export default PopupHeader;
