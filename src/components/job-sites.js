import BaseElement from "./base.js";

export default class JobSites extends BaseElement {
  constructor() {
    super();

    this.addEvents = this.addEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.reset = this.reset.bind(this);

    this.sites = [
      {
        name: "Workday",
        url: "https://workday.wd5.myworkdayjobs.com/Workday",
      },
      {
        name: "ADP",
        url: "https://jobs.adp.com/job-search-results/?language=en&location=United%20States&country=US&radius=25",
      },
      {
        name: "Taleo/Fortive",
        url: "https://careers.fortive.com/search-results",
      },
      {
        name: "SAP",
        url: "https://jobs.sap.com/search/?createNewAlert=false&q=&locationsearch=united+states&optionsFacetsDD_department=&optionsFacetsDD_customfield3=&optionsFacetsDD_country=",
      },
    ];
  }

  async render(initial = false) {
    this.innerHTML = `
        <h1>Job Sites</h1>
        <ol>
            ${this.sites
              .map((site) => {
                return `<li><a href="${site.url}" target="_blank" rel="noreferrer">${site.name}</a></li>`;
              })
              .join("")}
        </ol>
        `;

    this.removeEvents(initial);
    this.addEvents();
  }

  addEvents() {
    super.addEvents();
  }

  reset() {
    super.reset();
    console.log("job-sites reset called!");
    this.render();
  }

  removeEvents(initial = false) {
    super.removeEvents(initial);
    if (initial) return;
  }
}

customElements.define("job-sites", JobSites);
