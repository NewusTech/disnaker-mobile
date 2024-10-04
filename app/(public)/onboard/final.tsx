import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function final() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
      <View
        style={{
          width: Dimensions.get("window").width,
          height: 400,
          overflow: "hidden",
        }}
      >
        <Image
          source={require("@/assets/images/onboard_v.png")}
          style={{ width: "100%", objectFit: "cover" }}
        />
      </View>
      <View style={{ paddingHorizontal: insets.left + 10 }}>
        <Typography
          fontFamily="Poppins-Medium"
          fontSize={22}
          style={{ textAlign: "center" }}
        >
          Selamat Datang di Aplikasi Disnaker
        </Typography>
        <Typography
          fontFamily="Poppins-Light"
          fontSize={15}
          style={{ textAlign: "center" }}
        >
          Aplikasi Disnaker memudahkanmu menemukan dan melamar pekerjaan dengan
          cepat. Semua lowongan dan status lamaranmu ada dalam satu platform.
        </Typography>
        <View style={{ marginHorizontal: 20 }}>
          <Button style={{ marginTop: 20 }} onPress={()=>router.push("/auth/register")}>Daftar</Button>
          <Button style={{ marginTop: 10 }} variant="secondary" onPress={()=>router.push("/auth/login")}>
            Masuk
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
