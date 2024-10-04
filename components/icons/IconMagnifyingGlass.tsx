import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon";

export function IconMagnifyingGlass({
  width = 24,
  height = 24,
  color = "primary-50",
  ...rest
}: IconProps) {
  const { Colors } = useAppTheme();

  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.5306 20.4696L16.8366 15.7765C18.1971 14.1431 18.8755 12.048 18.7307 9.92715C18.5859 7.80629 17.629 5.82289 16.0591 4.38956C14.4892 2.95623 12.4272 2.18333 10.3019 2.23163C8.17666 2.27993 6.15184 3.14571 4.64867 4.64888C3.1455 6.15205 2.27971 8.17687 2.23141 10.3021C2.18311 12.4274 2.95602 14.4894 4.38935 16.0593C5.82268 17.6293 7.80607 18.5861 9.92694 18.7309C12.0478 18.8757 14.1429 18.1973 15.7763 16.8368L20.4694 21.5308C20.5391 21.6005 20.6218 21.6558 20.7128 21.6935C20.8039 21.7312 20.9015 21.7506 21 21.7506C21.0985 21.7506 21.1961 21.7312 21.2872 21.6935C21.3782 21.6558 21.4609 21.6005 21.5306 21.5308C21.6003 21.4612 21.6556 21.3784 21.6933 21.2874C21.731 21.1963 21.7504 21.0988 21.7504 21.0002C21.7504 20.9017 21.731 20.8041 21.6933 20.713C21.6556 20.622 21.6003 20.5393 21.5306 20.4696ZM3.75 10.5002C3.75 9.16519 4.14588 7.86015 4.88758 6.75011C5.62928 5.64008 6.68349 4.77492 7.91689 4.26403C9.15029 3.75314 10.5075 3.61946 11.8169 3.87991C13.1262 4.14036 14.329 4.78324 15.273 5.72724C16.217 6.67125 16.8599 7.87398 17.1203 9.18335C17.3808 10.4927 17.2471 11.8499 16.7362 13.0833C16.2253 14.3167 15.3601 15.3709 14.2501 16.1126C13.1401 16.8543 11.835 17.2502 10.5 17.2502C8.7104 17.2482 6.99466 16.5364 5.72922 15.271C4.46378 14.0056 3.75199 12.2898 3.75 10.5002Z"
        fill={Colors[color]}
        fill-opacity="1"
      />
    </Svg>
  );
}