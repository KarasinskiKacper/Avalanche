import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Header from "./Header";
import ProfileOption from "./ProfileOption";
import CustomText from "./CustomText";

import { connect } from "react-redux";
import { setIsDataNeedFetch } from "../actions/index";

const Profile = (props: any) => {
  const { username, isInGroup, isDataNeedFetch } = props.data.data;

  const [isDataFetched, setIsDataFetched] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    if (!isDataFetched || isDataNeedFetch) {
      fetchApi();
      props.setIsDataNeedFetch(false);
      setIsDataFetched(true);
    }
  });

  const fetchApi = async () => {
    try {
      const response = await fetch(
        `https://runningapp-api.herokuapp.com/account?token=10c15a41094124737263dd77ac96dcb5&username=${username}`
      );
      const json = await response.json();
      setData(json);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={props.style}>
      <Header screen={"Profil"} noArrow />
      <ScrollView style={styles.wrap}>
        <View style={styles.main}>
          <View style={styles.module}>
            <CustomText content={"Konto"} style={styles.title} />
            <View>
              <ProfileOption nav={props.nav} svg="cog" text="Zmień Nazwę Użytkownika" secondaryText={username} />
              <ProfileOption nav={props.nav} svg="cog" text="Zmień Email" secondaryText={data?.email} />
              <ProfileOption nav={props.nav} svg="cog" text="Zmień Hasło" />
            </View>
          </View>

          <View style={styles.module}>
            <CustomText content={"Znajomi"} style={styles.title} />
            <View>
              <CustomText content={"Wkrótce"} style={styles.title} />
            </View>
          </View>

          <View style={styles.module}>
            <CustomText content={"Grupy"} style={styles.title} />
            {isInGroup ? (
              <View>
                <CustomText content={"Wkrótce"} style={styles.title} />
              </View>
            ) : (
              <View>
                <CustomText content={"Wkrótce"} style={styles.title} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  module: {
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    width: 320,
  },
});

const mapStateToProps = (data: any) => ({ data });
const mapDispatchToProps = { setIsDataNeedFetch };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
