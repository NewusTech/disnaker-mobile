import { useAppTheme } from "@/context/theme-context";
import View, { ViewProps } from "../../view";


export type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
  thickness?: number;
  width?: any;
} & ViewProps;
export default function Separator(props: SeparatorProps) {
  const {
    orientation = "horizontal",
    thickness = 1,
    style,
    width = "100%",
  } = props;

  const { Colors } = useAppTheme();

  return (
    <View
      style={[
        {
          width: orientation === "horizontal" ? width : thickness,
          height: orientation === "horizontal" ? thickness : width,
          backgroundColor: Colors["line-stroke-30"],
        },
        style,
      ]}
    >
    </View>
  );
}
