import { ReactNode, useState } from "react";
import { Image, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import { useAppTheme } from "@/context/theme-context";
import View from "../view";
import { Typography } from "../ui/typography";
import { AppColorUnion } from "@/constants/Colors";
import TextInput from "../ui/textInput";
import { IconMagnifyingGlass } from "../icons";

export type DataItem = {
  title: string | number;
  image?: string;
};
export type SelectInputProps = {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  withBorder?: boolean;
  borderRadius?: number;
  gap?: number;
  padding?: number;
  paddingHorizontal?: number;
  data: DataItem[];
  onSelect: (selectedItem: DataItem, index: number) => void;
  value: string | number;
  placeholder?: string;
  suffix?: string;
  label?: string;
  disabled?: boolean;
  color?: AppColorUnion;
};
export function SelectInput(props: SelectInputProps) {
  const {
    leadingIcon,
    trailingIcon,
    value,
    withBorder = true,
    borderRadius = 10,
    gap = 12,
    padding = 8,
    paddingHorizontal = padding,
    data = [],
    onSelect = () => {},
    placeholder = "",
    suffix = "",
    label,
    disabled = false,
    color = "line-stroke-30",
  } = props;

  const { Colors } = useAppTheme();

  return (
    <SelectDropdown
      disabled={disabled}
      data={data}
      onSelect={onSelect}
      renderButton={(selected, isOpened) => (
        <View style={{ gap: 5 }}>
          {label && (
            <Typography fontFamily="Poppins-Medium" fontSize={14}>
              {label}
            </Typography>
          )}
          <View
            // backgroundColor={selected ? "line-stroke-30" : "white"}
            style={[
              styles.container,
              {
                borderWidth: withBorder ? 1 : 0,
                borderColor: isOpened ? Colors["primary-50"] : Colors[color],
                padding: withBorder ? padding : 0,
                paddingHorizontal,
                borderRadius,
                gap,
                backgroundColor: disabled
                  ? Colors["line-stroke-30"]
                  : "transparent",
              },
            ]}
          >
            {leadingIcon}
            <Typography
              fontSize={14}
              color={value ? "black" : "black-50"}
              style={styles.textInput}
            >
              {value || placeholder} {" " + suffix}
            </Typography>

            {trailingIcon}
          </View>
        </View>
      )}
      search
      searchInputStyle={{
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: "#FFFFFF",
      }}
      searchInputTxtColor={"#151E26"}
      searchPlaceHolder={"Search here"}
      searchPlaceHolderColor={"#72808D"}
      renderSearchInputLeftIcon={() => {
        return <IconMagnifyingGlass />;
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={[
              styles.dropdownItemStyle,
              {
                ...(isSelected && { backgroundColor: Colors["primary-50"] }),
              },
            ]}
          >
            {item.image && (
              <Image style={{ width: 18, height: 18 }} source={item.image} />
            )}
            <Typography color={isSelected ? "white" : "black-80"}>
              {item.title} {suffix}
            </Typography>
          </View>
        );
      }}
      dropdownStyle={{
        backgroundColor: Colors.white,
        transform: [{ translateY: -20 }],
      }}
      dropdownOverlayColor="transparent"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
  },
  dropdownItemStyle: {
    padding: 8,
    borderRadius: 0,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  searchInput: {
    height: 40,
  },
});
