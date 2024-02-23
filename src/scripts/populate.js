let grazilyapplier = window.grazilyapplier || {};

grazilyapplier.populate = {
  applytojob: {
    firstName: {
      selector: "#resumator-firstname-value",
      val: "legalNameSection_firstName",
    },
    lastName: {
      selector: "#resumator-lastname-value",
      val: "legalNameSection_lastName",
    },
    email: {
      selector: "#resumator-email-value",
      val: "email",
    },
    phone: {
      selector: "#resumator-phone-value",
      val: "phone",
    },
    // address1: {
    //   attr: "data-automation-id",
    //   val: "addressSection_addressLine1",
    // },
    // city: {
    //   attr: "data-automation-id",
    //   val: "addressSection_city",
    // },
    // zip: {
    //   attr: "data-automation-id",
    //   val: "addressSection_postalCode",
    // },
    // phone: {
    //   attr: "data-automation-id",
    //   val: "phone-number",
    // },
    // phoneExt: {
    //   attr: "data-automation-id",
    //   val: "phone-extension",
    // },
    actions: {
      set: ["focus", "click", "keypress", "blur"],
    },
  },
  lever: {
    firstName: {
      selector: '[data-qa="name-input"]',
      val: "firstName lastName",
    },
    email: {
      selector: '[data-qa="email-input"]',
      val: "email",
    },
    phone: {
      selector: '[data-qa="phone-input"]',
      val: "phone",
    },
    location: {
      selector: "#location-input",
      val: "city state",
    },
    company: {
      selector: '[data-qa="org-input"]',
      get: "work[0].company",
    },
    // address1: {
    //   attr: "data-automation-id",
    //   val: "addressSection_addressLine1",
    // },
    // city: {
    //   attr: "data-automation-id",
    //   val: "addressSection_city",
    // },
    // zip: {
    //   attr: "data-automation-id",
    //   val: "addressSection_postalCode",
    // },
    // phone: {
    //   attr: "data-automation-id",
    //   val: "phone-number",
    // },
    // phoneExt: {
    //   attr: "data-automation-id",
    //   val: "phone-extension",
    // },
    actions: {
      set: ["focus", "click", "keypress", "blur"],
      upload: {
        selector: "#resume-upload-input",
        action: "click",
      },
    },
  },
  workatastartup: {
    cover: {
      selector: "textarea",
      val: "cover",
    },
  },
};
