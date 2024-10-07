import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";
import { IconProps } from "./icon";

export function IconUpload({
  width = 24,
  height = 24,
  color = "primary-50",
  ...rest
}: IconProps) {
  const { Colors } = useAppTheme();

  return (
    <Svg width="58" height="50" viewBox="0 0 58 50" fill="none" {...rest}>
      <Path
        d="M30.3549 12.2954L30.4474 12.323L30.4522 12.3176C30.824 12.3776 31.1896 12.1531 31.2989 11.7842C32.2707 8.51882 35.3325 6.2375 38.7437 6.2375C39.1627 6.2375 39.5026 5.89762 39.5026 5.47857C39.5026 5.0595 39.1627 4.71963 38.7437 4.71963C34.5262 4.71963 30.9822 7.52763 29.8443 11.3516C29.7245 11.7534 29.9534 12.1756 30.3549 12.2954Z"
        fill={Colors[color]}
        stroke={Colors[color]}
        stroke-width="0.3"
      />
      <Path
        d="M47.2682 35.3163H43.6147C43.2785 35.3163 43.0057 35.0436 43.0057 34.7074C43.0057 34.3712 43.2785 34.0984 43.6147 34.0984H47.2682C52.3045 34.0984 56.4022 30.0008 56.4022 24.9645C56.4022 19.9283 52.3045 15.8306 47.2682 15.8306H47.1804C47.0038 15.8306 46.8359 15.754 46.7202 15.6205C46.6045 15.487 46.5523 15.3099 46.5775 15.1351C46.6319 14.7558 46.6593 14.3748 46.6593 14.0038C46.6593 9.63907 43.1079 6.08764 38.7432 6.08764C37.0451 6.08764 35.4258 6.61828 34.06 7.62257C33.7599 7.84309 33.3336 7.74523 33.1601 7.41509C29.2921 0.0496804 19.1893 -0.93942 13.9515 5.46785C11.7451 8.16713 10.8781 11.6785 11.5728 15.1007C11.6494 15.4787 11.3601 15.831 10.9761 15.831H10.7321C5.69581 15.831 1.59811 19.9287 1.59811 24.965C1.59811 30.0012 5.69581 34.0989 10.7321 34.0989H14.3856C14.7218 34.0989 14.9945 34.3716 14.9945 34.7079C14.9945 35.0441 14.7218 35.3168 14.3856 35.3168H10.7321C5.02416 35.3168 0.380188 30.6728 0.380188 24.9649C0.380188 19.4172 4.76706 14.8745 10.254 14.624C9.73862 11.0734 10.7242 7.49206 13.0086 4.69712C18.6163 -2.16333 29.3633 -1.39436 33.9062 6.25554C35.3555 5.34693 37.014 4.87027 38.743 4.87027C44.0311 4.87027 48.2214 9.37116 47.8547 14.6297C53.2912 14.9346 57.6198 19.4532 57.6198 24.9645C57.6198 30.6728 52.9758 35.3163 47.2679 35.3163L47.2682 35.3163Z"
        fill={Colors[color]}
      />
      <Path
        d="M13.545 34.3636C13.545 42.8407 20.4415 49.737 28.9185 49.737C37.3956 49.737 44.2919 42.8406 44.2919 34.3636C44.2919 25.8865 37.3956 18.9901 28.9185 18.9901C20.4414 18.9901 13.545 25.8866 13.545 34.3636ZM15.0632 34.3636C15.0632 26.724 21.2788 20.5083 28.9185 20.5083C36.558 20.5083 42.7738 26.7239 42.7738 34.3636C42.7738 42.0031 36.558 48.2189 28.9185 48.2189C21.2789 48.2189 15.0632 42.0032 15.0632 34.3636Z"
        fill={Colors[color]}
        stroke={Colors[color]}
        stroke-width="0.3"
      />
      <Path
        d="M28.601 40.4919C28.601 40.8209 28.8678 41.0877 29.1968 41.0877C29.5257 41.0877 29.7926 40.8213 29.7926 40.4919V28.9009C29.7926 28.5719 29.5258 28.3051 29.1968 28.3051C28.8678 28.3051 28.601 28.5719 28.601 28.9009V40.4919Z"
        fill={Colors[color]}
        stroke={Colors[color]}
        stroke-width="0.3"
      />
      <Path
        d="M33.0784 32.7836L33.1846 32.8895C33.0682 33.0063 32.9151 33.0642 32.7632 33.0642L33.0784 32.7836ZM33.0784 32.7836C32.9915 32.8708 32.8772 32.9142 32.7632 32.9142L33.0784 32.7836ZM29.1967 29.7445L32.3419 32.8897C32.458 33.0059 32.611 33.0642 32.7631 33.0642L29.1967 29.7445ZM29.1967 29.7445L26.0517 32.8896L29.1967 29.7445ZM25.209 32.8897C25.4417 33.1223 25.8191 33.1225 26.0516 32.8897L28.7754 28.4807C28.7753 28.4807 28.7753 28.4807 28.7753 28.4807L25.209 32.047C24.9762 32.2798 24.9762 32.6569 25.209 32.8897Z"
        fill={Colors[color]}
        stroke={Colors[color]}
        stroke-width="0.3"
      />
    </Svg>
  );
}
