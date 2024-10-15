import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "@/context/theme-context";
import View from "@/components/view";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { Typography } from "@/components/ui/typography";
import { IconNotification } from "@/components/icons";
import TextInput from "@/components/ui/textInput";
import { SelectInput } from "@/components/selectInput";
import { IconCaretDown } from "@/components/icons/IconCeretDown";
import AnggotaJiwa from "@/components/tansmigrationApplication/AnggotaJiwa";
import { Button } from "@/components/ui/button";
import UploadFile from "@/components/uploadFile";
import UploadFoto from "@/components/uploadFoto";
import { useAuthProfile } from "@/store/userStore";

export default function Index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const user = useAuthProfile();

  const [imageKtp, setImageKtp] = useState<string>("");
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
          Pengajuan Transmigrasi
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
          Domisili
        </Typography>
        <View style={{ paddingHorizontal: 20, gap: 20 }}>
          <TextInput
            label="Alamat Domisili"
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
          <SelectInput
            label="Kecamatan"
            data={[{ title: "Kecamatan" }, { title: "Kecamatan" }]}
            onSelect={() => console.log()}
            value={"Pilih Kecamatan"}
            trailingIcon={<IconCaretDown />}
            padding={12}
            borderRadius={15}
          />
          <SelectInput
            label="Kelurahan"
            data={[{ title: "Kelurahan" }, { title: "Kelurahan" }]}
            onSelect={() => console.log()}
            value={"Pilih Kelurahan"}
            trailingIcon={<IconCaretDown />}
            padding={12}
            borderRadius={15}
          />
        </View>
        {/*  */}
        <Typography
          fontSize={18}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: Colors["primary-10"],
            marginVertical: 20,
          }}
        >
          Lokasi Transmigrasi
        </Typography>
        <View style={{ paddingHorizontal: 20, gap: 20 }}>
          <SelectInput
            label="Provinsi"
            data={[{ title: "Provinsi" }, { title: "Provinsi" }]}
            onSelect={() => console.log()}
            value={"Pilih Provinsi"}
            trailingIcon={<IconCaretDown />}
            padding={12}
            borderRadius={15}
          />
          <SelectInput
            label="Kota/ kabupaten"
            data={[{ title: "Kota" }, { title: "Kabupaten" }]}
            onSelect={() => console.log()}
            value={"Pilih Kota/ Kabupaten"}
            trailingIcon={<IconCaretDown />}
            padding={12}
            borderRadius={15}
          />
        </View>
        {/* Anggota Jiwa */}
        <Typography
          fontSize={18}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: Colors["primary-10"],
            marginVertical: 20,
          }}
        >
          Anggota Jiwa
        </Typography>
        <AnggotaJiwa />
        <Typography
          fontSize={18}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: Colors["primary-10"],
            marginVertical: 20,
          }}
        >
          Upload Kartu Keluarga
        </Typography>
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          <UploadFoto
            image=""
            label="Masukan Foto Ktp"
            setImage={setImageKtp}
          />
        </View>
        <Button style={{ marginTop: 0, marginHorizontal: 20 }}>
          Kirim Pengajuan
        </Button>
      </ScrollView>
    </View>
  );
}
