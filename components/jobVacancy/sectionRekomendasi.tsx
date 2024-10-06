import React from "react";
import View from "../view";
import { Typography } from "../ui/typography";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "@/context/theme-context";
import TextLink from "../ui/textLink";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { IconBookmarks } from "../icons/IconBookmarks";
import { IconGraduation } from "../icons/IconGraduation";
import { IconTipJar } from "../icons/IconTipJat";
import { IconLocation } from "../icons/IconLocation";

export default function SectionRekomendasi() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  return (
    <View backgroundColor="primary-20" style={{ paddingVertical: 20, gap: 10 }}>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontSize={16}>Rekomendasi Pekerjaan</Typography>
        <TextLink fontSize={14} label="Lihat Semua" />
      </View>
      {/*  */}
      <FlatList
        data={[
          {
            tes: "",
          },
          {
            tes: "",
          },
        ]}
        horizontal
        renderItem={(item) => (
          <View
            backgroundColor="white"
            style={{ padding: 20, width: 342, borderRadius: 15, gap: 15 }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <Image
                source={require("@/assets/images/dummy1.jpg")}
                style={{ width: 50, height: 50, borderRadius: 100 }}
              />
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  marginLeft: 15,
                }}
              >
                <Typography fontSize={17} style={{}} color="black-80">
                  Back End Developer
                </Typography>
                <Typography
                  fontSize={15}
                  fontFamily="Poppins-Light"
                  style={{}}
                  color="black-50"
                >
                  PT Brigitte
                </Typography>
              </View>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  padding: 3,
                  marginLeft: "auto",
                }}
              >
                <IconBookmarks width={27} height={27} color="black-80" />
              </TouchableOpacity>
            </View>
            <View style={{ gap: 5 }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconGraduation width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  SMA/SMK/S1
                </Typography>
              </View>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconTipJar width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  Rp. 3.000.000 - Rp. 4.500.000
                </Typography>
              </View>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconLocation width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  Tanggamus, Lampung
                </Typography>
              </View>
            </View>
            <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
              <Typography
                fontSize={12}
                style={{
                  padding: 7,
                  paddingHorizontal: 25,
                  backgroundColor: Colors["primary-50"],
                  borderRadius: 100,
                }}
                color="white"
              >
                Full Time
              </Typography>
              <Typography
                fontSize={12}
                style={{
                  padding: 7,
                  paddingHorizontal: 25,
                  backgroundColor: Colors["secondary-40"],
                  borderRadius: 100,
                }}
                color="white"
              >
                Remote
              </Typography>
            </View>
            <Typography
              fontSize={14}
              fontFamily="Poppins-LightItalic"
              style={{}}
              color="black-80"
            >
              Note: Update 2 Hari yang lalu
            </Typography>
          </View>
        )}
        style={{marginBottom:10}}
        contentContainerStyle={{
          paddingLeft: 20,
          paddingRight: 20,
          columnGap: 20,
        }}
        snapToStart
        decelerationRate={"normal"}
        snapToInterval={352}
      />
    </View>
  );
}
