import React from "react";
import LottieView from "lottie-react-native";

type CustomSplashScreen = {
  onFinish: (param: Boolean) => void;
};

export default function CustomSplashScreen({ onFinish }: CustomSplashScreen) {
  return (
    <LottieView
      source={require("@/assets/lottie/Animaation-Splash.json")}
      style={{ width: "100%", height: "100%" }}
      autoPlay
      loop={false}
      duration={4000}
      onAnimationFinish={() => onFinish(true)}
    />
  );
}
