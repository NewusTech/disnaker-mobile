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
    <Svg
      width={width}
      height={height}
      viewBox="0 0 28 29"
      fill="none"
      {...rest}
    >
      <Path
        d="M23.38 8.45663L16.66 3.75497C14.8283 2.47163 12.0167 2.54163 10.255 3.90663L4.41 8.4683C3.24334 9.3783 2.32167 11.245 2.32167 12.715V20.765C2.32167 23.74 4.73667 26.1666 7.71167 26.1666H20.2883C23.2633 26.1666 25.6783 23.7516 25.6783 20.7766V12.8666C25.6783 11.2916 24.6633 9.35497 23.38 8.45663ZM14.875 21.5C14.875 21.9783 14.4783 22.375 14 22.375C13.5217 22.375 13.125 21.9783 13.125 21.5V18C13.125 17.5216 13.5217 17.125 14 17.125C14.4783 17.125 14.875 17.5216 14.875 18V21.5Z"
        fill={Colors[color]}
      />
    </Svg>
  );
}
