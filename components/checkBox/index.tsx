import { StyleSheet } from "react-native";

import { useAppTheme } from "@/context/theme-context";

import View from "../view";
import { IconChecklist } from "../icons/IconChecklist";

export type CheckboxProps = {
  selected?: boolean;
  width?: number;
  height?: number;
};
export function Checkbox(props: CheckboxProps) {
  const { selected = false, width = 16, height = 16 } = props;

  const { Colors } = useAppTheme();

  return (
    <View
      // backgroundColor={selected ? "success-50" : "white"}
      style={[
        styles.container,
        {
          borderColor: Colors["line-stroke-30"],
          borderRadius: 100,
          width,
          height,
        },
      ]}
    >
      <IconChecklist size={8} color={selected ? "primary-50" : "line-stroke-30"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
