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

export { NS, importJsonData, exportJsonData };
