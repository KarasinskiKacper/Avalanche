import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import CustomText from "../../components/CustomText";

import AsyncStorage from "@react-native-async-storage/async-storage";

const SquatsMain = (props: any) => {
  return (
    <View style={styles.wrap}>
      <ScrollView style={styles.description}>
        <CustomText
          style={styles.text}
          content={`"The Evil Russian Squat Routine" to 6 tygodniowy program.  Pierwszego dnia przejdziesz test, sprawdzający, ile przysiadów jesteś w stanie zrobić.  Po zakończeniu testu, aplikacja podpowie, ile brzuszków powinieneś robić w co drugi dzień. W ostatnim dniu przejdziesz finalny test podsumowujący twoje postępy.`}
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("", "Wkrótce", [{ text: "Powrót" }], { cancelable: true })}
      >
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

export default SquatsMain;
