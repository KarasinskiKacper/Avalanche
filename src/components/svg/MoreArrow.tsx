import * as React from "react"
import Svg, { Path } from "react-native-svg"

const MoreArrow = () => {
  return (
    <Svg width={24} height={20} viewBox="0 0 24 20" fill="none">
      <Path
        d="M15.247 19.414a1.596 1.596 0 01-2.262 0 1.59 1.59 0 01-.47-1.132c0-.411.156-.818.47-1.131l5.554-5.55H1.602a1.602 1.602 0 010-3.203h16.937l-5.555-5.55a1.596 1.596 0 010-2.262 1.596 1.596 0 012.263 0l8.283 8.282c.303.3.47.706.47 1.132 0 .426-.166.832-.47 1.131l-8.283 8.283z"
        fill="#E7EBEF"
      />
    </Svg>
  )
}

export default MoreArrow
