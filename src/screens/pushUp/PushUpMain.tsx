import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import CustomText from "../../components/CustomText";

import AsyncStorage from "@react-native-async-storage/async-storage";

const PushUp = (props: any) => {
  const [isChecked, setIsChecked] = useState(false);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@pushUpsTest");
      if (value !== null) {
        props.nav.navigate("PushUpTraining");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!isChecked) {
      getData();
      setIsChecked(true);
    }
  });

  return (
    <View style={styles.wrap}>
      <ScrollView style={styles.description}>
        <CustomText
          style={styles.text}
          content='"The Evil Russian Push-up Routine" to 15-dniowy program. Pierwszego dnia przejdziesz test, sprawdzający, ile pompek jesteś w stanie zrobić. Po zakończeniu testu, aplikacja podpowie, ile pompek powinieneś/powinnaś robić przez
          cały czas trwania programu, w określonych odstępach. W ostatnim dniu przejdziesz finalny test podsumowujący twoje
          postępy.'
        />
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => props.nav.push("PushUpSetup")}>
        <CustomText style={styles.buttonText} content="Zaczynajmy" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1D1E1F",
  },
  text: {
    color: "#E7EBEF",
    lineHeight: 32,
    fontSize: 18,
    textAlign: "justify",
  },
  description: {
    width: 320,
    marginTop: 16,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 240,
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

export default PushUp;
