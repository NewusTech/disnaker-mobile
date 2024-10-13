import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppTheme } from "@/context/theme-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Appbar from "@/components/ui/appBar";
import { Typography } from "@/components/ui/typography";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { IconBuilding, IconInfo, IconInformation } from "@/components/icons";

export default function DetailTraining() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Detail Pelatihan"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, marginTop: 10 }}>
        <Image
          source={require("@/assets/images/image_1.png")}
          style={{
            width: "100%",
            height: 150,
            marginTop: 20,
            borderRadius: 15,
          }}
        />
        <View style={{ marginTop: 10 }}>
          <Typography fontFamily="Poppins-Medium" fontSize={20}>
            Career Fair Tanggamus 2024
          </Typography>
          <View style={{ flexDirection: "row", gap: 15 }}>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              <IconBuilding width={20} height={20} color="black-80" />
              <Typography fontFamily="Poppins-Light" fontSize={14}>
                Gedung/Online
              </Typography>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              <IconInfo width={20} height={20} color="black-80" />
              <Typography fontFamily="Poppins-Light" fontSize={14}>
                Menengah
              </Typography>
            </View>
          </View>
        </View>
        {/* tab */}
        <View
          style={{
            width: "100%",
            height: 60,
            backgroundColor: Colors["primary-50"],
            borderRadius: 100,
            overflow: "hidden",
            flexDirection: "row",
            padding: 10,
            paddingVertical: 10,
            marginTop: 20,
            marginHorizontal: "auto",
          }}
        >
          <View
            style={{
              width: "50%",
              backgroundColor: Colors["white"],
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
            }}
          >
            <Typography
              fontSize={15}
              style={{ textAlignVertical: "center" }}
              color={"primary-50"}
            >
              Detail Pelatihan
            </Typography>
          </View>
          <TouchableOpacity
            style={{
              width: "50%",
              backgroundColor: Colors["primary-50"],
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
            }}
          >
            <Typography
              fontSize={15}
              style={{ textAlignVertical: "center" }}
              color={"white"}
            >
              Download Materi
            </Typography>
          </TouchableOpacity>
        </View>
        <Typography fontSize={18} style={{ marginTop: 20 }}>
          Deskripsi
        </Typography>
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
