import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { appFonts, Typography } from "@/components/ui/typography";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/transtack-query";
import { AppThemeProvider } from "@/context/theme-context";
import Toast from "react-native-toast-message";
import CustomSplashScreen from "@/components/customSplashScreen";
import React from "react";
import { Modal } from "react-native";
import View from "@/components/view";
import Animated, { SlideInDown } from "react-native-reanimated";
import { useNetInfo } from "@react-native-community/netinfo";
import LottieView from "lottie-react-native";

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

  const { isConnected } = useNetInfo();

  const [animationCompleted, setAnimationComplete] = useState<Boolean>(false);

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
              <Modal
                transparent
                visible={!isConnected || false}
                animationType="fade"
              >
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(20, 21, 17, 0.5)",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Animated.View
                    entering={SlideInDown}
                    style={{
                      width: "70%",
                      height: "auto",
                      padding: 20,
                      borderRadius: 15,
                      justifyContent: "center",
                      gap: 20,
                      backgroundColor: "white",
                    }}
                  >
                    <LottieView
                      source={require("@/assets/lottie/Animated-Connection.json")}
                      style={{ width: "100%", height: 200 }}
                      autoPlay
                      loop={true}
                    />
                    <Typography
                      fontFamily="Poppins-Medium"
                      fontSize={16}
                      style={{ textAlign: "center" }}
                    >
                      Tidak terhubung ke internet
                    </Typography>
                  </Animated.View>
                </View>
              </Modal>
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
