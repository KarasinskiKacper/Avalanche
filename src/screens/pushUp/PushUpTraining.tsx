import React, { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Header from "../../components/Header";
import CustomText from "../../components/CustomText";
import BigButton from "../../components/BigButton";

import Cog from "../../components/svg/Cog";
import Arrow from "../../components/svg/Arrow";

import { connect } from "react-redux";
import { setTrainingData } from "../../actions/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

const PushUpTraining = (props: any) => {
  const [isDataImported, setIsDataImported] = useState(false);
  const [russianPushUpData, setRussianPushUp] = useState({
    test: "",
    startDate: "",
    startTime: "",
    endTime: "",
    daysCounter: "",
    nextSeries: "",
  });
  const [currentScreen, setCurrentScreen] = useState("before");
  const [intervalIndex, setIntervalIndex] = useState(null);

  const trainingProgramData = [
    { time: 60, quantity: 30 },
    { time: 60, quantity: 30 },
    { time: 45, quantity: 30 },
    { time: 60, quantity: 30 },
    { time: 30, quantity: 30 },
    { time: 60, quantity: 30 },
    { time: 90, quantity: 30 },
    { time: 45, quantity: 30 },
    { time: 20, quantity: 30 },
    { time: 15, quantity: 30 },
    { time: 60, quantity: 30 },
    { time: 60, quantity: 30 },
    { time: 60, quantity: 30 },
    { time: 120, quantity: 30 },
  ];

  const getData = async () => {
    try {
    } catch (e) {
      console.log(e);
    }
    try {
      const pushUpsTest = await AsyncStorage.getItem("@pushUpsTest");
      const startDate = await AsyncStorage.getItem("@startDate");
      const startTime = await AsyncStorage.getItem("@startTime");
      const endTime = await AsyncStorage.getItem("@endTime");
      const nextSeries = await AsyncStorage.getItem("@nextSeries");
      let daysCounter = await AsyncStorage.getItem("@daysCounter");

      //@ts-ignore
      const date = new Date(startDate);
      const currentdate = new Date();
      //@ts-ignore
      const date2 = new Date(currentdate - date);

      if (date2.getDate() + "" !== daysCounter) {
        daysCounter = date2.getDate() + "";
        storeData(date2.getDate() + "");
      }

      if (
        pushUpsTest !== null &&
        startDate !== null &&
        startTime !== null &&
        endTime !== null &&
        daysCounter !== null &&
        nextSeries !== null
      ) {
        setRussianPushUp({
          test: pushUpsTest,
          startDate,
          startTime,
          endTime,
          daysCounter,
          nextSeries,
        });
        props.setTrainingData("russianPushUp", pushUpsTest, startDate, startTime, endTime, daysCounter);
      } else props.navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (value: any) => {
    try {
      await AsyncStorage.setItem("@daysCounter", value);
    } catch (e) {
      console.log(e);
    }
  };

  const { test, startDate, startTime, endTime, daysCounter, nextSeries } = russianPushUpData;

  useEffect(() => {
    if (!isDataImported) {
      getData();
      setIsDataImported(true);
    }
    const interval = setInterval(() => checkScreen(), 1000);
    return () => clearInterval(interval);
  });

  const checkScreen = () => {
    const currentdate = new Date();
    const date1 = new Date(startTime);
    const date2 = new Date(endTime);
    const date3 = new Date(nextSeries);
    const date4 = new Date(startDate);
    const end = new Date(endTime);
    const next = new Date(nextSeries);

    date1.setDate(currentdate.getDate());
    date1.setMonth(currentdate.getMonth());
    date1.setFullYear(currentdate.getFullYear());

    date2.setDate(currentdate.getDate());
    date2.setMonth(currentdate.getMonth());
    date2.setFullYear(currentdate.getFullYear());

    date3.setDate(currentdate.getDate());
    date3.setMonth(currentdate.getMonth());
    date3.setFullYear(currentdate.getFullYear());

    if (
      currentdate < date1 ||
      currentdate > date2 ||
      next > end ||
      currentdate.getMonth() < date4.getMonth() ||
      (currentdate.getMonth() === date4.getMonth() && currentdate.getDate() < date4.getDate())
    )
      setCurrentScreen("before");
    else {
      if (currentdate < date3) setCurrentScreen("waiting");
      else setCurrentScreen("now");
    }
  };

  const scheduleNotifications = async () => {
    Notifications.cancelAllScheduledNotificationsAsync();
    const date1 = new Date();
    const date2 = [new Date(endTime).getHours(), new Date(endTime).getMinutes()];
    const date3 = new Date();
    const day = parseInt(daysCounter);
    let scheduleDuration;

    //@ts-ignore
    date1.setTime(date1.getTime() + trainingProgramData[day - 1 < 0 ? 0 : day - 1].time * 60 * 1000);

    if (date1.getHours() > date2[0] && date1.getMinutes() > date2[1] && day < 14) {
      date3.setHours(new Date(startTime).getHours());
      date3.setMinutes(new Date(startTime).getMinutes());
      date3.setDate(date1.getDate() + 1);

      scheduleDuration = (date3.getTime() - date1.getTime()) / 1000;

      const nextNot = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Czas na ćwiczenia",
          subtitle: "Ćwiczenia",
          body: "Pora na 'Russian Evil Pushups'!",
          priority: "max",
        },
        trigger: {
          seconds: scheduleDuration,
        },
      });
    } else if (day < 14) {
      scheduleDuration = (date1.getTime() - date3.getTime()) / 1000;
      const nextNot = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Czas na ćwiczenia",
          subtitle: "Ćwiczenia",
          body: "Pora na 'Russian Evil Pushups'!",
          priority: "max",
        },
        trigger: {
          seconds: scheduleDuration,
        },
      });
    }
  };

  const date = new Date(startTime);
  const hour = date.getHours();
  let min = date.getMinutes();
  //@ts-ignore
  if (min < 10) min = "0" + min;

  let pushUpsQuantity = 0;
  if (daysCounter && test) {
    //@ts-ignore
    const number = daysCounter * 1;
    //@ts-ignore
    const pushUps = test * 1;
    const index = number - 1 < 0 ? number - 1 : 0;
    pushUpsQuantity = Math.round(pushUps * (trainingProgramData[index].quantity / 100));
  }

  const saveNextSeries = async () => {
    const { test, startDate, startTime, endTime, daysCounter } = russianPushUpData;

    const date = new Date().getTime();
    //@ts-ignore
    const number = daysCounter * 1;
    const time = trainingProgramData[number - 1].time * 1;
    setRussianPushUp({
      test,
      startDate,
      startTime,
      endTime,
      daysCounter,
      nextSeries: new Date(date + time * 60000) + "",
    });
    try {
      await AsyncStorage.setItem("@nextSeries", new Date(date + time * 60000) + "");
    } catch (e) {
      console.log(e);
    }

    try {
      const jsonValue = await AsyncStorage.getItem("@pushUpResults");

      if (jsonValue != null) {
        let data = JSON.parse(jsonValue);
        const day = "day" + daysCounter;
        data[day] += pushUpsQuantity;
        try {
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem("@pushUpResults", jsonValue);
        } catch (e) {
          console.log(e);
        }
      }

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  let nowDay = daysCounter;
  if (
    new Date().getMonth() < new Date(startDate).getMonth() ||
    (new Date().getMonth() === new Date(new Date(startDate)).getMonth() &&
      new Date().getDate() < new Date(new Date(startDate)).getDate())
  )
    nowDay = "0";

  const main = () => {
    switch (currentScreen) {
      case "before": {
        return (
          <>
            <CustomText content={`Dzień ${nowDay} z 14`} style={[styles.text, styles.title]} />
            <CustomText content="Twój trening startuje o" style={styles.text} />
            <CustomText content={`${hour}:${min}`} style={styles.bigText} />
          </>
        );
      }
      case "waiting": {
        return (
          <>
            <CustomText content={`Dzień ${nowDay} z 14`} style={[styles.text, styles.title]} />
            <CustomText content="Następna seria będzie za" style={styles.text} />
            {/* @ts-ignore */}
            <CustomText
              content={
                //@ts-ignore
                new Date(new Date(nextSeries) - new Date()).getMinutes()
                  ? //@ts-ignore
                    new Date(new Date(nextSeries) - new Date()).getMinutes()
                  : "mniej niż"
              }
              style={styles.bigText}
            />
            <CustomText
              //@ts-ignore
              content={new Date(new Date(nextSeries) - new Date()).getMinutes() ? "minut/y" : "minutę"}
              style={styles.text}
            />
          </>
        );
      }
      case "now": {
        return (
          <>
            <View style={styles.main}>
              <View>
                <CustomText content={`Dzień ${nowDay} z 14`} style={[styles.text, styles.title]} />
                <CustomText content="Zrób" style={styles.text} />
                <CustomText content={pushUpsQuantity} style={styles.bigText} />
                <CustomText content="Pompki/Pompek" style={styles.text} />
              </View>
              <TouchableOpacity
                onPress={() => {
                  saveNextSeries();
                  scheduleNotifications();
                }}
              >
                <BigButton text="Zrobione" style={styles.btn} />
              </TouchableOpacity>
            </View>
          </>
        );
      }
    }
  };

  return (
    <>
      <Header screen="Rosyjskie Pompki" nav={() => props.navigation.navigate("Training")} />
      <StatusBar animated backgroundColor="#0E0F10" />
      <View style={styles.wrap}>
        <View>{main()}</View>
        <TouchableOpacity style={styles.bottomSection} onPress={() => props.navigation.navigate("PushUpProgress")}>
          <Cog />
          <CustomText content="Ustawienia i postępy" style={styles.smallText} />
          <Arrow type="option" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#1D1E1F",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    textAlign: "left",
    lineHeight: 28,
    marginTop: 16,
    marginBottom: 16,
  },
  text: {
    width: 320,
    fontSize: 24,
    lineHeight: 36,
    textAlign: "center",
  },
  bigText: {
    fontSize: 36,
    lineHeight: 48,
    marginTop: 8,
    marginBottom: 8,
    textAlign: "center",
  },
  btn: {
    marginBottom: 32,
  },
  smallText: {
    fontSize: 18,
    width: 256,
  },
  bottomSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 320,
    marginBottom: 32,
  },
});

const mapStateToProps = (data: any) => ({ data });
const mapDispatchToProps = { setTrainingData };

export default connect(mapStateToProps, mapDispatchToProps)(PushUpTraining);
