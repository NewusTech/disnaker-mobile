import * as React from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon";

export function IconDotInActive({
  width = 24,
  height = 24,
  color = "primary-50",
  ...rest
}: IconProps) {
  const { Colors } = useAppTheme();

  return (
    <Svg width={width} height={height} viewBox="0 0 25 24" fill="none">
      <Rect
        x="1"
        y="0.5"
        width="23"
        height="23"
        rx="11.5"
        stroke={Colors["transparent"]}
      />
      <Circle cx="12.5" cy="12" r="6.5" fill={Colors[color]} stroke={Colors["transparent"]} />
    </Svg>
  );
}
