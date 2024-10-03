import { ReactNode, useState } from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TouchableWithoutFeedback,
} from "react-native";

import { useAppTheme } from "@/context/theme-context";

import View from "../view";
import { Typography } from "../typography";
import { IconEye } from "../icons";

export type TextInputProps = {
  label: string;
  trailingIcon?: ReactNode;
  errorMessage?: string;
  borderRadius?: number;
  textAlignVertical?: "top" | "center";
} & RNTextInputProps;
export default function TextInput(props: TextInputProps) {
  const {
    label = "",
    editable = true,
    style,
    errorMessage = "",
    secureTextEntry = false,
    trailingIcon,
    borderRadius = 100,
    textAlignVertical = "center",
    ...rest
  } = props;

  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  const { Colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Typography fontFamily="Poppins-Medium" fontSize={14}>
        {label}
      </Typography>
      <View
        backgroundColor={editable ? "transparent" : "line-stroke-50"}
        style={[
          styles.inputWrapper,
          { borderColor: Colors["line-stroke-30"], borderRadius },
        ]}
      >
        <View style={{ flex: 1 }}>
          <RNTextInput
            placeholderTextColor={Colors["black-50"]}
            editable={editable}
            style={[{ color: Colors["black-50"], textAlignVertical }, style]}
            secureTextEntry={secureTextEntry && hidePassword}
            {...rest}
          />
        </View>

        {trailingIcon ||
          (secureTextEntry && (
            <TouchableWithoutFeedback
              onPress={() => setHidePassword(!hidePassword)}
            >
              <View>
                <IconEye color="line-stroke-30" />
              </View>
            </TouchableWithoutFeedback>
          ))}
      </View>

      {!!errorMessage && (
        <Typography fontFamily="Poppins-Light" fontSize={10} color="error-50">
          {errorMessage}
        </Typography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  inputWrapper: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 26,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
