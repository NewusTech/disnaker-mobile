import { View, ScrollView, Dimensions } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Appbar from "@/components/ui/appBar";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { useGetTnc } from "@/services/tnc";

export default function Tnc() {
  const router = useRouter();

  const getTnc = useGetTnc();

  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Syarat dan Ketentuan"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }}>
        <RenderHTML
          systemFonts={[...defaultSystemFonts, "Poppins-Regular"]}
          contentWidth={Dimensions.get("screen").width - 48}
          source={{
            html: getTnc.data?.data.desc || "<p>Hello World</p>",
          }}
        />
      </ScrollView>
    </View>
  );
}
