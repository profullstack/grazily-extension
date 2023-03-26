import BaseElement from "./base.js";

class EasyApplier extends BaseElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });

    shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            width: 300px;
            height: 200px;
            background-color: #f0f0f0;
            padding: 1rem;
            border: 1px solid #ccc;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
        </style>
        <div>
          <h2>Hello from My Component</h2>
        </div>
      `;
  }
}

customElements.define("easy-applier", EasyApplier);
