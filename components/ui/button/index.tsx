import { ReactNode } from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

import { useAppTheme } from "@/context/theme-context";

import { Typography } from "../typography";
import View from "../../view";
import { AppColorUnion } from "@/constants/Colors";

export type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  style?: ViewProps["style"];
  color?: AppColorUnion;
  textColor?: AppColorUnion;
} & PressableProps;

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    disabled = false,
    style,
    color = "primary-50",
    textColor = "white",
    ...rest
  } = props;

  const { Colors } = useAppTheme();

  return (
    <Pressable disabled={disabled} {...rest}>
      {(pressable) => (
        <View
          style={[
            {
              borderColor: disabled ? Colors["line-stroke-30"] : Colors[color],
              backgroundColor:
                variant === "primary"
                  ? disabled
                    ? Colors["line-stroke-30"]
                    : Colors[color]
                  : Colors.white,
            },
            styles.container,
            style,
          ]}
        >
          <View style={styles.childrenWrapper}>
            {typeof children === "string" ? (
              <Typography
                fontFamily="OpenSans-Semibold"
                color={
                  variant === "primary"
                    ? textColor
                    : disabled
                    ? "line-stroke-30"
                    : textColor
                }
                style={{ textAlign: "center", marginVertical: 12 }}
              >
                {children}
              </Typography>
            ) : (
              children
            )}
          </View>
          {pressable.pressed && (
            <View
              style={[
                styles.mask,
                {
                  backgroundColor: `${Colors[color]}${
                    variant === "primary" ? "80" : "0D"
                  }`,
                },
              ]}
            />
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    minHeight: 48,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    overflow: "hidden",
  },
  childrenWrapper: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
  },
  mask: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
