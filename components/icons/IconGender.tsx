import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";
import { IconProps } from "./icon";

export function IconGender({
  width = 24,
  height = 24,
  color = "primary-50",
  ...rest
}: IconProps) {
  const { Colors } = useAppTheme();

  return (
    <Svg width={width} height={height} viewBox="0 0 256 256">
      <Path
        fill={Colors[color]}
        d="M208 96a80 80 0 1 0-88 79.6V200H88a8 8 0 0 0 0 16h32v24a8 8 0 0 0 16 0v-24h32a8 8 0 0 0 0-16h-32v-24.4A80.11 80.11 0 0 0 208 96M64 96a64 64 0 1 1 64 64a64.07 64.07 0 0 1-64-64"
      />
    </Svg>
  );
}
