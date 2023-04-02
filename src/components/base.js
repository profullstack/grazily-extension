export default class BaseElement extends HTMLElement {
  constructor() {
    super();
    this.NS = "easyapplier";
    this.render = this.render.bind(this);
    this.loadCss = this.loadCSS.bind(this);
    this.updateData = this.updateData.bind(this);
    this.triggerUpdate = this.triggerUpdate.bind(this);
    this.navigate = this.navigate.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this._currentProfile = null;

    // this.attachShadow({ mode: "open" });
    this.loadCSS("./styles/main.css");
    this.refreshData();
  }

  set currentProfile(profile) {
    this._currentProfile = profile;
  }

  get currentProfile() {
    return this._currentProfile;
  }

  async connectedCallback() {
    this.refreshData();
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

  async navigate(from, to, cb) {
    const Component = customElements.get(to);
    const currPage = document.querySelector(from);
    const newPage = document.querySelector(to);
    const component = new Component();

    if (cb) {
      await cb(component);
    }

    newPage.replaceWith(component);
    newPage.classList.remove("hide");
    currPage.classList.add("hide");
  }

  addEvents() {
    this.addEventListener("update", this.render);
  }

  removeEvents(initial = false) {
    if (initial) return;
    this.removeEventListener("update", this.render);
  }

  updateData(key, value, dataKey = null, obj = null, update = true) {
    console.log(key, value, dataKey, obj);

    if (dataKey) {
      if (Array.isArray(this.jsonData[dataKey])) {
        if (obj.id) {
          const idx = this.jsonData[dataKey].findIndex((d) => d.id === obj.id);
          console.log("existing:", idx);

          if (idx > -1) {
            this.jsonData[dataKey][idx] = {
              ...this.jsonData[dataKey][idx],
              ...obj,
            };
          }
        } else {
          obj.id = crypto.randomUUID();
          this.jsonData[dataKey].push(obj);
        }
      } else if (!key && obj) {
        this.jsonData[dataKey] = obj;
      } else {
        this.jsonData[dataKey][key] = value;
      }
    } else {
      this.jsonData[key] = value;
    }

    localStorage.setItem(this.NS, JSON.stringify(this.jsonData));

    if (update) {
      this.triggerUpdate();
    }
  }

  refreshData() {
    this.jsonData = JSON.parse(localStorage.getItem(this.NS)) || {
      key1: "value1",
      key2: "value2",
      profiles: [], // unused
      profile: {},
    };

    this.currentProfile = this.jsonData.profile;
    // this.currentProfile = this.jsonData?.profiles.find(
    //   (profile) => profile.id === this.currentProfile?.id
    // );
  }

  reset() {
    console.log("base reset called");
  }

  async triggerUpdate() {
    const event = new CustomEvent("update", { detail: this.jsonData });
    this.dispatchEvent(event);
  }
}
