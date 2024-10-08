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
import { Image, ScrollView } from "react-native";
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
        title={"Update Password"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={{ padding: 15, paddingVertical: 20 }}
      >
        <View style={{ marginTop: 0, gap: 5 }}>
          <TextInput
            label="Password Lama"
            placeholder="Masukan password lama"
            borderRadius={17}
            color="primary-50"
            secureTextEntry
            // value={field.value}
            // onBlur={field.onBlur}
            // onChangeText={field.onChange}
            // errorMessage={fieldState.error?.message}
          />
          <TextInput
            label="Password Baru"
            placeholder="Masukan password baru"
            borderRadius={17}
            color="primary-50"
            secureTextEntry
            // value={field.value}
            // onBlur={field.onBlur}
            // onChangeText={field.onChange}
            // errorMessage={fieldState.error?.message}
          />
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
