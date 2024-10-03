import { AppColorUnion } from "@/constants/Colors";
import { useAppTheme } from "@/context/theme-context";
import { ActivityIndicator } from "react-native";

export type LoaderProp = {
  color?: AppColorUnion;
  size?: number;
};

export default function Loader(props: LoaderProp) {
  const { size = 44, color = "primary-50" } = props;

  const { Colors } = useAppTheme();

  return (
    <ActivityIndicator color={Colors[color]} size={size} />
  );
}
