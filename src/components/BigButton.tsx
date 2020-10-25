import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import CustomText from "./CustomText";

const BigButton = (props: any) => {
  return (
    <View style={[styles.wrap, props.style]}>
      <CustomText style={styles.text} content={props.text} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: 240,
    height: 48,
    borderRadius: 25,
    backgroundColor: "#F28300",
  },
  text: {
    flex: 1,
    fontSize: 24,
    color: "#0E0F10",
    textAlign: "center",
    lineHeight: 48,
  },
});

export default BigButton;
