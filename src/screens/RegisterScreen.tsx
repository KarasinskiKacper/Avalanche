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

const RegisterScreen = (props: any) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const register = async () => {
    if (password === confirmPassword && RegExp(".@.").test(email)) {
      try {
        const response = await fetch(
          `https://runningapp-api.herokuapp.com/account?token=10c15a41094124737263dd77ac96dcb5&username=${username}&password=${password}&email=${email}`,
          { method: "POST" }
        );
        const json = await response.json();

        if (json.message === "Zarejestrowano") {
          props.changeUsername(username);
          props.navigation.navigate("Main");
        } else {
          if (json.message === "Email jest juz zajety") setEmail("");
          setErrorText(json.message);
        }

        return json;
      } catch (error) {
        console.error(error);
      }
    } else if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setErrorText("Hasła się nie zgadzają");
    } else {
      setErrorText("Email jest niepoprawny");
      setEmail("");
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
                  <CustomText content="Zarejestruj się" style={styles.text} />
                  <Input style={styles.input} placeholder="Nazwa Użytkownika" value={username} change={setUsername} />
                  <Input style={styles.input} placeholder="Email" value={email} change={setEmail} />
                  <Input style={styles.input} type="password" placeholder="Hasło" value={password} change={setPassword} />
                  <Input
                    style={styles.input}
                    type="password"
                    placeholder="Potwierdź Hasło"
                    value={confirmPassword}
                    change={setConfirmPassword}
                  />
                </View>

                <View style={styles.bottomSection}>
                  <CustomText content={errorText} style={styles.errorText} />

                  <TouchableOpacity
                    onPress={() => {
                      if (username && password && email && confirmPassword) register();
                    }}
                  >
                    <BigButton
                      text="Sing Up"
                      style={[
                        styles.btn,
                        !(username && password && email && confirmPassword) && {
                          backgroundColor: "rgba(242,131,0,0.33)",
                        },
                      ]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
                    <CustomText content="Masz już konto?" style={styles.smallText} />
                    <CustomText content="Zaloguj się" style={styles.orangeText} />
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
