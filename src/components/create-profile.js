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
    this.prefillForm = this.prefillForm.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.addWorkExperience = this.addWorkExperience.bind(this);
    this.renderWorkExperience = this.renderWorkExperience.bind(this);
    this.renderEducationFields = this.renderEducationFields.bind(this);
    this.renderEducationExperience = this.renderEducationExperience.bind(this);
    this.addEducationExperience = this.addEducationExperience.bind(this);
    this.populateWorkExperienceFields =
      this.populateWorkExperienceFields.bind(this);
    this.populateEducationFields = this.populateEducationFields.bind(this);
    this.currentSection = 0;
  }

  async render(initial = false) {
    console.log("currerntProfile2: ", this.currentProfile);
    this.innerHTML = `
        <h1>Edit profile</h1>
        <form id="info">
          <input name="id" type="hidden" />
          <div class="field">
            <label for="profileName">Profile Name:</label>
            <input type="text" name="profileName" id="profileName" placeholder="Engineering Manager" />
          </div>
          ${this.renderContactFields()}
          ${this.renderWorkExperienceFields()}
          ${this.renderEducationFields()}
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
        ${this.renderWorkExperience()}
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

  renderEducationFields() {
    return `
      <section id="education" class="hide">
        ${this.renderEducationExperience()}
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

  renderWorkExperience() {
    return `
        <div class="experience">
          <div class="field">
            <label for="company">Company:</label>
            <input type="text" name="company" id="company" />
          </div>
          <div class="field">
            <label for="companyWebsite">Company Website:</label>
            <input type="text" name="companyWebsite" id="companyWebsite" />
          </div>
        </div>
    `;
  }

  renderEducationExperience() {
    return `
        <div class="education">
          <div class="field">
            <label for="school">School or University:</label>
            <input type="text" name="school" id="school" />
          </div>
          <div class="field">
            <label for="schoolCountry">Country of School:</label>
            <input type="text" name="schoolCountry" id="schoolCountry" />
          </div>
          <div class="field">
            <label for="areaOfStudy">Area of Study:</label>
            <input type="text" name="areaOfStudy" id="areaOfStudy" />
          </div>
          <div class="field">
            <label for="degree">Degree, Diploma or Certificate Earned:</label>
            <input type="text" name="degree" id="degree" />
          </div>
        </div>
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

  populateWorkExperienceFields(workElement, work) {
    workElement.querySelector("input#company").value = work.company;
    workElement.querySelector("input#companyWebsite").value =
      work.companyWebsite;
  }

  populateEducationFields(eduElement, edu) {
    eduElement.querySelector("input#school").value = edu.school;
    eduElement.querySelector("input#schoolCountry").value = edu.schoolCountry;
    eduElement.querySelector("input#areaOfStudy").value = edu.areaOfStudy;
    eduElement.querySelector("input#degree").value = edu.degree;
  }

  prefillForm() {
    this.form = this.querySelector("form");
    const ignore = [
      ...this.querySelectorAll(".experience input, .education input"),
    ].map((el) => el.name);

    const formData = new FormData(this.form);

    // populate work experience fields
    this.currentProfile.work?.forEach((work, idx) => {
      let workElement;

      if (idx === 0) {
        workElement = this.querySelector("#experience .experience");
      } else {
        const fields = this.renderWorkExperience();
        this.querySelector(
          "#experience .experience:last-of-type"
        ).insertAdjacentHTML("afterend", fields);
        workElement = this.querySelector(
          "#experience .experience:last-of-type"
        );
      }

      this.populateWorkExperienceFields(workElement, work);
    });

    this.currentProfile.education?.forEach((edu, idx) => {
      let eduElement;

      console.log(idx);
      if (idx === 0) {
        eduElement = this.querySelector("#education .education");
      } else {
        const fields = this.renderEducationExperience();
        this.querySelector(
          "#education .education:last-of-type"
        ).insertAdjacentHTML("afterend", fields);
        eduElement = this.querySelector("#education .education:last-of-type");
      }

      this.populateEducationFields(eduElement, edu);
    });

    // prefill flat form fields
    for (const key in this.currentProfile) {
      if (
        this.currentProfile.hasOwnProperty(key) &&
        key !== "work" &&
        key !== "education"
      ) {
        formData.set(key, this.currentProfile[key]);
      }
    }

    for (const [key, value] of formData) {
      if (ignore.indexOf(key) > -1) {
        continue;
      }
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

    const ignore = [
      ...e.target.querySelectorAll(".experience input, .education input"),
    ].map((el) => el.name);

    const formData = new FormData(e.target);
    const work = [];
    const education = [];
    const obj = {};

    obj.id = formData.id || null;

    for (const [key, value] of formData.entries()) {
      if (ignore.indexOf(key) > -1) {
        continue;
      }

      obj[key] = value;
    }

    const workExperiences = this.querySelectorAll(".experience");
    const educationExperiences = this.querySelectorAll(".education");

    for (let el of workExperiences) {
      const company = el.querySelector("input#company").value;
      const companyWebsite = el.querySelector("input#companyWebsite").value;

      work.push({
        company,
        companyWebsite,
      });
    }

    for (let el of educationExperiences) {
      const school = el.querySelector("input#school").value;
      const schoolCountry = el.querySelector("input#schoolCountry").value;
      const areaOfStudy = el.querySelector("input#areaOfStudy").value;
      const degree = el.querySelector("input#degree").value;

      education.push({
        school,
        schoolCountry,
        areaOfStudy,
        degree,
      });
    }

    obj.work = work;
    obj.education = education;

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

  addWorkExperience(e) {
    e.preventDefault();
    const fields = this.renderWorkExperience();

    this.querySelector(
      "#experience .experience:last-of-type"
    ).insertAdjacentHTML("afterend", fields);
  }

  addEducationExperience(e) {
    e.preventDefault();
    const fields = this.renderEducationExperience();

    this.querySelector("#education .education:last-of-type").insertAdjacentHTML(
      "afterend",
      fields
    );
  }

  addEvents(initial) {
    super.addEvents();
    this.sections = this.querySelectorAll("form section");
    this.prevButtons = this.querySelectorAll("form section .prev");
    this.nextButtons = this.querySelectorAll("form section .next");
    this.addExperienceButton = this.querySelector("#experience button.add");
    this.addEducationButton = this.querySelector("#education button.add");

    this.form = this.querySelector("form#info");
    this.addEventListener("update", this.handleUpdate);

    this.form.addEventListener("submit", this.saveForm);
    this.addExperienceButton.addEventListener("click", this.addWorkExperience);
    this.addEducationButton.addEventListener(
      "click",
      this.addEducationExperience
    );

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
    this.addExperienceButton.removeEventListener(
      "click",
      this.addWorkExperience
    );
    this.addEducationButton.removeEventListener(
      "click",
      this.addEducationExperience
    );
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
