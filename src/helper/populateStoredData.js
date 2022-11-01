export const populateStoredData = (dataName) => {
  let dataFromStorage, parseDataFromStorage;
  switch (dataName) {
    case "todo":
      dataFromStorage = localStorage.getItem("todos");
      parseDataFromStorage = JSON.parse(dataFromStorage);
      return parseDataFromStorage || [];
    case "habits":
      dataFromStorage = localStorage.getItem("habits");
      parseDataFromStorage = JSON.parse(dataFromStorage);
      return parseDataFromStorage || [];
  }
};
