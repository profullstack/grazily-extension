import BaseElement from "./base.js";
import CreateProfile from "./create-profile.js";

export default class ShowProfiles extends BaseElement {
  constructor() {
    super();

    this.addEvents = this.addEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
  }

  async render(initial = false) {
    this.innerHTML = `
        <h1>Your profiles</h1>
        <ol>
          ${this.jsonData.profiles
            .map((profile) => {
              return `<li>${profile.id}: ${profile.profileName} <a href="#" data-id="${profile.id}" class="edit">edit</a> <a href="#" data-id="${profile.id}" class="delete">delete</a></li>`;
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

    this.navigate("show-profiles", "create-profile", (component) => {
      component.setProfile(currentProfile);
      component.classList.add("screen");

      return Promise.resolve();
    });
  }

  deleteProfile(e) {
    e.preventDefault();
    const { id } = e.currentTarget.dataset;

    this.jsonData.profiles = this.jsonData.profiles.filter(
      (profile) => profile.id === id
    );

    this.render();
  }

  addEvents(initial) {
    super.addEvents();
    this.editLinks = this.querySelectorAll("a.edit");
    this.deleteLinks = this.querySelectorAll("a.delete");

    for (let link of this.editLinks) {
      link.addEventListener("click", this.editProfile);
    }

    for (let link of this.deleteLinks) {
      link.addEventListener("click", this.deleteProfile);
    }
  }

  removeEvents(initial = false) {
    super.removeEvents(initial);
    if (initial) return;

    for (let link of this.editLinks) {
      link.removeEventListener("click", this.editProfile);
    }

    for (let link of this.deleteLinks) {
      link.removeEventListener("click", this.deleteProfile);
    }
  }
}

customElements.define("show-profiles", ShowProfiles);
