import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable, StyleSheet, TouchableWithoutFeedback } from "react-native";
import View from "@/components/view";
import { Typography } from "@/components/typography";
import { IconHome } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";

export default function TabLayout() {
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ state, descriptors, navigation }) => {
        return (
          <View
            backgroundColor="white"
            style={[style.container, { paddingBottom: insets.bottom }]}
          >
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              };

              const onLongPress = () => {
                navigation.emit({
                  type: "tabLongPress",
                  target: route.key,
                });
              };

              return (
                <TouchableWithoutFeedback
                  key={route.key}
                  onPress={onPress}
                  onLongPress={onLongPress}
                >
                  <View
                    style={[style.tabBarWrapper]}
                    backgroundColor={isFocused ? "primary-50" : "white"}
                  >
                    <View style={style.navIconWrapper}>
                      {options?.tabBarIcon?.({
                        focused: isFocused,
                        color: "",
                        size: 0,
                      })}
                    </View>
                    {isFocused && (
                      <Typography
                        fontFamily="Poppins-Bold"
                        color={isFocused ? "white" : "primary-30"}
                        fontSize={10}
                      >
                        {label as string}
                      </Typography>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        );
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <IconHome
              color={focused ? "white" : "primary-30"}
              width={24}
              height={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="riwayat"
        options={{
          title: "Riwayat",
          tabBarIcon: ({ focused }) => (
            <IconHome
              color={focused ? "white" : "primary-30"}
              width={24}
              height={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    gap: 10,
  },
  tabBarWrapper: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    gap: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  navIconWrapper: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: 24,
  },
});
