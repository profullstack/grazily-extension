import BaseElement from "./base.js";
import CreateProfile from "./create-profile.js";

export default class ShowProfiles extends BaseElement {
  constructor() {
    super();

    this.addEvents = this.addEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  async render(initial = false) {
    this.innerHTML = `
        <h1>Your profiles</h1>
        <ol>
          ${this.jsonData.profiles
            .map((profile) => {
              return `<li><a href="#" data-id="${profile.id}" class="edit">${profile.id}: ${profile.profileName}</a></li>`;
            })
            .join("")}
        </ol>
    `;

    this.removeEvents(initial);
    this.addEvents();
  }

  editProfile(e) {
    e.preventDefault();

    const { id } = e.currentTarget.dataset;
    console.log("edit: ", id);
    const currentProfile = this.jsonData.profiles.find(
      (profile) => profile.id === id
    );

    console.log("currentProfile: ", currentProfile);

    const Component = customElements.get("create-profile");
    const currPage = document.querySelector("show-profiles");
    const newPage = document.querySelector("create-profile");

    const component = new Component();
    newPage.replaceWith(component);
    component.setProfile(currentProfile);
    newPage.classList.remove("hide");
    currPage.classList.add("hide");
  }

  addEvents(initial) {
    super.addEvents();
    this.editLinks = this.querySelectorAll("a.edit");

    for (let link of this.editLinks) {
      link.addEventListener("click", this.editProfile);
    }
  }

  removeEvents(initial = false) {
    super.removeEvents(initial);
    if (initial) return;

    for (let link of this.editLinks) {
      link.removeEventListener("click", this.editProfile);
    }
  }
}

customElements.define("show-profiles", ShowProfiles);
