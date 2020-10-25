import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const Dumbbell = (props: any) => {
  return (
    <Svg width={40} height={45} viewBox="0 0 40 40" fill="none">
      <G clipPath="url(#prefix__clip0)" fill={props.isActive ? "#F28300" : "#E7EBEF" }>
        <Path d="M6.242 25.07l-4.728 4.728 8.688 8.688 4.727-4.728-8.687-8.687zM22.51 15.256l-7.254 7.254-5.438-5.44L5.09 21.8 18.2 34.91l4.728-4.727-5.439-5.44 7.254-7.253 5.438 5.44L34.91 18.2 21.8 5.09 17.07 9.818l5.439 5.438zM29.798 1.514l-4.727 4.728 8.687 8.687 4.728-4.727-8.688-8.688z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h40v40H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Dumbbell