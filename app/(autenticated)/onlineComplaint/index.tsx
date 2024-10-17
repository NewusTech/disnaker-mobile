import { IconNotification } from "@/components/icons";
import { IconCaretDown } from "@/components/icons/IconCeretDown";
import { SelectInput } from "@/components/selectInput";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import TextInput from "@/components/ui/textInput";
import { Typography } from "@/components/ui/typography";
import UploadFoto from "@/components/uploadFoto";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useUserComplaint } from "@/services/user";
import { useAuthProfile } from "@/store/userStore";
import { userComplaint, userComplaintForm } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { any } from "zod";

export default function index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const user = useAuthProfile();

  const { control, handleSubmit, formState, setValue, watch } =
    useForm<userComplaintForm>({
      defaultValues: {},
      resolver: zodResolver(userComplaint),
      mode: "all",
    });

  const [fileBukti, setFileBukti] = useState<string>("");

  const createPengaduan = useUserComplaint();

  const handleMutation = handleSubmit((data) => {
    const formData = new FormData();
    // Memasukkan data ke dalam FormData
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as keyof typeof any]);
    });
    const _fileBukti: any = {
      name: "image_profile",
      type: "image/jpeg", // Pastikan MIME type sesuai
      uri: fileBukti,
    };
    if (fileBukti) formData.append("file", _fileBukti);

    createPengaduan.mutate(formData, {
      onSuccess: (res) => {
        console.log(res, "res");
        Toast.show({
          type: "success",
          text1: "Update Profile berhasil!",
          text2: res.message,
        });
        setFileBukti("");
        router.replace({
          pathname: "/(autenticated)/(tabs)/history",
          params: {
            tabRiwayat: "Pengaduan",
          },
        });
      },
      onError: (res) => {
        Toast.show({
          type: "error",
          text1: "Update Foto Profile gagal, coba setelah beberapa saat",
          text2: res.response?.data.message,
        });
        console.error(res);
        setFileBukti("");
        // router.replace("/(autenticated)/(tabs)/history");
      },
    });
  });

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
          <Controller
            control={control}
            name="title"
            render={({ field, fieldState }) => (
              <TextInput
                label="Judul"
                placeholder="Judul Pengaduan"
                keyboardType="default"
                color="primary-50"
                textAlignVertical="top"
                borderRadius={17}
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="desc"
            render={({ field, fieldState }) => (
              <TextInput
                label="Keterangan"
                placeholder="Alamat"
                keyboardType="default"
                borderRadius={17}
                color="primary-50"
                numberOfLines={5}
                textAlignVertical="top"
                multiline={true}
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <UploadFoto
            label="Lampiran Bukti"
            image={fileBukti}
            setImage={setFileBukti}
          />
        </View>
        <Button
          style={{ marginVertical: 20, marginHorizontal: 20 }}
          disabled={!formState.isValid || createPengaduan.isPending}
          onPress={handleMutation}
        >
          {createPengaduan.isPending ? (
            <Loader color="white" />
          ) : (
            " Kirim Pengaduan Sekarang"
          )}
        </Button>
      </ScrollView>
    </View>
  );
}
