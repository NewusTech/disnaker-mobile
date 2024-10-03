import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon";

export function IconCaretLeft({
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
      viewBox="0 0 30 30"
      fill="none"
    >
      <Path
        d="M8.93227 15.64L17.9783 24.6861C18.0624 24.7701 18.1621 24.8368 18.272 24.8823C18.3818 24.9277 18.4995 24.9512 18.6183 24.9512C18.7372 24.9512 18.8549 24.9277 18.9647 24.8823C19.0745 24.8368 19.1743 24.7701 19.2583 24.6861C19.3424 24.602 19.4091 24.5022 19.4545 24.3924C19.5 24.2826 19.5234 24.1649 19.5234 24.046C19.5234 23.9272 19.5 23.8095 19.4545 23.6997C19.4091 23.5899 19.3424 23.4901 19.2583 23.406L10.8512 15L19.2583 6.59394C19.4281 6.4242 19.5234 6.19399 19.5234 5.95394C19.5234 5.71389 19.4281 5.48367 19.2583 5.31393C19.0886 5.14419 18.8584 5.04883 18.6183 5.04883C18.3783 5.04883 18.1481 5.14419 17.9783 5.31393L8.93227 14.36C8.84816 14.444 8.78144 14.5438 8.73591 14.6536C8.69039 14.7634 8.66696 14.8811 8.66696 15C8.66696 15.1189 8.69039 15.2366 8.73591 15.3464C8.78144 15.4562 8.84816 15.556 8.93227 15.64Z"
        fill={Colors[color]}
      />
    </Svg>
  );
}
