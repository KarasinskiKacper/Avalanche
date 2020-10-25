import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Header from "../../components/Header";
import CustomText from "../../components/CustomText";
import BigButton from "../../components/BigButton";

import { connect } from "react-redux";
import {} from "../../actions/index";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PushUpProgress = (props: any) => {
  const [show, setShow] = useState(0);
  const [isDataImported, setIsDataImported] = useState(false);
  const [data, setData] = useState({
    test: "",
    startDate: ``,
    startTime: ``,
    endTime: ``,
    daysCounter: "",
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
  });

  useEffect(() => {
    if (!isDataImported) {
      getData();
      setIsDataImported(true);
    }
  });

  const { test, startDate, startTime, endTime, daysCounter, results } = data;
  let time1 = new Date();
  let time2 = new Date();

  const getData = async () => {
    try {
      const test = await AsyncStorage.getItem("@pushUpsTest");
      const startDate = await AsyncStorage.getItem("@startDate");
      const startTime = await AsyncStorage.getItem("@startTime");
      const endTime = await AsyncStorage.getItem("@endTime");
      const daysCounter = await AsyncStorage.getItem("@daysCounter");
      const jsonValue = await AsyncStorage.getItem("@pushUpResults");
      if (jsonValue != null) {
        const data2 = JSON.parse(jsonValue);
        if (test !== null && startDate !== null && startTime !== null && endTime !== null && daysCounter !== null) {
          setData({
            test,
            startDate,
            startTime,
            endTime,
            daysCounter,
            results: data2,
          });
          time1 = new Date(startTime);
          time2 = new Date(endTime);
          setFromTimeDisplay(
            `${time1.getHours() < 10 ? `0${time1.getHours()}` : time1.getHours()}:${
              time1.getMinutes() < 10 ? `0${time1.getMinutes()}` : time1.getMinutes()
            }`
          );
          setToTimeDisplay(
            `${time2.getHours() < 10 ? `0${time2.getHours()}` : time2.getHours()}:${
              time2.getMinutes() < 10 ? `0${time2.getMinutes()}` : time2.getMinutes()
            }`
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const date = new Date();
  const [fromTime, setFromTime] = useState(date);
  const [toTime, setToTime] = useState(date);
  const [fromTimeDisplay, setFromTimeDisplay] = useState(
    `${time1.getHours() < 10 ? `0${time1.getHours()}` : time1.getHours()}:${
      time1.getMinutes() < 10 ? `0${time1.getMinutes()}` : time1.getMinutes()
    }`
  );
  const [toTimeDisplay, setToTimeDisplay] = useState(
    `${time2.getHours() < 10 ? `0${time2.getHours()}` : time2.getHours()}:${
      time2.getMinutes() < 10 ? `0${time2.getMinutes()}` : time2.getMinutes()
    }`
  );

  const progress1 = [
    { day: 1, amount: results.day1 },
    { day: 2, amount: results.day2 },
    { day: 3, amount: results.day3 },
    { day: 4, amount: results.day4 },
    { day: 5, amount: results.day5 },
    { day: 6, amount: results.day6 },
    { day: 7, amount: results.day7 },
  ];
  const progress2 = [
    { day: 8, amount: results.day8 },
    { day: 9, amount: results.day9 },
    { day: 10, amount: results.day10 },
    { day: 11, amount: results.day11 },
    { day: 12, amount: results.day12 },
    { day: 13, amount: results.day13 },
    { day: 14, amount: results.day14 },
  ];

  //@ts-ignore
  const updateTime = async (time, type) => {
    try {
      await AsyncStorage.setItem("@" + time, time + "");
    } catch (e) {
      console.log(e);
    }
  };

  const changeFromTime = (e: any, newTime: any) => {
    const pickedTime = newTime || date;
    updateTime(pickedTime, "startTime");
    pickedTime.setSeconds(0);
    const hour = pickedTime.getHours();
    const min = pickedTime.getMinutes();
    setShow(0);
    setFromTime(pickedTime);
    setFromTimeDisplay(`${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`);
  };
  const changeToTime = (e: any, newTime: any) => {
    const pickedTime = newTime || date;
    updateTime(pickedTime, "endTime");
    const hour = pickedTime.getHours();
    const min = pickedTime.getMinutes();
    setShow(0);
    setToTime(pickedTime);
    setToTimeDisplay(`${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`);
  };

  const resetProgress = async () => {
    try {
      await AsyncStorage.removeItem("@pushUpsTest");
      await AsyncStorage.removeItem("@startDate");
      await AsyncStorage.removeItem("@startTime");
      await AsyncStorage.removeItem("@endTime");
      await AsyncStorage.removeItem("@daysCounter");
      await AsyncStorage.removeItem("@nextSeries");
      await AsyncStorage.removeItem("@pushUpResults");
      setData({
        test: "",
        startDate: "",
        startTime: "",
        endTime: "",
        daysCounter: "",
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
      });
      time1 = new Date();
      time2 = new Date();
      setFromTimeDisplay(
        `${time1.getHours() < 10 ? `0${time1.getHours()}` : time1.getHours()}:${
          time1.getMinutes() < 10 ? `0${time1.getMinutes()}` : time1.getMinutes()
        }`
      );
      setToTimeDisplay(
        `${time2.getHours() < 10 ? `0${time2.getHours()}` : time2.getHours()}:${
          time2.getMinutes() < 10 ? `0${time2.getMinutes()}` : time2.getMinutes()
        }`
      );
    } catch (e) {
      console.log(e);
    }
  };

  let counter = 0;
  for (let i = 1; i < 15; i++) {
    //@ts-ignore
    counter += results["day" + i] * 1;
  }
  return (
    <>
      <Header screen="Rosyjskie Pompki" nav={() => props.navigation.goBack()} />
      <View style={styles.wrap}>
        <View style={styles.container}>
          <CustomText style={styles.title} content="Postępy" />
          <View>
            <View style={styles.progressContainer}>
              <CustomText style={[styles.text, { width: 120 }]} content="Pierwszy test:" />
              <CustomText style={styles.text} content={test} />
            </View>
            <View style={styles.progressContainer}>
              <CustomText style={[styles.text, { width: 120 }]} content="Ostatni test:" />
              <CustomText style={styles.text} content={results.day14} />
            </View>
          </View>

          <View style={[styles.progressContainer, { justifyContent: "space-between" }]}>
            <View style={{ width: 70 }}>
              <CustomText style={styles.text} content="Dzień:" />
              <CustomText style={styles.text} content="Pompek:" />
            </View>
            {progress1.map((day, index) => (
              <View key={index}>
                <CustomText style={[styles.text, { width: 35, textAlign: "center" }]} content={day.day} />
                <CustomText style={[styles.text, { width: 35, textAlign: "center" }]} content={day.amount} />
              </View>
            ))}
          </View>

          <View style={[styles.progressContainer, { justifyContent: "space-between" }]}>
            <View style={{ width: 70 }}>
              <CustomText style={styles.text} content="Dzień:" />
              <CustomText style={styles.text} content="Pompek:" />
            </View>
            {progress2.map((day, index) => (
              <View key={index}>
                <CustomText style={[styles.text, { width: 35, textAlign: "center" }]} content={day.day} />
                <CustomText style={[styles.text, { width: 35, textAlign: "center" }]} content={day.amount} />
              </View>
            ))}
          </View>

          <View style={styles.progressContainer}>
            <CustomText style={[styles.text, { width: 120 }]} content="Łącznie:" />
            <CustomText style={styles.text} content={counter} />
          </View>

          <CustomText style={styles.title} content="Ustawienia" />
          <TouchableOpacity style={styles.setting} onPress={() => setShow(1)}>
            <CustomText style={styles.settingText} content="Od godziny:" />
            <View style={styles.settingInput}>
              <Text style={styles.settingInputText}>{fromTimeDisplay}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.setting} onPress={() => setShow(2)}>
            <CustomText style={styles.settingText} content="Do godziny:" />
            <View style={styles.settingInput}>
              <Text style={styles.settingInputText}>{toTimeDisplay}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Zresetuj postęp",
                "Czy jesteś pewny? Nie możesz tego cofnąć!",
                [
                  {
                    text: "Tak",
                    onPress: () => resetProgress(),
                  },
                  {
                    text: "Nie",
                  },
                ],
                {
                  cancelable: false,
                }
              )
            }
          >
            <BigButton text="Zresetuj postęp" />
          </TouchableOpacity>
        </View>
      </View>
      {show === 1 ? (
        <RNDateTimePicker value={date} mode="time" onChange={changeFromTime} is24Hour={true} />
      ) : show === 2 ? (
        <RNDateTimePicker value={date} mode="time" onChange={changeToTime} is24Hour={true} />
      ) : null}
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
  },
  container: {
    width: 320,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 32,
  },
  title: {
    textAlign: "left",
    width: 320,
    lineHeight: 36,
    fontSize: 24,
    marginTop: 16,
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
  },
  setting: {
    width: 320,
    height: 36,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingText: {
    color: "#E7EBEF",
    fontSize: 18,
    lineHeight: 36,
  },
  settingInput: {
    height: 36,
    width: 110,
    paddingHorizontal: 0,
    backgroundColor: "#0E0F10",
    borderColor: "#F28300",
    borderWidth: 1,
  },
  settingInputText: {
    color: "#E7EBEF",
    fontSize: 18,
    lineHeight: 36,
    textAlign: "center",
  },
  progressContainer: {
    display: "flex",
    flexDirection: "row",
    width: 320,
  },
});

const mapStateToProps = (data: any) => ({ data });
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PushUpProgress);
