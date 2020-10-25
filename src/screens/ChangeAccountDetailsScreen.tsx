import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Header from "../components/Header";
import Input from "../components/Input";
import CustomText from "../components/CustomText";

import { connect } from "react-redux";
import { setIsDataNeedFetch, changeUsername } from "../actions/index";

const height = Dimensions.get("screen").height;

const ChangeAccountDetailsScreen = (props: any) => {
  const type = props.navigation.state.params.type;

  const [newValue, setNewValue] = useState("");
  const [password, setPassword] = useState("");
  const [confirmValue, setConfirmValue] = useState("");

  const [isDataFetched, setIsDataFetched] = useState(false);
  const [data, setData] = useState({});
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (!isDataFetched) {
      fetchApi();
      setIsDataFetched(true);
    }
  });

  const { username } = props.data.data;

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

  const updateApi = async (type: any) => {
    try {
      const response = await fetch(
        `https://runningapp-api.herokuapp.com/updateAccount?username=${username}&type=${type}&new=${newValue}&token=10c15a41094124737263dd77ac96dcb5&password=${password}`,
        { method: "POST" }
      );
      const json = await response.json();

      if (json.message === "Niepoprawne hasło") setPassword("");

      if (type === "username") {
        if (json.message === "Zmieniono nazwe uzytkownika") {
          props.changeUsername(newValue);
          props.navigation.goBack();
        } else setErrorText(json.message);
      } else if (type === "email") {
        if (json.message === "Zmieniono email uzytkownika") props.navigation.goBack();
        else setErrorText(json.message);
      } else if (type === "password") {
        if (json.message === "Zmieniono haslo uzytkownika") props.navigation.goBack();
        else setErrorText(json.message);
      } else setErrorText("Coś poszło nie tak");

      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const main = () => {
    switch (type) {
      case "username": {
        return (
          <>
            <Header screen={"Zmień Nazwę Użytkownika"} nav={() => props.navigation.goBack()} />
            <View style={styles.df}>
              <View style={styles.main}>
                <View>
                  <CustomText content={"Obecna Nazwa Użytkownika:"} style={styles.text} />
                  <CustomText content={username} style={styles.text2} />
                  <Input style={styles.input} placeholder="Nowa Nazwa Użytkownika" value={newValue} change={setNewValue} />
                  <Input style={styles.input} placeholder="Hasło" value={password} change={setPassword} type="password" />
                </View>
              </View>

              <View style={styles.bottomSectionWrap}>
                <CustomText content={errorText} style={styles.errorText} />
                <View style={styles.btnWrap}>
                  <TouchableOpacity style={styles.btn} onPress={() => props.navigation.goBack()}>
                    <CustomText content={"Anuluj"} style={styles.btnText} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, !(newValue && password) && styles.btnDisable]}
                    onPress={() => {
                      props.setIsDataNeedFetch(true);
                      updateApi(type);
                    }}
                  >
                    <CustomText content={"Zapisz"} style={styles.btnText} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        );
      }
      case "email": {
        return (
          <>
            <Header screen={"Zmień Email"} nav={() => props.navigation.goBack()} />

            <View style={styles.df}>
              <View style={styles.main}>
                <View>
                  <CustomText content={"Obecny Email:"} style={styles.text} />
                  {/* @ts-ignore */}
                  <CustomText content={data.email} style={styles.text2} />
                  <Input style={styles.input} placeholder="Nowy Email" value={newValue} change={setNewValue} type="email" />
                  <Input style={styles.input} placeholder="Hasło" value={password} change={setPassword} type="password" />
                </View>
              </View>

              <View style={styles.bottomSectionWrap}>
                <CustomText content={errorText} style={styles.errorText} />
                <View style={styles.btnWrap}>
                  <TouchableOpacity style={styles.btn} onPress={() => props.navigation.goBack()}>
                    <CustomText content={"Anuluj"} style={styles.btnText} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, !(newValue && password) && styles.btnDisable]}
                    onPress={() => {
                      if (RegExp(".@.").test(newValue)) {
                        props.setIsDataNeedFetch(true);
                        updateApi(type);
                      } else setErrorText("Niepoprawny Email");
                    }}
                  >
                    <CustomText content={"Zapisz"} style={styles.btnText} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        );
      }
      case "password": {
        return (
          <>
            <Header screen={"Zmień Hasło"} nav={() => props.navigation.goBack()} />
            <View style={styles.df}>
              <View style={styles.main}>
                <CustomText content={"Zmień Hasło:"} style={styles.text} />
                <Input style={styles.input} placeholder="Nowe Hasło" value={newValue} change={setNewValue} type="password" />
                <Input
                  style={styles.input}
                  placeholder="Potwierdź Nowe Hasło"
                  value={confirmValue}
                  change={setConfirmValue}
                  type="password"
                />
                <Input
                  style={styles.input}
                  placeholder="Obecne Hasło"
                  value={password}
                  change={setPassword}
                  type="password"
                />
              </View>

              <View style={styles.bottomSectionWrap}>
                <CustomText content={errorText} style={styles.errorText} />
                <View style={styles.btnWrap}>
                  <TouchableOpacity style={styles.btn} onPress={() => props.navigation.goBack()}>
                    <CustomText content={"Anuluj"} style={styles.btnText} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, !(newValue && password && confirmValue) && styles.btnDisable]}
                    onPress={() => {
                      if (confirmValue === newValue) {
                        props.setIsDataNeedFetch(true);
                        updateApi(type);
                      } else {
                        setErrorText("Hasła nie są takie same");
                        setNewValue("");
                        setConfirmValue("");
                      }
                    }}
                  >
                    <CustomText content={"Zapisz"} style={styles.btnText} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        );
      }
      default:
        props.navigation.goBack();
    }
  };

  return <View style={styles.wrap}>{main()}</View>;
};
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#1D1E1F",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    paddingBottom: 24,
  },
  text: {
    fontSize: 24,
    width: 320,
    marginTop: 16,
  },
  text2: {
    color: "#9A9A9A",
    width: 320,
    fontSize: 18,
  },
  input: {
    marginTop: 14,
  },
  df: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: height - 50 - 70,
  },
  btnWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 320,
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 48,
    backgroundColor: "#F28300",
    borderRadius: 25,
  },
  btnText: {
    color: "#0E0F10",
    fontSize: 24,
  },
  btnDisable: {
    backgroundColor: "rgba(242, 131, 0, 0.33)",
  },
  bottomSectionWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#f00",
    marginBottom: 16,
  },
});

const mapStateToProps = (data: any) => ({ data });
const mapDispatchToProps = { setIsDataNeedFetch, changeUsername };

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAccountDetailsScreen);
