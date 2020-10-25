import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";

import PushUp from "./pushUp/PushUpMain";
import SquatsMain from "./squats/SquatsMain";
import BurpeesMain from "./burpees/BurpeesMain";

const SelectedTrainingScreen = (props: any) => {
  const { title, program }: any = props.navigation.state.params;
  return (
    <>
      <Header screen={title} nav={() => props.navigation.goBack()} />
      <View style={styles.wrap}>
        {program === "pushUp" ? (
          <PushUp nav={props.navigation} />
        ) : program === "Squats" ? (
          <SquatsMain nav={props.navigation} />
        ) : program === "Burpees" ? (
          <BurpeesMain nav={props.navigation} />
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
});

export default SelectedTrainingScreen;
