const data = (dispatch: any) => (
  state = {
    username: null,
    email: null,
    isDataNeedFetch: false,
    isInGroup: false,
    trainingData: {
      russianPushUp: {
        test: null,
        startDate: null,
        startTime: null,
        endTime: null,
        daysCounter: null,
        results: {
          day1: 0,
          day2: 0,
          day3: 0,
          day4: 0,
          day5: 0,
          day6: 0,
          day7: 0,
          day8: 0,
          day9: 0,
          day10: 0,
          day11: 0,
          day12: 0,
          day13: 0,
          day14: 0,
        },
      },
    },
    notificationStatus: "enabled",
  },
  //@ts-ignore
  { type, value, trainingType, date, start, end, days }
) => {
  switch (type) {
    case "SET_IS_DATA_NEED_FETCH": {
      state.isDataNeedFetch = value;
      return { ...state };
    }

    case "CHANGE_USERNAME": {
      state.username = value;
      return { ...state };
    }

    case "CHANGE_NOTIFICATION_STATUS": {
      state.notificationStatus = value;
      return { ...state };
    }

    case "SET_TRAINING_DATA": {
      //@ts-ignore
      state.trainingData[trainingType].test = value;
      //@ts-ignore
      state.trainingData[trainingType].startDate = date;
      //@ts-ignore
      state.trainingData[trainingType].startTime = start;
      //@ts-ignore
      state.trainingData[trainingType].endTime = end;
      //@ts-ignore
      state.trainingData[trainingType].daysCounter = days;
      //@ts-ignore
      return { ...state };
    }

    default:
      return state;
  }
};

export default data;
