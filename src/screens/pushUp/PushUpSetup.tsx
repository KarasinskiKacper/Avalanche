import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import { Input } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

import Header from "../../components/Header";

import { connect } from "react-redux";
import {} from "../../actions/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomText from "../../components/CustomText";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

Notifications.setNotificationChannelAsync("default", {
  name: "default",
  importance: Notifications.AndroidImportance.MAX,
  lightColor: "#FF231F7C",
});

const scheduleNotification = async (date: Date, time: Date) => {
  Notifications.cancelAllScheduledNotificationsAsync();
  const dateTime = date;

  dateTime.setHours(time.getHours());
  dateTime.setMinutes(time.getMinutes());
  dateTime.setSeconds(0);

  const not = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Czas na ćwiczenia",
      subtitle: "Ćwiczenia",
      body: "Pora na 'Russian Evil Pushups'!",
      priority: "max",
    },
    trigger: {
      seconds: (dateTime.getTime() - new Date().getTime()) / 1000,
      repeats: false,
    },
  });
};

const PushUpSetup = (props: any) => {
  const [show, setShow] = useState(0);
  const [date, setDate] = useState(new Date());
  const [inputDate, setInputDate] = useState(`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`);
  const [inputDate2, setInputDate2] = useState(new Date());
  const [fromTime, setFromTime] = useState(date);
  const [toTime, setToTime] = useState(date);
  const [pushUpsDone, setPushUpsDone] = useState(0);

  const [fromTimeDisplay, setFromTimeDisplay] = useState(
    `${fromTime.getHours() < 10 ? `0${fromTime.getHours}` : fromTime.getHours()}:${
      fromTime.getMinutes() < 10 ? `0${fromTime.getMinutes()}` : fromTime.getMinutes()
    }`
  );
  const [toTimeDisplay, setToTimeDisplay] = useState(
    `${toTime.getHours() + 1 < 10 ? `0${toTime.getHours()}` : toTime.getHours()}:${
      toTime.getMinutes() < 10 ? `0${toTime.getMinutes()}` : toTime.getMinutes()
    }`
  );

  const changeDate = (e: any, newDate: any) => {
    const pickedDate = newDate || date;
    setShow(0);
    setDate(pickedDate);
    setInputDate(`${pickedDate.getDate()}.${pickedDate.getMonth() + 1}.${pickedDate.getFullYear()}`);
    setInputDate2(pickedDate);
  };

  const changeFromTime = (e: any, newTime: any) => {
    const pickedTime = newTime || date;
    pickedTime.setSeconds(0);
    const hour = pickedTime.getHours();
    const min = pickedTime.getMinutes();
    setShow(0);
    setFromTime(pickedTime);
    setFromTimeDisplay(`${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`);
  };
  const changeToTime = (e: any, newTime: any) => {
    const pickedTime = newTime || date;
    const hour = pickedTime.getHours();
    const min = pickedTime.getMinutes();
    setShow(0);
    setToTime(pickedTime);
    setToTimeDisplay(`${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`);
  };

  const storeData = async (pushUpsDone: any, inputDate: any, fromTime: any, toTime: any) => {
    try {
      await AsyncStorage.setItem("@pushUpsTest", pushUpsDone + "");
      await AsyncStorage.setItem("@startDate", inputDate + "");
      await AsyncStorage.setItem("@startTime", fromTime + "");
      await AsyncStorage.setItem("@endTime", toTime + "");
      await AsyncStorage.setItem("@daysCounter", "1");
      await AsyncStorage.setItem("@nextSeries", fromTime + "");

      const jsonValue = JSON.stringify({
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
        endTest: 0,
      });
      await AsyncStorage.setItem("@pushUpResults", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header screen={"Rosyjskie Pompki"} nav={() => props.navigation.goBack()} />
      <View style={styles.wrap}>
        <View style={styles.container}>
          <CustomText style={styles.title} content="Zrób tyle pompek, ile dasz radę" />
          <View style={{ marginTop: 32 }}>
            <View style={styles.setUp}>
              <Text style={styles.setUpText}>Zrobionych pompek:</Text>
              <Input
                placeholder="0"
                placeholderTextColor="#9A9A9A"
                containerStyle={styles.setUpInput}
                inputContainerStyle={{
                  width: 110,
                  height: 36,
                  borderBottomWidth: 0,
                }}
                inputStyle={{ color: "#E7EBEF", lineHeight: 36, textAlign: "center" }}
                keyboardType="number-pad"
                style={styles.input}
                onChangeText={(text) => (text ? setPushUpsDone(parseInt(text)) : setPushUpsDone(0))}
                value={pushUpsDone.toString()}
              ></Input>
            </View>
            <TouchableOpacity style={styles.setUp} onPress={() => setShow(1)}>
              <CustomText style={styles.setUpText} content="Zaczynamy:" />
              <View style={styles.setUpInput}>
                <Text style={styles.setUpInputText}>{inputDate}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.setUp} onPress={() => setShow(2)}>
              <CustomText style={styles.setUpText} content="Od godziny:" />
              <View style={styles.setUpInput}>
                <Text style={styles.setUpInputText}>{fromTimeDisplay}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.setUp} onPress={() => setShow(3)}>
              <CustomText style={styles.setUpText} content="Do godziny:" />
              <View style={styles.setUpInput}>
                <Text style={styles.setUpInputText}>{toTimeDisplay}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonWrap}>
          <TouchableOpacity style={styles.button} onPress={() => props.navigation.goBack()}>
            <Text style={styles.buttonText}>Powrót</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (pushUpsDone <= 5) {
                Alert.alert(
                  "Błąd",
                  "Podaj odpowiednią ilość pompek",
                  [
                    {
                      text: "OK",
                    },
                  ],
                  {
                    cancelable: false,
                  }
                );
              } else {
                storeData(pushUpsDone, inputDate2, fromTime, toTime);
                date.setHours(fromTime.getHours());
                scheduleNotification(date, fromTime);
                props.navigation.push("PushUpTraining");
              }
            }}
          >
            <Text style={styles.buttonText}>Dalej</Text>
          </TouchableOpacity>
        </View>
      </View>
      {show === 1 ? (
        <RNDateTimePicker value={date} mode="date" onChange={changeDate} minimumDate={new Date()} />
      ) : show === 2 ? (
        <RNDateTimePicker value={date} mode="time" onChange={changeFromTime} is24Hour={true} />
      ) : show === 3 ? (
        <RNDateTimePicker value={date} mode="time" onChange={changeToTime} is24Hour={true} />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: "#1D1E1F",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    width: 320,
    marginTop: 16,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    color: "#E7EBEF",
    textAlign: "center",
  },
  input: {
    width: 110,
  },
  setUp: {
    width: 320,
    height: 36,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  setUpText: {
    color: "#E7EBEF",
    fontSize: 18,
    lineHeight: 36,
  },
  setUpInput: {
    height: 36,
    width: 110,
    paddingHorizontal: 0,
    backgroundColor: "#0E0F10",
    borderColor: "#F28300",
    borderWidth: 1,
  },
  setUpInputText: {
    color: "#E7EBEF",
    fontSize: 18,
    lineHeight: 36,
    textAlign: "center",
  },
  buttonWrap: {
    width: 320,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 48,
    backgroundColor: "#F28300",
    borderRadius: 25,
    marginBottom: 32,
  },
  buttonText: {
    fontSize: 24,
    color: "#0E0F10",
  },
});

const mapStateToProps = (data: any) => ({ data });
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PushUpSetup);
