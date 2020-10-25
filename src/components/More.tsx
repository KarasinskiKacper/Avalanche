import React, { useEffect, useState } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { connect } from "react-redux";

import appVersion from "../../app.json";

import Header from "../components/Header";
import MoreOption from "../components/MoreOption";
import CustomText from "./CustomText";

const More = (props: any) => {
  return (
    <View style={props.style}>
      <Header screen={"Więcej"} noArrow />
      <ScrollView style={styles.wrap}>
        <View style={styles.section}>
          <CustomText content={"Ustawienia"} style={styles.title} />
          <MoreOption text="Zarządzaj Powiadomieniami" icon="bell" withArrow nav={props.nav} />
          <MoreOption text="Wyloguj się" icon="logOut" withArrow nav={props.nav} />
        </View>
        <View style={styles.section}>
          <CustomText content={"O Avalanche"} style={styles.title} />
          <MoreOption text="Wersja" icon="wersja" secondaryText={`a${appVersion.expo.version}`} />
          <MoreOption text="Made by Gr4v1ty" icon="logo" />
          <MoreOption
            text="Sprawdź aplikację na GitHubie"
            icon="git"
            withArrow
            link="https://github.com/Qler-gra/Avalanche"
          />
          <MoreOption text="Liczba użytkowników:" secondaryText="0" icon="crowd" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: 320,
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: "#E7EBEF",
  },
  section: {
    marginTop: 16,
  },
});

const mapStateToProps = (data: any) => ({ data });
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(More);
