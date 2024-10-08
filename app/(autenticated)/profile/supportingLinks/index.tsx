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
    { title: "Instagram", image:  require("@/assets/images/instagram.png") },
    { title: "Facebook", image: require("@/assets/images/facebook.png") },
    { title: "Lainnya", image: require("@/assets/images/www.png") },
  ];

  const [linkPendukung, setLinkPendukung] =
    useState<string>("Pilih Jenis Link");

  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Tambah Link Pendukung"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={{ padding: 15, paddingVertical: 20 }}
      >
        <Typography
          fontFamily="Poppins-LightItalic"
          fontSize={14}
          style={{
            padding: 10,
            borderColor: Colors["line-stroke-30"],
            borderWidth: 1,
            borderRadius: 15,
          }}
          color="black-30"
        >
          Note : Inputkan Link Pendukung kamu dengan benar
        </Typography>
        <View style={{ marginTop: 20, gap: 5 }}>
          <SelectInput
            label="Jenis Link"
            data={dataLinkPendukung}
            onSelect={(dataItem: any, index: any) =>
              setLinkPendukung(dataItem.title)
            }
            value={linkPendukung}
            trailingIcon={<IconCaretDown />}
            leadingIcon={
              <Image
                style={{ width: 18, height: 18 }}
                source={
                  dataLinkPendukung.find((f) => f.title === linkPendukung)
                    ?.image || require("@/assets/images/www.png")
                }
              />
            }
            padding={12}
            borderRadius={15}
          />
          <TextInput
            label="Link"
            placeholder="Url"
            keyboardType="url"
            borderRadius={17}
            color="primary-50"
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
