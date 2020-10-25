import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Header from "../components/Header";
import CustomText from "../components/CustomText";
import RadioBtn from "../components/RadioButton";

import { connect } from "react-redux";
import { changeNotificationStatus } from "../actions/index";

const height = Dimensions.get("screen").height;

const ManageNotifications = (props: any) => {
  const [notificationStatus, setNotificationStatus] = useState(props.data.notificationStatus);

  return (
    <>
      <Header screen={"Powiadomienia"} nav={() => props.navigation.goBack()} />
      <View style={styles.wrap}>
        <View style={styles.df}>
          <CustomText content="Stan Powiadomień" style={styles.text} />
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              notificationStatus !== "enabled"
                ? setNotificationStatus("enabled")
                : () => {
                    return;
                  };
            }}
          >
            <CustomText content="Włączone" style={styles.text2} />
            <RadioBtn selected={notificationStatus === "enabled" ? true : false} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              notificationStatus !== "disabled"
                ? setNotificationStatus("disabled")
                : () => {
                    return;
                  };
            }}
          >
            <CustomText content="Wyłączone" style={styles.text2} />
            <RadioBtn selected={notificationStatus === "disabled" ? true : false} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              notificationStatus !== "enabledWithin"
                ? setNotificationStatus("enabledWithin")
                : () => {
                    return;
                  };
            }}
          >
            <CustomText content="Włączone w Okresie" style={styles.text2} />
            <RadioBtn selected={notificationStatus === "enabledWithin" ? true : false} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              props.changeNotificationStatus(notificationStatus);
            }}
          >
            <CustomText content="Zapisz zmiany" style={styles.text2} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    display: "flex",
    flex: 1,
    backgroundColor: "#1D1E1F",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    lineHeight: 36,
    width: 320,
    marginTop: 16,
  },
  text2: {
    width: 210,
    fontSize: 18,
    lineHeight: 36,
    marginTop: 8,
  },
  df: {
    display: "flex",
    height: height - 50,
    width: 320,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 320,
  },
});

const mapStateToProps = (data: any) => ({ ...data });
const mapDispatchToProps = { changeNotificationStatus };

export default connect(mapStateToProps, mapDispatchToProps)(ManageNotifications);
