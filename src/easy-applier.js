import BaseElement from "./base.js";

class EasyApplier extends BaseElement {
  constructor() {
    super();

    this.shadowRoot.innerHTML = `
        <style id="main-css"></style>
        <div>
          <h1>Hello from My Component</h1>
        </div>
      `;
  }
}

customElements.define("easy-applier", EasyApplier);
