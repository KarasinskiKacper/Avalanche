import React from "react"
import Svg, { Path } from "react-native-svg"

const ThreeDots = (props: any) => {
  return (
    <Svg width={40} height={45} viewBox="0 0 40 10" fill="none">
      <Path
        d="M4.951.05A4.948 4.948 0 000 5a4.947 4.947 0 004.951 4.95A4.947 4.947 0 009.901 5 4.949 4.949 0 004.95.05zm15.305 0a4.95 4.95 0 00-4.951 4.948 4.951 4.951 0 004.951 4.95 4.95 4.95 0 004.954-4.95A4.954 4.954 0 0020.256.05zm14.796 0a4.95 4.95 0 10-.006 9.9 4.95 4.95 0 00.006-9.9z"
        fill={props.isActive ? "#F28300" : "#E7EBEF"}
      />
    </Svg>
  )
}

export default ThreeDots
