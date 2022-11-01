const FIRST_TODO = 0;
export const ensureHabitsData = (data) => {
  const fromStorage = localStorage.getItem("habits");
  let hData = [];
  if (fromStorage) {
    const parseStorageData = JSON.parse(fromStorage);
    hData = parseStorageData;
    hData.push({
      id: parseStorageData.length + 1,
      ...data,
    });
  } else {
    hData.push({
      id: FIRST_TODO,
      ...data,
    });
  }
  // Update storage before returning data
  localStorage.setItem("habits", JSON.stringify(hData));
  return hData;
};
