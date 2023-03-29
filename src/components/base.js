export default class BaseElement extends HTMLElement {
  constructor() {
    super();
    this.NS = "easyapplier";
    this.render = this.render.bind(this);
    this.loadCss = this.loadCSS.bind(this);
    this.updateData = this.updateData.bind(this);

    // this.attachShadow({ mode: "open" });
    this.loadCSS("./styles/main.css");

    this.jsonData = JSON.parse(localStorage.getItem(this.NS)) || {
      key1: "value1",
      key2: "value2",
    };
  }

  async connectedCallback() {
    await this.render(true);
  }

  disconnectedCallback() {
    this.removeEvents();
  }

  async loadCSS(url) {
    try {
      const response = await fetch(url);
      const cssText = await response.text();
      const style = this.querySelector("#main-css");

      if (style) {
        style.textContent = cssText;
      }
    } catch (error) {
      console.error("Error loading CSS:", error);
    }
  }


  addEvents() {
    this.addEventListener("update", this.render);
  }

  removeEvents(initial = false) {
    if (initial) return;
    this.removeEventListener("update", this.render);
  }

  updateData(key, value) {
    console.log(key, value);
    this.jsonData[key] = value;
    localStorage.setItem(this.NS, JSON.stringify(this.jsonData));
    this.triggerUpdate();
  }

  async triggerUpdate() {
    const event = new CustomEvent("update");
    this.dispatchEvent(event);
  }
}
