import BaseElement from "./base.js";

export default class CreateProfile extends BaseElement {
  constructor() {
    super();

    this.addEvents = this.addEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.renderContactFields = this.renderContactFields.bind(this);
    this.renderWorkExperienceFields =
      this.renderWorkExperienceFields.bind(this);
    this.nextSection = this.nextSection.bind(this);
    this.prevSection = this.prevSection.bind(this);
    this.showSection = this.showSection.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.currentSection = 0;
  }

  async render(initial = false) {
    console.log("currerntProfile2: ", this.currentProfile);
    this.innerHTML = `
        <h1>Edit profile</h1>
        <form id="info">
          <input name="id" />
          <div class="field">
            <label for="profileName">Profile Name:</label>
            <input type="text" name="profileName" id="profileName" placeholder="Engineering Manager" />
          </div>
          ${this.renderContactFields()}
          ${this.renderWorkExperienceFields()}
        </form>
    `;

    if (this.currentProfile) {
      this.prefillForm();
    }

    this.removeEvents(initial);
    this.addEvents();
  }

  renderContactFields() {
    return `
      <section id="contact">
        <h2>Contact Info</h2>
        <div class="field">
          <label for="email">Email:</label>
          <input type="email" name="email" id="email" />
        </div>
        <div class="field">
          <label for="firstName">First Name:</label>
          <input type="text" name="firstName" id="firstName" />
        </div>
        <div class="field">
          <label for="lastName">Last Name:</label>
          <input type="text" name="lastName" id="lastName" />
        </div>
        <div class="field">
          <label for="phone">Phone Number:</label>
          <input type="phone" name="phone" id="phone" />
        </div>
        <div class="field">
          <label for="timezone">Timezone:</label>
          <input type="text" name="timezone" id="timezone" />
        </div>
        <div class="field">
          <label for="address1">Addres 1:</label>
          <input type="text" name="address1" id="address1" />
        </div>
        <div class="field">
          <label for="address2">Address 2  (optional):</label>
          <input type="text" name="address2" id="address2" />
        </div>
        <div class="field">
          <label for="city">City:</label>
          <input type="text" name="city" id="city" />
        </div>
        <div class="field">
          <label for="state">State/Province:</label>
          <input type="text" name="state" id="state" />
        </div>
        <div class="field">
          <label for="zip">Zip:</label>
          <input type="text" name="zip" id="zip" />
        </div>
        <div class="field">
          <label for="county">County:</label>
          <input type="text" name="county" id="county" />
        </div>
        <div class="field">
          <label for="country">Resident Country:</label>
          <input type="text" name="country" id="country" />
        </div>
        <footer>
          <button class="save">Save</button>
          <button class="next" type="button">Next</button>
        </footer>
      </section>
    `;
  }

  renderWorkExperienceFields() {
    return `
      <section id="experience" class="hide">
        <div class="field">
          <label for="company">Company:</label>
          <input type="text" name="company" id="company" />
        </div>
        <div class="field">
          <label for="companyWebsite">Company Website:</label>
          <input type="text" name="companyWebsite" id="companyWebsite" />
        </div>
        <footer>
          <div>
            <button class="save">Save</button>
            <button class="add" type="button">Add another</button>
          </div>
          <div>
            <button class="prev" type="button">Previous</button>
            <button class="next" type="button">Next</button>
          </div>
        </footer>
      </section>
    `;
  }

  nextSection(e) {
    e.preventDefault();

    if (this.currentSection < this.sections.length - 1) {
      this.showSection(this.currentSection + 1);
    }
  }

  prevSection(e) {
    e.preventDefault();

    if (this.currentSection > 0) {
      this.showSection(this.currentSection - 1);
    }
  }

  setProfile(profile) {
    this.currentProfile = profile;
    this.render(true);
  }

  prefillForm() {
    this.form = this.querySelector("form");
    const formData = new FormData(this.form);

    for (const key in this.currentProfile) {
      if (this.currentProfile.hasOwnProperty(key)) {
        formData.set(key, this.currentProfile[key]);
      }
    }

    for (const [key, value] of formData) {
      const input = this.form.querySelector(`[name="${key}"]`);

      if (input) {
        input.value = value;
      }
    }
  }

  showSection(index) {
    this.sections[this.currentSection].classList.add("hide");
    this.currentSection = index;
    this.sections[this.currentSection].classList.remove("hide");
  }

  reset() {
    super.reset();
    console.log("create-profile rest called!");
    this.currentProfile = null;
    this.currentSection = 0;
    this.render();
  }

  saveForm(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const obj = {};
    obj.id = formData.id || null;

    for (const [key, value] of formData.entries()) {
      obj[key] = value;
    }

    // this.createData(null, null, "profiles", obj, false);
    this.updateData(null, null, "profile", obj, true);
    console.log("obj: ", obj);
    this.currentProfile = obj;
  }

  handleUpdate(e) {
    const data = e.detail;
    console.log("update data:", data);
    this.refreshData();
    this.render();
  }

  addEvents(initial) {
    super.addEvents();
    this.sections = this.querySelectorAll("form section");
    this.prevButtons = this.querySelectorAll("form section .prev");
    this.nextButtons = this.querySelectorAll("form section .next");
    this.form = this.querySelector("form#info");
    this.addEventListener("update", this.handleUpdate);

    this.form.addEventListener("submit", this.saveForm);

    for (let btn of this.prevButtons) {
      if (btn) {
        btn.addEventListener("click", this.prevSection);
      }
    }

    for (let btn of this.nextButtons) {
      if (btn) {
        btn.addEventListener("click", this.nextSection);
      }
    }
  }

  removeEvents(initial = false) {
    super.removeEvents(initial);
    if (initial) return;

    this.form.removeEventListener("submit", this.saveForm);
    this.removeEventListener("update", this.handleUpdate);
    for (let btn of this.prevButtons) {
      btn.removeEventListener("click", this.prevSection);
    }

    for (let btn of this.nextButtons) {
      btn.removeEventListener("click", this.nextSection);
    }
  }
}

customElements.define("create-profile", CreateProfile);
