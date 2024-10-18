import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "@/context/theme-context";
import View from "@/components/view";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Typography } from "@/components/ui/typography";
import { IconNotification } from "@/components/icons";
import TextInput from "@/components/ui/textInput";
import { SelectInput } from "@/components/selectInput";
import { IconCaretDown } from "@/components/icons/IconCeretDown";
import AnggotaJiwa from "@/components/tansmigrationApplication/AnggotaJiwa";
import { Button } from "@/components/ui/button";
import { useGetProfile, useUserTransmigration } from "@/services/user";
import {
  useGetKabupaten,
  useGetkecamatan,
  useGetkelurahan,
  useGetProvinsi,
} from "@/services/region";
import { Controller, useForm } from "react-hook-form";
import { userTransmigration, userTransmigrationForm } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import Pdf from "react-native-pdf";
import Loader from "@/components/ui/loader";

type anggota = {
  id: number;
  nik: string;
  name: string;
  gender: string;
  familyStatus: string;
};

export default function Index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const userProfile = useGetProfile();
  const user = userProfile.data?.data;

  const getProvinsi = useGetProvinsi();
  const getKabupaten = useGetKabupaten();
  const getKecamatan = useGetkecamatan();
  const getKelurahan = useGetkelurahan();
  const createTransmigration = useUserTransmigration();

  const { control, handleSubmit, formState, setValue, watch } =
    useForm<userTransmigrationForm>({
      defaultValues: {
        kk: user?.UserProfile.kk || "",
      },
      resolver: zodResolver(userTransmigration),
      mode: "all",
    });

  const [dataAnggotaJiwa, setDataAnggotaJiwa] = useState<anggota[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleMutation = handleSubmit((data) => {
    createTransmigration.mutate(
      { ...data, anggotaJiwa: dataAnggotaJiwa },
      {
        onSuccess: async (response) => {
          Toast.show({
            type: "success",
            text1: "Buat Transmigrasi Berhasil!",
            text2: response.message,
          });
          router.replace({
            pathname: "/(autenticated)/(tabs)/history",
            params: {
              tabRiwayat: "Daftar Tansmigrasi",
            },
          });
        },
        onError: (reponse) => {
          console.error(reponse);
          Toast.show({
            type: "error",
            text1: "Buat Transmigrasi Gagal!",
            text2: reponse.response?.data.message,
          });
        },
      }
    );
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
          <Controller
            control={control}
            name="domicile"
            render={({ field, fieldState }) => (
              <TextInput
                label="Alamat Domisili"
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
          <Controller
            control={control}
            name="kecamatan"
            render={({ field, fieldState }) => (
              <SelectInput
                label="Kecamatan"
                placeholder="Pilih Kecamatan"
                data={
                  getKecamatan.data?.data.map((d) => {
                    return {
                      title: d.name,
                    };
                  }) || []
                }
                onSelect={(dataItem: any, index: any) =>
                  field.onChange(dataItem.title)
                }
                value={field.value}
                trailingIcon={<IconCaretDown />}
                padding={12}
                borderRadius={15}
              />
            )}
          />
          <Controller
            control={control}
            name="kelurahan"
            render={({ field, fieldState }) => (
              <SelectInput
                label="Kelurahan"
                placeholder="Pilih Kelurahan"
                data={
                  getKelurahan.data?.data.map((d) => {
                    return {
                      title: d.name,
                    };
                  }) || []
                }
                onSelect={(dataItem: any, index: any) =>
                  field.onChange(dataItem.title)
                }
                value={field.value}
                trailingIcon={<IconCaretDown />}
                padding={12}
                borderRadius={15}
              />
            )}
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
          <Controller
            control={control}
            name="provinsi"
            render={({ field, fieldState }) => (
              <SelectInput
                label="Provinsi"
                placeholder="Pilih Provinsi"
                data={
                  getProvinsi.data?.data.map((d) => {
                    return {
                      title: d.name,
                    };
                  }) || []
                }
                onSelect={(dataItem: any, index: any) =>
                  field.onChange(dataItem.title)
                }
                value={field.value}
                trailingIcon={<IconCaretDown />}
                padding={12}
                borderRadius={15}
              />
            )}
          />
          <Controller
            control={control}
            name="kabupaten"
            render={({ field, fieldState }) => (
              <SelectInput
                label="Kabupaten"
                placeholder="Pilih Kabuten"
                data={
                  getKabupaten.data?.data.map((d) => {
                    return {
                      title: d.name,
                    };
                  }) || []
                }
                onSelect={(dataItem: any, index: any) =>
                  field.onChange(dataItem.title)
                }
                value={field.value}
                trailingIcon={<IconCaretDown />}
                padding={12}
                borderRadius={15}
              />
            )}
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
        <AnggotaJiwa setDataAnggota={setDataAnggotaJiwa} />
        <Typography
          fontSize={18}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: Colors["primary-10"],
            marginVertical: 20,
          }}
        >
          File Pendukung
        </Typography>

        <Typography
          fontSize={16}
          style={{ marginHorizontal: 20, marginBottom: 10 }}
        >
          Kartu Keluarga
        </Typography>
        {user?.UserProfile.kk ? (
          <Pressable
            onPress={() => setOpenModal(true)}
            style={{ marginBottom: 20, marginHorizontal: 20 }}
          >
            <Pdf
              trustAllCerts={false}
              source={{
                uri: watch("kk"),
              }}
              scale={2}
              onError={(error) => {
                console.error(error);
              }}
              style={{
                flex: 1,
                width: "100%",
                height: 150,
                borderColor: Colors["line-stroke-30"],
                borderWidth: 1,
                borderRadius: 15,
              }}
            />
          </Pressable>
        ) : (
          <Pressable onPress={() => router.push("/profile/editProfile")}>
            <Typography
              style={{
                width: "90%",
                height: 50,
                marginBottom: 20,
                marginHorizontal: 20,
                borderRadius: 15,
                textAlign: "center",
                textAlignVertical: "center",
                borderWidth: 1,
                borderColor: Colors["line-stroke-30"],
              }}
            >
              Upload File KK
            </Typography>
          </Pressable>
        )}
        <Button
          style={{ marginTop: 0, marginHorizontal: 20 }}
          disabled={!formState.isValid || createTransmigration.isPending}
          onPress={handleMutation}
        >
          {createTransmigration.isPending ? (
            <Loader color="white" />
          ) : (
            "Kirim Pengajuan"
          )}
        </Button>
      </ScrollView>
      <Modal
        transparent={true}
        animationType="slide"
        visible={openModal}
        onRequestClose={() => setOpenModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(20, 21, 17, 0.5)",
            height: "auto",
          }}
        >
          <Pdf
            trustAllCerts={false}
            source={{
              uri: watch("kk"),
            }}
            onError={(error) => {
              console.error(error);
            }}
            style={{
              flex: 1,
              width: "100%",
              height: 300,
              borderColor: Colors["line-stroke-30"],
              borderWidth: 1,
            }}
          />
        </View>
      </Modal>
    </View>
  );
}
