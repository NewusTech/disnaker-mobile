import Appbar from "@/components/ui/appBar";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/textInput";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function index() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Edit Tentang Saya"}
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
          Note : Ceritakan tentang dirimu agar peluang diproses HRD lebih tinggi
        </Typography>
        <View style={{ marginTop: 20, gap: 5 }}>
          <TextInput
            placeholder="Tentang saya"
            keyboardType="default"
            borderRadius={17}
            color="primary-50"
            numberOfLines={10}
            textAlignVertical="top"
            multiline={true}
            value={
              "Saya Irsyad Abi Izzulhaq lulusan Jurusan Informatika dengan IPK 3,55 dari Universitas Teknokrat Indonesia. Hardskill yang saya kuasai antara lain UI/UX Design, Desain Grafis, Microsoft Word, Microsoft Excel dan Microsoft  Power Point. Tools yang saya gunakan pada bidang desain adalah Figma, Adobe Xd, Corel Draw dan Canva, sedangkan pada bidang Administrasi, Keuangan dan Entry Data saya menggunakan tools Micros|"
            }
            // onBlur={field.onBlur}
            // onChangeText={field.onChange}
            // errorMessage={fieldState.error?.message}
          />
          <Typography color="black-30" style={{ textAlign: "right" }}>
            236/1000
          </Typography>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          width:"100%",
          bottom: 0,
          marginBottom: insets.bottom + 20,
        }}
      >
        <Button style={{marginHorizontal:20}}>Simpan</Button>
      </View>
    </View>
  );
}
