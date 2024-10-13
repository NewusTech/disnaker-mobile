import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon";

export function IconInfo({
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
      viewBox="0 0 20 20"
      fill="none"
      {...rest}
    >
      <Path
        d="M11.0938 13.75C11.0938 13.8743 11.0444 13.9935 10.9565 14.0815C10.8686 14.1694 10.7493 14.2188 10.625 14.2188C10.3349 14.2188 10.0567 14.1035 9.85161 13.8984C9.64649 13.6933 9.53125 13.4151 9.53125 13.125V10C9.53125 9.95856 9.51479 9.91882 9.48549 9.88951C9.45619 9.86021 9.41644 9.84375 9.375 9.84375C9.25068 9.84375 9.13146 9.79436 9.04355 9.70646C8.95564 9.61855 8.90625 9.49932 8.90625 9.375C8.90625 9.25068 8.95564 9.13145 9.04355 9.04354C9.13146 8.95564 9.25068 8.90625 9.375 8.90625C9.66508 8.90625 9.94328 9.02148 10.1484 9.2266C10.3535 9.43172 10.4688 9.70992 10.4688 10V13.125C10.4688 13.1664 10.4852 13.2062 10.5145 13.2355C10.5438 13.2648 10.5836 13.2812 10.625 13.2812C10.7493 13.2812 10.8686 13.3306 10.9565 13.4185C11.0444 13.5065 11.0938 13.6257 11.0938 13.75ZM9.6875 7.34375C9.84202 7.34375 9.99307 7.29793 10.1215 7.21209C10.25 7.12624 10.3502 7.00423 10.4093 6.86147C10.4684 6.71872 10.4839 6.56163 10.4537 6.41009C10.4236 6.25854 10.3492 6.11933 10.2399 6.01007C10.1307 5.90081 9.99147 5.82641 9.83992 5.79626C9.68837 5.76612 9.53129 5.78159 9.38853 5.84072C9.24578 5.89985 9.12376 5.99998 9.03792 6.12846C8.95207 6.25694 8.90625 6.40798 8.90625 6.5625C8.90625 6.7697 8.98856 6.96841 9.13508 7.11493C9.28159 7.26144 9.4803 7.34375 9.6875 7.34375ZM17.9688 10C17.9688 11.5761 17.5014 13.1167 16.6258 14.4272C15.7502 15.7377 14.5056 16.759 13.0495 17.3622C11.5934 17.9653 9.99116 18.1231 8.44538 17.8156C6.89959 17.5082 5.4797 16.7492 4.36525 15.6348C3.2508 14.5203 2.49185 13.1004 2.18437 11.5546C1.87689 10.0088 2.0347 8.40659 2.63784 6.95049C3.24097 5.49439 4.26235 4.24984 5.5728 3.37423C6.88326 2.49861 8.42393 2.03125 10 2.03125C12.1127 2.03373 14.1381 2.87409 15.632 4.36798C17.1259 5.86188 17.9663 7.88732 17.9688 10ZM17.0313 10C17.0313 8.60935 16.6189 7.24993 15.8463 6.09365C15.0737 4.93736 13.9755 4.03615 12.6907 3.50397C11.406 2.97179 9.9922 2.83255 8.62827 3.10385C7.26435 3.37516 6.0115 4.04482 5.02816 5.02816C4.04482 6.01149 3.37516 7.26434 3.10386 8.62827C2.83255 9.9922 2.9718 11.406 3.50398 12.6907C4.03615 13.9755 4.93737 15.0737 6.09365 15.8463C7.24993 16.6189 8.60935 17.0312 10 17.0312C11.8642 17.0292 13.6514 16.2877 14.9696 14.9696C16.2877 13.6514 17.0292 11.8642 17.0313 10Z"
        fill={Colors[color]}
      />
    </Svg>
  );
}
