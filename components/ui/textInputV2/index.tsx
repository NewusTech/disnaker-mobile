import { ReactNode } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
} from "react-native";

import { useAppTheme } from "@/context/theme-context";
import View from "@/components/view";
import { Typography } from "../typography";


export type TextInputV2Props = {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  withBorder?: boolean;
  asTouchable?: boolean;
  leadingString?: string;
  onTouchablePress?: () => void;
} & TextInputProps;
export function TextInputV2(props: TextInputV2Props) {
  const {
    leadingIcon,
    trailingIcon,
    withBorder = true,
    asTouchable = false,
    value,
    placeholder,
    numberOfLines,
    leadingString,
    onTouchablePress,
    ...rest
  } = props;

  const { Colors } = useAppTheme();

  return (
    <TouchableWithoutFeedback
      onPress={onTouchablePress}
      disabled={!asTouchable}
    >
      <View style={{ flexDirection: "row", gap: 14 }}>
        {!!leadingString && (
          <View
            backgroundColor="primary-50"
            style={
              (styles.container,
              {
                flex: 0,
                height: "100%",
                borderWidth: withBorder ? 1 : 0,
                borderColor: Colors["line-stroke-30"],
                paddingVertical: 14,
                paddingHorizontal: 12,
                borderRadius: 2,
              })
            }
          >
            <Typography fontFamily="OpenSans-Semibold" color="white">
              {leadingString}
            </Typography>
          </View>
        )}
        <View
          style={[
            styles.container,
            {
              borderWidth: withBorder ? 1 : 0,
              borderColor: Colors["line-stroke-30"],
            },
          ]}
        >
          {leadingIcon}

          {asTouchable ? (
            <Typography color={value ? "black-80" : "black-50"}>
              {value || placeholder}
            </Typography>
          ) : (
            <TextInput
              placeholderTextColor={Colors["black-50"]}
              style={[
                styles.textInput,
                {
                  color: Colors["black-80"],
                  padding: withBorder ? 8 : 0,
                  textAlignVertical:
                    !!numberOfLines && numberOfLines > 1 ? "top" : "auto",
                },
              ]}
              editable={!asTouchable}
              placeholder={placeholder}
              value={value}
              numberOfLines={numberOfLines}
              {...rest}
            />
          )}

          {trailingIcon}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    flex: 1,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
  },
  textInput: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    flex: 1,
  },
});
