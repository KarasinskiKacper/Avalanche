import React, { useState } from "react";
import { StatusBar, StyleSheet, View, Dimensions } from "react-native";
import Menu from "../components/Menu"

import Main from '../components/Main'
import Profile from '../components/Profile'
import More from "../components/More";

import { connect } from "react-redux"
import { } from "../actions/index";

const height = Dimensions.get('screen').height
const width = Dimensions.get("screen").width

const MainScreen = (props: any) => {
  const [active, setActive] = useState(1)

  const setActivePanel = (arg: number) => {
    setActive(arg)
  }

  return (
    <View style={styles.wrap}>


      <StatusBar animated backgroundColor="#0E0F10" />

      <Main nav={props.navigation} style={[styles.panel, { left: width * (active - 1) * -1 }]} />

      <Profile nav={props.navigation} style={[styles.panel, { left: width * (active - 2) * -1 }]} />

      <More nav={props.navigation} style={[styles.panel, { left: width * (active - 3) * -1 }]} />

      <Menu setPanel={setActivePanel} />

    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#1D1E1F',
    overflow: "hidden",
  },
  panel: {
    position: "absolute",
    height: height - 90,
    width: width,
  }

});

const mapStateToProps = (data: any) => ({ data });
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
