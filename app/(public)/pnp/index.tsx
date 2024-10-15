import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppTheme } from "@/context/theme-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Appbar from "@/components/ui/appBar";
import { Typography } from "@/components/ui/typography";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";

export default function Pnp() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Kebijakan Privasi"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }}>
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
