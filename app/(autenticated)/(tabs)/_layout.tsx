import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Dimensions,
  PixelRatio,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import View from "@/components/view";
import { Typography } from "@/components/ui/typography";
import {
  IconHome,
  IconInformation,
  IconNewsPaperClip,
  IconNotepad,
  IconUser,
} from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function TabLayout() {
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  // const [activePage, setActivePage] = useState<string>("home");
  const [activePage, setActivePage] = useState<number>(0);

  const translateX = useSharedValue<number>(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(translateX.value, {
          damping: 15,
          stiffness: 100,
          mass: 1,
        }),
      },
    ],
  }));

  // const dimensionWidth = Dimensions.get("window").width - 20;

  // const calculateGap = (dimensionWidth - (60 * 3 + 120)) / 4;

  // useEffect(() => {
  //   if (activePage === 0) {
  //     translateX.value = 0;
  //   }
  //   if (activePage === 1) {
  //     translateX.value = 30 + calculateGap * 2;
  //   }
  //   if (activePage === 2) {
  //     translateX.value = 74 + calculateGap * 3;
  //   }
  //   if (activePage === 3) {
  //     translateX.value = 59 * 2 + calculateGap * 4;
  //   }
  //   if (activePage === 4) {
  //     translateX.value = 55 * 3 + calculateGap * 5;
  //   }
  // }, [activePage]);

  // const dimensionWidth = Dimensions.get("window").width - 20;
  // const scale = (size: number) => size * PixelRatio.get();

  // const calculateGap = (dimensionWidth - (60 * 3 + 120)) / 4;

  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const guidelineBaseWidth = 375; // Sesuaikan dengan ukuran layar referensi Anda (misal, iPhone X)

  const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;

  const dimensionWidth = scale(355); // Misal, ukuran tampilan yang diinginkan setelah dikurangi padding
  const calculateGap = (dimensionWidth - (scale(60) * 3 + scale(120))) / 4;

  useEffect(() => {
    if (activePage === 0) {
      translateX.value = 0;
    }
    if (activePage === 1) {
      translateX.value = scale(33) + calculateGap * 2;
    }
    if (activePage === 2) {
      translateX.value = scale(80) + calculateGap * 3;
    }
    if (activePage === 3) {
      translateX.value = scale(64) * 2 + calculateGap * 4;
    }
    if (activePage === 4) {
      translateX.value = scale(59) * 3 + calculateGap * 5;
    }
  }, [activePage]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ state, descriptors, navigation }) => {
        setActivePage(state.index);
        return (
          <Animated.View
            layout={LinearTransition}
            style={[
              style.container,
              { paddingBottom: insets.bottom, backgroundColor: Colors.white },
            ]}
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
                // setActivePage(label as string);
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
                <TouchableOpacity
                  key={route.key}
                  onPress={onPress}
                  onLongPress={onLongPress}
                >
                  <Animated.View
                    style={[
                      style.tabBarWrapper,
                      { width: isFocused ? 120 : 60 },
                    ]}
                    layout={LinearTransition}
                    // backgroundColor={isFocused ? "primary-80" : "transparent"}
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
                        fontFamily="Poppins-Medium"
                        color={isFocused ? "white" : "primary-30"}
                        fontSize={14}
                      >
                        {label as string}
                      </Typography>
                    )}
                  </Animated.View>
                </TouchableOpacity>
              );
            })}
            <Animated.View
              style={[
                animatedStyles,
                {
                  width: 120,
                  height: 50,
                  borderRadius: 10,
                  marginBottom: 10,
                  backgroundColor: Colors["primary-50"],
                  position: "absolute",
                  bottom: 0,
                  left: 10,
                  zIndex: -1,
                },
              ]}
            />
          </Animated.View>
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
              width={20}
              height={20}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "Berita",
          tabBarIcon: ({ focused }) => (
            <IconNewsPaperClip
              color={focused ? "white" : "primary-30"}
              width={24}
              height={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Riwayat",
          tabBarIcon: ({ focused }) => (
            <IconNotepad
              color={focused ? "white" : "primary-30"}
              width={24}
              height={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="event"
        options={{
          title: "Event",
          tabBarIcon: ({ focused }) => (
            <IconInformation
              color={focused ? "white" : "primary-30"}
              width={24}
              height={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <IconUser
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
    justifyContent: "space-between",
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
