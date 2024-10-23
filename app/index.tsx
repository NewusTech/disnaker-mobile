import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import View from "@/components/view";
import { getItem } from "@/lib/async-storage";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { IconKemenker } from "@/components/icons";
import { Typography } from "@/components/ui/typography";
import { useAuthActions } from "@/store/userStore";

const duration = 2000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

export default function InitialScreen() {
  const router = useRouter();

  const { setAccessToken } = useAuthActions();

  const logo = useSharedValue<number>(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${logo.value * 360}deg` }],
  }));

  useEffect(() => {
    logo.value = withRepeat(
      withDelay(500, withTiming(1, { duration, easing })),
      300
    );
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      const storageAccessToken = await getItem("accesstoken");

      if (storageAccessToken) {
        setAccessToken(storageAccessToken);
        router.replace("/(autenticated)/(tabs)/home");
        // router.replace("/(autenticated)/skm")
      } else {
        router.replace("/(public)/onboard");
      }
    };

    initAuth();
  }, [router]);

  return (
    <View style={style.container}>
      <Animated.View style={[animatedStyle]}>
        <IconKemenker width={99} height={99} color="primary-50" />
      </Animated.View>
      <Typography
        fontFamily="Poppins-Bold"
        color="primary-50"
        fontSize={24}
        style={{ marginVertical: 10 }}
      >
        Kemenker
      </Typography>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
