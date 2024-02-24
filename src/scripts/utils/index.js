const NS = "grazilyapplier";

const importJsonData = (file) => {
  try {
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = async () => {
      //   this.jsonData = JSON.parse(fileReader.result);
      localStorage.setItem(NS, fileReader.result);
      //   this.triggerUpdate();
      console.log("Imported JSON data:", JSON.parse(localStorage.getItem(NS)));
    };
  } catch (error) {
    console.error("Error importing JSON file:", error);
  }
};

const exportJsonData = (filename = "data.json") => {
  const dataStr = JSON.stringify(localStorage.getItem(NS), null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    link.remove();
  }, 0);
};

const _get = (obj, query, defaultVal) => {
  query = Array.isArray(query)
    ? query
    : query
        .replace(/(\[(\d)\])/g, ".$2")
        .replace(/^\./, "")
        .split(".");
  if (!(query[0] in obj)) {
    return defaultVal;
  }
  obj = obj[query[0]];
  if (obj && query.length > 1) {
    return _get(obj, query.slice(1), defaultVal);
  }
  return obj;
};

export { NS, importJsonData, exportJsonData, _get };
