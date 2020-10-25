import React, { useState } from "react";
import { StatusBar, StyleSheet, View, Dimensions, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CustomText from "../components/CustomText";
import Header from "../components/Header";
import Input from "../components/Input";
import BigButton from "../components/BigButton";

import { connect } from "react-redux";
import { changeUsername } from "../actions/index";

const height = Dimensions.get("window").height;
const statusBarHeight: any = StatusBar.currentHeight;

const LoginScreen = (props: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const login = async () => {
    try {
      const response = await fetch(
        `https://runningapp-api.herokuapp.com/login?token=10c15a41094124737263dd77ac96dcb5&username=${username}&password=${password}`,
        { method: "POST" }
      );
      const json = await response.json();

      if (json.password !== true) {
        setErrorText(json.message);
        setUsername("");
        setPassword("");
      } else {
        props.changeUsername(username);
        props.navigation.navigate("Main");
      }
      return json;
    } catch (error) {
      console.error(error);
    }
  };
  const autoLogin = async () => {
    try {
      const response = await fetch(
        `https://runningapp-api.herokuapp.com/login?token=10c15a41094124737263dd77ac96dcb5&username=test1&password=test1`,
        { method: "POST" }
      );
      const json = await response.json();

      if (json.password !== true) {
        setErrorText(json.message);
      } else {
        props.changeUsername("test1");
        props.navigation.navigate("Main");
      }
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <StatusBar animated backgroundColor="#0E0F10" />
      <Header screen={"login"} noArrow />
      <View style={styles.wrap}>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <ImageBackground style={styles.img} source={require("../img/loginBackground.png")}>
            <View style={styles.background}>
              <CustomText content="Avalanche" style={styles.title} />
              <View style={styles.df}>
                <View>
                  <CustomText content="Zaloguj się" style={styles.text} />
                  <Input style={styles.input} placeholder="Nazwa Użytkownika" value={username} change={setUsername} />
                  <Input style={styles.input} type="password" placeholder="Hasło" value={password} change={setPassword} />
                </View>

                <View style={styles.bottomSection}>
                  <CustomText content={errorText} style={styles.errorText} />

                  <TouchableOpacity
                    onPress={() => {
                      if (username && password) login();
                    }}
                  >
                    <BigButton
                      text="Log In"
                      style={[
                        styles.btn,
                        !(username && password) && {
                          backgroundColor: "rgba(242,131,0,0.33)",
                        },
                      ]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => props.navigation.navigate("Register")}>
                    <CustomText content="Nie masz jeszcze konta?" style={styles.smallText} />
                    <CustomText content="Zarejestruj się" style={styles.orangeText} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#1D1E1F",
  },
  img: {
    height: height - 50,
  },
  background: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(29,30,31,0.75)",
    position: "relative",
  },
  df: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    fontSize: 36,
    marginTop: 16,
    marginBottom: 32,
  },
  text: {
    fontSize: 24,
    lineHeight: 36,
  },
  input: {
    marginTop: 14,
  },
  btn: {
    marginBottom: 16,
    marginLeft: "auto",
    marginRight: "auto",
  },
  bottomSection: {
    position: "absolute",
    bottom: 16,
    width: 320,
  },
  smallText: {
    textAlign: "right",
    fontSize: 14,
  },
  orangeText: {
    textAlign: "right",
    color: "#F28300",
    fontSize: 18,
  },
  errorText: {
    fontSize: 18,
    color: "#f00",
    textAlign: "center",
    marginBottom: 16,
  },
});

const mapStateToProps = (data: any) => ({ data });
const mapDispatchToProps = { changeUsername };

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
