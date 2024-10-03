import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon";

export function IconUser({
  width = 24,
  height = 24,
  color = "primary-50",
  ...rest
}: IconProps) {
  const { Colors } = useAppTheme();

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
    >
      <Path
        d="M13.9998 14C17.2215 14 19.8332 11.3883 19.8332 8.16668C19.8332 4.94502 17.2215 2.33334 13.9998 2.33334C10.7782 2.33334 8.1665 4.94502 8.1665 8.16668C8.1665 11.3883 10.7782 14 13.9998 14Z"
        fill={Colors[color]}
      />
      <Path
        d="M14 16.9167C8.15502 16.9167 3.39502 20.8367 3.39502 25.6667C3.39502 25.9933 3.65169 26.25 3.97835 26.25H24.0217C24.3484 26.25 24.605 25.9933 24.605 25.6667C24.605 20.8367 19.845 16.9167 14 16.9167Z"
        fill={Colors[color]}
      />
    </Svg>
  );
}
