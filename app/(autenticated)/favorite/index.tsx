import { IconBookmarksFill } from "@/components/icons";
import { IconGraduation } from "@/components/icons/IconGraduation";
import { IconLocation } from "@/components/icons/IconLocation";
import { IconTipJar } from "@/components/icons/IconTipJar";
import Appbar from "@/components/ui/appBar";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function index() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }} backgroundColor="white">
      <Appbar
        title={"Favorite"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <FlatList
        data={[
          {
            tes: "",
          },
          {
            tes: "",
          },
        ]}
        renderItem={(item) => (
          <Pressable
            style={{
              padding: 20,
              width: Dimensions.get("window").width - 40,
              borderRadius: 15,
              gap: 15,
              borderWidth: 1,
              borderColor: Colors["line-stroke-30"],
              backgroundColor: Colors.white,
            }}
            onPress={() => router.push(`/jobVacancy/z`)}
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
                <IconBookmarksFill width={27} height={27} color="primary-50" />
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
          </Pressable>
        )}
        style={{ marginTop: 20 }}
        contentContainerStyle={{
          rowGap: 20,
          marginHorizontal: "auto",
        }}
      />
    </View>
  );
}
