let grazilyapplier = window.grazilyapplier || {};

grazilyapplier.populate = {
  workday: {
    firstName: {
      attr: "data-automation-id",
      val: "legalNameSection_firstName",
    },
    middleName: {
      attr: "data-automation-id",
      val: "legalNameSection_middleName",
    },
    lastName: {
      attr: "data-automation-id",
      val: "legalNameSection_lastName",
    },
    address1: {
      attr: "data-automation-id",
      val: "addressSection_addressLine1",
    },
    city: {
      attr: "data-automation-id",
      val: "addressSection_city",
    },
    zip: {
      attr: "data-automation-id",
      val: "addressSection_postalCode",
    },
    phone: {
      attr: "data-automation-id",
      val: "phone-number",
    },
    phoneExt: {
      attr: "data-automation-id",
      val: "phone-extension",
    },
    actions: {
      set: ["focus", "click", "keypress", "blur"],
    },
  },
};
