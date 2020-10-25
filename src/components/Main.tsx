import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Header from "../components/Header";

import TrainingOption from "./TrainingOption";
import CustomText from "./CustomText";

const Main = (props: any) => {
  return (
    <View style={props.style}>
      <Header screen={"Aktywności"} noArrow />
      <ScrollView style={styles.wrap}>
        <View style={styles.main}>
          <CustomText content={"Na co masz ochotę"} style={styles.text} />
          <TrainingOption
            title="Trening"
            text="Programy treningowe."
            nav={() => props.nav.push("Training")}
            img={<ImageBackground style={styles.img} source={require("../img/training.png")}></ImageBackground>}
          />
          <TrainingOption
            title="Rywalizacja"
            text="Rywalizuj z innymi."
            nav={() => props.nav.push("Competitive")}
            img={<ImageBackground style={styles.img} source={require("../img/competitive.png")}></ImageBackground>}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    paddingBottom: 24,
  },
  text: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 36,
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
});

export default Main;
