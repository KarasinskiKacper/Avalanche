import React from "react"
import { Text } from "react-native"

//@ts-ignore
const CustomText = (props: any) => {
  
  return (
  <Text style={[{
   fontFamily: "Lato",
   color: "#E7EBEF",
  }, props.style]}>
     {props.content}
   </Text>
  )
}

export default CustomText;
