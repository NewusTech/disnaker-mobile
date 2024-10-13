import { ReactNode, useState } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

import { useAppTheme } from "@/context/theme-context";

import { IconMagnifyingGlass } from "../../icons";
import View from "../../view";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";

export type SearchBoxProps = {
  trailingIcon?: ReactNode;
  width?: number | any;
} & TextInputProps;
export function SearchBox(props: SearchBoxProps) {
  const { trailingIcon, width, ...rest } = props;

  const { Colors } = useAppTheme();
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <View
      backgroundColor="white"
      style={[
        style.container,
        {
          borderColor: focused
            ? Colors["primary-50"]
            : Colors["line-stroke-30"],
          width: width,
          overflow: "hidden",
        },
      ]}
    >
      {!focused && (
        <Animated.View entering={SlideInLeft}>
          <IconMagnifyingGlass
            width={24}
            height={24}
            color={focused ? "primary-50" : "line-stroke-30"}
          />
        </Animated.View>
      )}
      <TextInput
        selectionColor={Colors["primary-50"]}
        style={{ flex: 1, color: Colors["primary-50"] }}
        placeholderTextColor={Colors["line-stroke-30"]}
        {...rest}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        keyboardType="web-search"
        returnKeyType="search" // Mengubah tombol keyboard menjadi "Search"
      />
      {trailingIcon}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: 45,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 12,
    borderWidth: 1,
  },
  textInput: {
    fontSize: 14,
    fontFamily: "OpenSans-Regular",
  },
});
