import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { appFonts } from "@/components/ui/typography";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/transtack-query";
import { AppThemeProvider } from "@/context/theme-context";
import Toast from "react-native-toast-message";
import CustomSplashScreen from "@/components/customSplashScreen";
import React from "react";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    ...appFonts,
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const [animationCompleted, setAnimationComplete] = useState<Boolean>(true);

  const changeAnimationStatus = (param: Boolean) => {
    setAnimationComplete(param);
  };

  return (
    <>
      {animationCompleted && (
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            value={colorScheme === "dark" ? DefaultTheme : DefaultTheme}
          >
            <AppThemeProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: "ios",
                }}
              />
              <Toast />
            </AppThemeProvider>
          </ThemeProvider>
        </QueryClientProvider>
      )}
      {!animationCompleted && (
        <CustomSplashScreen onFinish={changeAnimationStatus} />
      )}
    </>
  );
}
