import React, { useEffect, useState } from "react";
import View from "../view";
import { Image, TouchableWithoutFeedback } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { Typography } from "../ui/typography";
import { IconKemenker } from "../icons";

const duration = 2000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

const DURATION = 1000;
const DELAY = 500;

export default function SecctionHeader() {
  const [activePage, setActivePage] = useState<number>(0);
  //   const text = ["Selamat", "datang", "di", "Aplikasi", "Disnaker", "Tanggamus"];
  const text = "Selamat datang di Aplikasi Disnaker Tanggamus".split(" ");
  const logo = useSharedValue<number>(0);
  // Inisialisasi shared values untuk setiap kata di dalam array
  const opacityValues = text.map(() => useSharedValue(0));

  // Fungsi untuk memulai animasi
  const startAnimation = () => {
    opacityValues.forEach((opacity, index) => {
      // Setel delay agar setiap kata muncul secara bertahap
      setTimeout(() => {
        // Update opacity dengan animasi
        opacity.value = withTiming(1, { duration: DURATION });
      }, index * DELAY); // Tambahkan delay 300ms untuk setiap kata
    });
  };

  // React.useEffect(() => {
  //   logo.value = withDelay(500, withTiming(1, { duration, easing }));
  // }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${logo.value * 360}deg` }],
  }));

  const reapetAnim = () => {
    logo.value = 0;
    logo.value = withDelay(500, withTiming(1, { duration, easing }));
  };

  useEffect(() => {
    // Mulai animasi saat komponen pertama kali dipanggil
    startAnimation();

    // Set interval untuk mengulangi animasi setiap 30 detik
    const intervalId = setInterval(() => {
      // Reset opacity untuk semua teks ke 0
      opacityValues.forEach((opacity) => {
        opacity.value = 0;
      });

      // Mulai animasi lagi setelah reset
      startAnimation();
    }, 10000); // Ulangi setiap 30 detik

    // Membersihkan interval ketika komponen tidak lagi digunakan
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View
      backgroundColor="primary-50"
      style={{
        height: "auto",
        paddingTop: 50,
        paddingBottom: 10,
        flexDirection: "column",
        gap: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableWithoutFeedback>
        <Animated.View style={[animatedStyle]}>
          <Image
            source={require("@/assets/images/logo_tanggamus.png")}
            style={{ width: 54, height: 74 }}
          />
          {/* <IconKemenker color="white" width={64} height={64} /> */}
        </Animated.View>
      </TouchableWithoutFeedback>
      {/* <Typography
        fontFamily="Poppins-Medium"
        fontSize={20}
        style={{ textAlign: "center", width: "80%" }}
        color="white"
      >
        Selamat datang di Aplikasi Disnaker Tanggamus
      </Typography> */}
      <Animated.View
        style={{
          width: "80%",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          columnGap: 5,
        }}
      >
        {text.map((d, index) => {
          // Gunakan useAnimatedStyle untuk setiap kata agar opacity dapat dianimasikan
          const animatedStyle = useAnimatedStyle(() => {
            return {
              opacity: opacityValues[index].value,
            };
          });

          return (
            <Animated.View key={index} style={animatedStyle}>
              <Typography
                fontFamily="Poppins-Medium"
                fontSize={20}
                color="white"
              >
                {d}
              </Typography>
            </Animated.View>
          );
        })}
      </Animated.View>
    </View>
  );
}
