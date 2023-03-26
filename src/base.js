export default class BaseElement extends HTMLElement {
  constructor() {
    super();
    this.ns = "ea";
    this.attachShadow({ mode: "open" });
    this.loadCSS("./styles/main.css");
  }

  async loadCSS(url) {
    try {
      const response = await fetch(url);
      const cssText = await response.text();
      this.shadowRoot.querySelector("#main-css").textContent = cssText;
    } catch (error) {
      console.error("Error loading CSS:", error);
    }
  }
}
