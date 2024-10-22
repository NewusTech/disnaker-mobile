import { View, ScrollView, Dimensions } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Appbar from "@/components/ui/appBar";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { useGetPnp } from "@/services/pnp";
import Loader from "@/components/ui/loader";

export default function Pnp() {
  const router = useRouter();

  const getPnp = useGetPnp();

  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Syarat dan Ketentuan"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 20, marginTop: 5 }}
        contentContainerStyle={{ width: "100%" }}
      >
        {!getPnp.isFetching ? (
          <RenderHTML
            systemFonts={[...defaultSystemFonts, "Poppins-Regular"]}
            contentWidth={Dimensions.get("screen").width - 48}
            source={{
              html: getPnp.data?.data.desc || "<p>Hello World</p>",
            }}
          />
        ) : (
          <Loader />
        )}
      </ScrollView>
    </View>
  );
}
