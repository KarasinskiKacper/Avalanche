import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import CustomText from "./CustomText";

const TrainingOption = (props: any) => {
  return (
    <TouchableOpacity style={styles.wrap} onPress={props.nav}>
      <View style={styles.textWrap}>
        <CustomText content={props.title} style={styles.text} />
      </View>

      {props.img}

      <View style={[styles.textWrap, styles.textWrap2]}>
        <CustomText content={props.text} style={[styles.text, styles.text2]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: 320,
    height: 192,
    marginTop: 32,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: "hidden",
  },
  textWrap: {
    width: 320,
    height: 32,
    backgroundColor: "#0E0F10",
  },
  textWrap2: {
    backgroundColor: "rgba(14, 15, 16, 0.8)",
  },
  text: {
    textAlign: "center",
    fontSize: 22,
    color: "#F28300",
    lineHeight: 32,
  },
  text2: {
    fontSize: 18,
    color: "#E7EBEF",
  },
});

export default TrainingOption;
