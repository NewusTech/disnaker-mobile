import { IconNotification } from "@/components/icons";
import { IconCaretDown } from "@/components/icons/IconCeretDown";
import { SelectInput } from "@/components/selectInput";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/textInput";
import { Typography } from "@/components/ui/typography";
import UploadFoto from "@/components/uploadFoto";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useAuthProfile } from "@/store/userStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const user = useAuthProfile();

  const [fileBukti, setFileBukti] = useState<string>("");

  return (
    <View style={{ flex: 1 }} backgroundColor="white">
      <View
        backgroundColor="primary-50"
        style={{ padding: 20, paddingTop: 60, paddingBottom: 25, gap: 20 }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 10,
          }}
        >
          <Image
            source={{ uri: user?.UserProfile.image || "" }}
            style={{ width: 50, height: 50, borderRadius: 100 }}
          />
          <Typography
            fontSize={18}
            style={{}}
            color="white"
            onPress={() =>
              router.push({ pathname: "/(autenticated)/profile/userProfile" })
            }
          >
            Hi, {user?.UserProfile.name}
          </Typography>
          <TouchableOpacity style={{ marginLeft: "auto" }}>
            <IconNotification color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Typography
          fontSize={20}
          style={{ textAlign: "center", marginTop: 15 }}
        >
          Pengaduan Onlie
        </Typography>
        <Typography
          fontSize={18}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: Colors["primary-10"],
            marginVertical: 20,
          }}
        >
          Formulir Pengaduan
        </Typography>
        <View style={{ paddingHorizontal: 20, gap: 20 }}>
          <TextInput
            label="Judul"
            placeholder="Judul Pengaduan"
            keyboardType="default"
            color="primary-50"
            textAlignVertical="top"
            borderRadius={17}
            // value={field.value}
            // onBlur={field.onBlur}
            // onChangeText={field.onChange}
            // errorMessage={fieldState.error?.message}
          />
          <TextInput
            label="Keterangan"
            placeholder="Alamat"
            keyboardType="default"
            borderRadius={17}
            color="primary-50"
            numberOfLines={5}
            textAlignVertical="top"
            multiline={true}
            // value={field.value}
            // onBlur={field.onBlur}
            // onChangeText={field.onChange}
            // errorMessage={fieldState.error?.message}
          />
          <UploadFoto
            label="Lampiran Bukti"
            image={fileBukti}
            setImage={setFileBukti}
          />
        </View>
        <Button style={{ marginVertical: 20, marginHorizontal: 20 }}>
          Kirim Pengaduan Sekarang
        </Button>
      </ScrollView>
    </View>
  );
}
