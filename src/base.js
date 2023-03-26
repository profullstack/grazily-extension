import "./styles/main.css";

export default class BaseElement extends HTMLElement {
  constructor() {
    super();
    this.ns = "ea";
  }
}
