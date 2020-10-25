import React, { useState } from "react";
import { StyleSheet, View, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Bell from "./svg/Bell";
import CrowdIcon from "./svg/CrowdIcon";
import GitHubIcon from "./svg/GitHubIcon";
import Logo from "./svg/Logo";
import LogOut from "./svg/LogOut";
import VersionIcon from "./svg/VersionIcon";
import MoreArrow from "./svg/MoreArrow";
import CustomText from "./CustomText";

const MoreOption = (props: any) => {
  const [icon, setIcon] = useState(props.icon);
  return (
    <TouchableOpacity
      style={styles.more}
      onPress={
        props.link
          ? () => Linking.openURL(props.link)
          : props.text === "Zarządzaj Powiadomieniami"
          ? () => props.nav.navigate("ManageNotifications")
          : props.text === "Wyloguj się"
          ? () => props.nav.navigate("Login")
          : () => {
              return;
            }
      }
    >
      {icon === "bell" ? (
        <Bell />
      ) : icon === "crowd" ? (
        <CrowdIcon />
      ) : icon === "git" ? (
        <GitHubIcon />
      ) : icon === "logo" ? (
        <Logo width={24} height={16} white />
      ) : icon === "wersja" ? (
        <VersionIcon />
      ) : icon === "logOut" ? (
        <LogOut />
      ) : null}
      <View style={styles.textContainer}>
        {props.secondaryText ? (
          <>
            <CustomText content={props.text} style={styles.text} />
            <CustomText content={props.secondaryText} style={styles.secondaryText} />
          </>
        ) : (
          <CustomText content={props.text} style={styles.text} />
        )}
      </View>
      {props.withArrow ? <MoreArrow /> : null}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  more: {
    display: "flex",
    width: 320,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 42,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 8,
  },
  text: {
    fontSize: 18,
    width: 256,
  },
  secondaryText: {
    fontSize: 14,
    color: "#9A9A9A",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 8,
    marginRight: 8,
  },
});

export default MoreOption;
