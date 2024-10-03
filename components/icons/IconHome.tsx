import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon";

export function IconHome({
  width = 24,
  height = 24,
  color = "primary-50",
  ...rest
}: IconProps) {
  const { Colors } = useAppTheme();

  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.0583 5.6207L14.3383 0.91903C12.5067 -0.364303 9.695 -0.294303 7.93333 1.0707L2.08833 5.63236C0.921667 6.54236 0 8.40903 0 9.87903V17.929C0 20.904 2.415 23.3307 5.39 23.3307H17.9667C20.9417 23.3307 23.3567 20.9157 23.3567 17.9407V10.0307C23.3567 8.4557 22.3417 6.51903 21.0583 5.6207ZM12.5533 18.664C12.5533 19.1424 12.1567 19.539 11.6783 19.539C11.2 19.539 10.8033 19.1424 10.8033 18.664V15.164C10.8033 14.6857 11.2 14.289 11.6783 14.289C12.1567 14.289 12.5533 14.6857 12.5533 15.164V18.664Z"
        fill={Colors[color]}
      />
    </Svg>
  );
}
