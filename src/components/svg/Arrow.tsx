import * as React from "react"
import { StyleSheet } from "react-native"
import { round } from "react-native-reanimated"
import Svg, { Path } from "react-native-svg"


const Arrow = (props: any) => {
  return (
    <Svg style={props.type === 'option' ? styles.optionArrow : styles.svg} viewBox="0 0 24 20" fill="none">
      <Path
        d="M8.753.47a1.596 1.596 0 012.262 0c.314.314.47.72.47 1.132 0 .411-.156.818-.47 1.131l-5.554 5.55h16.937a1.602 1.602 0 010 3.203H5.461l5.554 5.55a1.596 1.596 0 010 2.262 1.596 1.596 0 01-2.262 0L.47 11.016A1.581 1.581 0 010 9.883c0-.426.167-.833.47-1.131L8.753.47z"
        fill={props.type === 'option' ? '#E7EBEF' : "#F28300"}
      />
    </Svg>
  )
}

const styles = StyleSheet.create({
  svg: {
    width: 24,
    height: 20,
    marginRight: 20
  },
  optionArrow: {
    width: 24,
    height: 20,
    transform: [{ rotate: '180deg' }]
  }
})

export default Arrow
