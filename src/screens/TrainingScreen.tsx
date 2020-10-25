import React from "react";

import { StyleSheet, View, ImageBackground, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Header from "../components/Header";
import TrainingOption from "../components/TrainingOption";

const TrainingScreen = ({ navigation }: any, props: any) => {
  return (
    <>
      <Header screen={"Trening"} nav={() => navigation.goBack()} />
      <ScrollView style={styles.wrap}>
        <View style={styles.main}>
          <TrainingOption
            title="Program rosyjskich pompek"
            text="Trening wytrzymałościowy i siły rąk."
            img={<ImageBackground style={styles.img} source={require("../img/pushup.png")}></ImageBackground>}
            nav={() => navigation.push("SelectedTraining", { program: "pushUp", title: "Rosyjskie Pompki" })}
            link="PushUp"
          />
          <TrainingOption
            title="Program rosyjskich przysiadów"
            text="Trening wytrzymałościowy i siły nóg."
            img={<ImageBackground style={styles.img} source={require("../img/squatting.png")}></ImageBackground>}
            nav={() => navigation.push("SelectedTraining", { program: "Squats", title: "Rosyjskie Przysiady" })}
          />
          <TrainingOption
            title='Program "Burpee"'
            text="Trening siłowy i wytrzymałościowy."
            img={<ImageBackground style={styles.img} source={require("../img/burpee.png")}></ImageBackground>}
            nav={() => navigation.push("SelectedTraining", { program: "Burpees", title: 'Program "Burpees"' })}
          />
          <TrainingOption
            title="Program biegowy"
            text="Trening wytrzymałościowy."
            img={<ImageBackground style={styles.img} source={require("../img/running.png")}></ImageBackground>}
            nav={() => Alert.alert("", "Wkrótce", [{ text: "Powrót" }], { cancelable: true })}
          />
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#1D1E1F",
  },
  img: {
    flex: 1,
    resizeMode: "cover",
    width: 320,
    height: 192,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    paddingBottom: 24,
  },
});
export default TrainingScreen;
