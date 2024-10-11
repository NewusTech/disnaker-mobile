import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";
import { IconProps } from "./icon";

export function IconHourglass({
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
      viewBox="0 0 20 19"
      fill="none"
      {...rest}
    >
      <Path
        d="M14.1562 1.92969H5.84375C5.56817 1.92969 5.30388 2.03916 5.10902 2.23402C4.91416 2.42888 4.80469 2.69317 4.80469 2.96875V5.64062C4.80503 5.80187 4.84274 5.96085 4.91485 6.10507C4.98696 6.2493 5.09152 6.37485 5.22031 6.47187L9.25781 9.5L5.22031 12.5281C5.09152 12.6251 4.98696 12.7507 4.91485 12.8949C4.84274 13.0392 4.80503 13.1981 4.80469 13.3594V16.0312C4.80469 16.3068 4.91416 16.5711 5.10902 16.766C5.30388 16.9608 5.56817 17.0703 5.84375 17.0703H14.1562C14.4318 17.0703 14.6961 16.9608 14.891 16.766C15.0858 16.5711 15.1953 16.3068 15.1953 16.0312V13.3861C15.1949 13.2255 15.1574 13.0672 15.0858 12.9234C15.0143 12.7796 14.9105 12.6543 14.7827 12.5571L10.7422 9.5L14.7864 6.44293C14.9135 6.34536 15.0166 6.21985 15.0875 6.0761C15.1584 5.93234 15.1953 5.7742 15.1953 5.61391V2.96875C15.1953 2.69317 15.0858 2.42888 14.891 2.23402C14.6961 2.03916 14.4318 1.92969 14.1562 1.92969ZM5.84375 2.82031H14.1562C14.1956 2.82031 14.2334 2.83595 14.2612 2.86379C14.289 2.89163 14.3047 2.92938 14.3047 2.96875V4.30469H5.69531V2.96875C5.69531 2.92938 5.71095 2.89163 5.73879 2.86379C5.76663 2.83595 5.80438 2.82031 5.84375 2.82031ZM14.3047 13.3861V16.0312C14.3047 16.0706 14.289 16.1084 14.2612 16.1362C14.2334 16.164 14.1956 16.1797 14.1562 16.1797H5.84375C5.80438 16.1797 5.76663 16.164 5.73879 16.1362C5.71095 16.1084 5.69531 16.0706 5.69531 16.0312V13.3594C5.69531 13.3363 5.70068 13.3136 5.71098 13.293C5.72129 13.2724 5.73625 13.2545 5.75469 13.2406L10 10.0574L14.2468 13.2673C14.265 13.2813 14.2796 13.2993 14.2897 13.3199C14.2997 13.3405 14.3049 13.3632 14.3047 13.3861ZM14.2461 5.73266L10 8.94262L5.75469 5.75937C5.73625 5.74555 5.72129 5.72762 5.71098 5.70701C5.70068 5.6864 5.69531 5.66367 5.69531 5.64062V5.19531H14.3047V5.61391C14.3048 5.63689 14.2995 5.65958 14.2893 5.68018C14.2792 5.70079 14.2644 5.71875 14.2461 5.73266Z"
        fill={Colors[color]}
      />
    </Svg>
  );
}
