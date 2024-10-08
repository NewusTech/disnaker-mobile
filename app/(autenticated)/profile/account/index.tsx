import { IconBookmarks } from "@/components/icons/IconBookmarks";
import { IconCaretDown } from "@/components/icons/IconCeretDown";
import { SelectInput } from "@/components/selectInput";
import Appbar from "@/components/ui/appBar";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/textInput";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function index() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const dataLinkPendukung = [
    { title: "Instagram", image: require("@/assets/images/instagram.png") },
    { title: "Facebook", image: require("@/assets/images/facebook.png") },
    { title: "Lainnya", image: require("@/assets/images/www.png") },
  ];

  const [linkPendukung, setLinkPendukung] =
    useState<string>("Pilih Jenis Link");

  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Akun Saya"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={{ padding: 15, paddingVertical: 20 }}
      >
        <View style={{ marginTop: 0, gap: 5 }}>
          <View
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: Colors["line-stroke-30"],
              padding: 10,
              alignItems: "center",
              gap: 15,
              borderRadius: 10,
              paddingHorizontal: 15,
            }}
          >
            <Image
              source={require("@/assets/images/padlock.png")}
              style={{ width: 24, height: 24 }}
            />
            <Typography fontSize={18}>Password</Typography>
            <TouchableOpacity
              style={{
                backgroundColor: Colors["primary-50"],
                marginLeft: "auto",
                padding: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
              }}
              onPress={()=>router.push("/profile/updatePassword")}
            >
              <Typography fontSize={14} color="white">
                Ubah Data
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          marginBottom: insets.bottom + 20,
        }}
      >
        <Button style={{ marginHorizontal: 20 }}>Simpan</Button>
      </View>
    </View>
  );
}
