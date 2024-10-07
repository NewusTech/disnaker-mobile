import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon";

export function IconChecklist({
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
      {...rest}
    >
      <Path
        d="M12.3667 18.9L20.5917 10.675L18.9583 9.04167L12.3667 15.6333L9.04167 12.3083L7.40833 13.9417L12.3667 18.9ZM5.83333 24.5C5.19167 24.5 4.64256 24.2717 4.186 23.8152C3.72944 23.3586 3.50078 22.8091 3.5 22.1667V5.83333C3.5 5.19167 3.72867 4.64256 4.186 4.186C4.64333 3.72944 5.19244 3.50078 5.83333 3.5H22.1667C22.8083 3.5 23.3578 3.72867 23.8152 4.186C24.2725 4.64333 24.5008 5.19244 24.5 5.83333V22.1667C24.5 22.8083 24.2717 23.3578 23.8152 23.8152C23.3586 24.2725 22.8091 24.5008 22.1667 24.5H5.83333Z"
        fill={Colors[color]}
      />
    </Svg>
  );
}
