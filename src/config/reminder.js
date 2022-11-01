import moment from "moment";

export const getHabitReminder = (time) => {
  const getHabitData = localStorage.getItem("habits");
  const parseHabitData = JSON.parse(getHabitData);
  const getCurrentTime =
    parseHabitData &&
    parseHabitData.filter((data) => {
      const getAddedTime = data.reminderAddedTime;
      const addReminder = data.reminderAfterTime
        ? moment(getAddedTime)
            .add(parseInt(data.reminderAfterTime), "minutes")
            .toDate()
        : moment(getAddedTime).add(15, "minutes").toDate();
      // const addReminder = moment(getAddedTime).add(1, "minutes").toDate();
      if (
        moment(time).format("HH:mm:ss") ===
        moment(addReminder).format("HH:mm:ss")
      ) {
        return data;
      }
    });
  return getCurrentTime;
};
