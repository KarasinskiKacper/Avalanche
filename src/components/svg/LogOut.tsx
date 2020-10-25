import * as React from "react";
import Svg, { Path } from "react-native-svg";

const LogOut = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M7.144.152V8.58H8.61V1.618h13.924v20.765H8.61V15.42H7.144v8.428H24V.152H7.144z" fill="#E7EBEF" />
      <Path
        d="M15.572 12.733v-1.466H2.806l1.68-1.68L3.45 8.55 0 12l3.45 3.45 1.036-1.037-1.68-1.68h12.766z"
        fill="#E7EBEF"
      />
    </Svg>
  );
};

export default LogOut;
