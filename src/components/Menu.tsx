import React, { useState } from "react"
import { View, StyleSheet, Text, Dimensions } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import ThreeDots from "./svg/ThreeDots"
import ProfileIcon from "./svg/ProfileIcon"
import Dumbbell from "./svg/Dumbbell"
import CustomText from './CustomText'

const width = Dimensions.get("screen").width

const Menu = (props: any) => {
  const [active, setActive] = useState(1)
  return (
    <View style={styles.menu}>
      <View style={styles.wrap}>
        <TouchableOpacity onPress={() => {
          props.setPanel(1)
          setActive(1)
        }} style={[styles.button, { borderBottomWidth: 2, borderBottomColor: active === 1 ? "#F28300" : "transparent" }]}>
          <Dumbbell isActive={active === 1 ? true : false} />
          <CustomText content={"Aktywności"} style={[styles.text, { color: active === 1 ? "#F28300" : "#E7EBEF" }]}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          props.setPanel(2)
          setActive(2)
        }} style={[styles.button, { borderBottomWidth: 2, borderBottomColor: active === 2 ? "#F28300" : "transparent" }]}>
          <ProfileIcon isActive={active === 2 ? true : false} />
          <CustomText content={"Profil"} style={[styles.text, { color: active === 2 ? "#F28300" : "#E7EBEF" }]}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          props.setPanel(3)
          setActive(3)
        }} style={[styles.button, { borderBottomWidth: 2, borderBottomColor: active === 3 ? "#F28300" : "transparent" }]}>
          <ThreeDots isActive={active === 3 ? true : false} />
          <CustomText content={"Więcej"} style={[styles.text, { color: active === 3 ? "#F28300" : "#E7EBEF" }]}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    height: 70,
    backgroundColor: "#0E0F10",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    bottom: 0,
    width: width,
  },
  wrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto"
  },
  button: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: 120,
    height: 70
  },
  text: {
    color: "#F28300",
    fontSize: 16,
    textAlign: "center",
    height: 24
  },

})

export default Menu
