import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";

import CustomText from "./CustomText";

const ProfileOption = (props: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[props.style, styles.wrap]}>
      <CustomText
        content={props.value ? props.placeholder : ""}
        style={[props.value && styles.label, isFocused && styles.labelFocus]}
      />
      <TextInput
        style={[styles.input, isFocused && styles.focus]}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor="#9A9A9A"
        onChangeText={(text) => {
          props.type === "email" ? props.change(text.toLocaleLowerCase()) : props.change(text);
        }}
        onFocus={() => setIsFocused(true)}
        onEndEditing={() => setIsFocused(false)}
        secureTextEntry={props.type === "password" && true}
        keyboardType={props.type === "email" ? "email-address" : "default"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    display: "flex",
    flexDirection: "column",
    height: 54,
  },
  input: {
    alignSelf: "flex-end",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 36,
    width: 320,
    borderBottomWidth: 1,
    borderBottomColor: "#0E0F10",
    fontSize: 18,
    color: "#E7EBEF",
    fontFamily: "Lato",
  },
  focus: {
    borderBottomColor: "#F28300",
  },
  label: {
    height: 18,
    color: "#9A9A9A",
    marginBottom: 1.5,
  },
  labelFocus: {
    color: "#F28300",
  },
});

export default ProfileOption;
