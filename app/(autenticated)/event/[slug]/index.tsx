import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppTheme } from "@/context/theme-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Appbar from "@/components/ui/appBar";
import { Typography } from "@/components/ui/typography";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";

export default function DetailInformationEvent() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Detail Event"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }}>
        <Typography fontFamily="Poppins-Medium" fontSize={20}>
          Career Fair Tanggamus 2024
        </Typography>
        <Typography fontFamily="Poppins-Light" fontSize={14}>
          23 Februari 2024
        </Typography>
        <Image
          source={require("@/assets/images/image_1.png")}
          style={{
            width: "100%",
            height: 150,
            marginTop: 20,
            borderRadius: 15,
          }}
        />
        <RenderHTML
          systemFonts={[...defaultSystemFonts, "Poppins-Regular"]}
          contentWidth={Dimensions.get("screen").width - 48}
          source={{
            html: "<p>Hello World</p>",
          }}
        />
      </ScrollView>
    </View>
  );
}
