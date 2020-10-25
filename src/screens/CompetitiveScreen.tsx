import React from "react";
import { StyleSheet, View, ImageBackground, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Header from "../components/Header";
import TrainingOption from "../components/TrainingOption";

//@ts-ignore
const CompetitiveScreen = ({ navigation }, props: any) => {
  return (
    <ScrollView style={styles.wrap}>
      <View style={styles.main}>
        <Header screen={"Rywalizacja"} nav={() => navigation.goBack()} />

        <TrainingOption
          title="Program biegowy"
          text="Rywalizacja - ogólny przebyty dystans."
          img={<ImageBackground style={styles.img} source={require("../img/running.png")}></ImageBackground>}
          nav={() => Alert.alert("", "Wkrótce", [{ text: "Powrót" }], { cancelable: true })}
        />
      </View>
    </ScrollView>
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
export default CompetitiveScreen;
