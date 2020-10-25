export const setIsDataNeedFetch = (value: any) => ({
  type: "SET_IS_DATA_NEED_FETCH",
  value,
});

export const changeUsername = (value: any) => ({
  type: "CHANGE_USERNAME",
  value,
});

export const changeNotificationStatus = (value: any) => ({
  type: "CHANGE_NOTIFICATION_STATUS",
  value,
});

export const setTrainingData = (trainingType: any, value: any, date: any, start: any, end: any, days: any) => ({
  type: "SET_TRAINING_DATA",
  trainingType,
  value,
  date,
  start,
  end,
  days,
});
