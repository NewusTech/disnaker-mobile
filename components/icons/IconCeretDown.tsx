import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon";

export function IconCaretDown({
  width = 24,
  height = 24,
  color = "primary-50",
  ...rest
}: IconProps) {
  const { Colors } = useAppTheme();

  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.946 8.94597L12.446 16.446C12.3405 16.5513 12.1975 16.6105 12.0485 16.6105C11.8994 16.6105 11.7564 16.5513 11.651 16.446L4.15097 8.94597C4.05161 8.83934 3.99752 8.6983 4.00009 8.55258C4.00266 8.40685 4.06169 8.26781 4.16475 8.16475C4.26781 8.06169 4.40685 8.00266 4.55258 8.00009C4.6983 7.99752 4.83934 8.05161 4.94597 8.15097L12.0485 15.2525L19.151 8.15097C19.2576 8.05161 19.3986 7.99752 19.5444 8.00009C19.6901 8.00266 19.8291 8.06169 19.9322 8.16475C20.0352 8.26781 20.0943 8.40685 20.0969 8.55258C20.0994 8.6983 20.0453 8.83934 19.946 8.94597Z"
        fill={Colors[color]}
      />
    </Svg>
  );
}
