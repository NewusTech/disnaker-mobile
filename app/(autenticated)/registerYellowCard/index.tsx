import { IconNotification } from "@/components/icons";
import { IconCaretDown } from "@/components/icons/IconCeretDown";
import { SelectInput } from "@/components/selectInput";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image/image";
import Loader from "@/components/ui/loader";
import ModalAction from "@/components/ui/modalAction";
import TextInput from "@/components/ui/textInput";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import {
  useGetKabupaten,
  useGetkecamatan,
  useGetkelurahan,
  useGetProvinsi,
} from "@/services/region";
import {
  useGetEducationLevel,
  useGetUserNotification,
  useUserRegisterYellowCard,
} from "@/services/user";
import { useAuthProfile } from "@/store/userStore";
import {
  userRegisterYellowCard,
  userRegisterYellowCardForm,
} from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const [modalSkm, setModalSkm] = useState<boolean>(false);

  const { control, handleSubmit, formState, setValue, watch } =
    useForm<userRegisterYellowCardForm>({
      defaultValues: {},
      resolver: zodResolver(userRegisterYellowCard),
      mode: "all",
    });

  const user = useAuthProfile();

  const getProvinsi = useGetProvinsi();
  const getKabupaten = useGetKabupaten();
  const getKecamatan = useGetkecamatan(
    getKabupaten.data?.data
      .find((f) => f.name === watch("kabupaten") || "")
      ?.id.toString() || ""
  );
  const getKelurahan = useGetkelurahan(
    getKecamatan.data?.data
      .find((f) => f.name === watch("kecamatan") || "")
      ?.id.toString() || ""
  );
  const getEducationLevel = useGetEducationLevel();
  const educationLevel = getEducationLevel.data?.data.map((data) => {
    return {
      title: data.level,
      id: data.id,
    };
  });
  const getNotification = useGetUserNotification();

  const createYellowCard = useUserRegisterYellowCard();

  const handleMutation = handleSubmit((data) => {
    createYellowCard.mutate(data, {
      onSuccess: async (response) => {
        Toast.show({
          type: "success",
          text1: "Buat Kartu Kuning Berhasil!",
          text2: response.message,
        });
        setModalSkm(true);
      },
      onError: (reponse) => {
        console.error(reponse);
        Toast.show({
          type: "error",
          text1: "Buat Kartu Kuning Gagal!",
          text2: reponse.response?.data.message,
        });
      },
    });
  });

  useEffect(() => {
    if (user?.UserProfile) {
      setValue("residance", user.UserProfile.address || "");
      setValue("provinsi", user.UserProfile.provinsi || "");
      setValue("kabupaten", user.UserProfile.kabupaten || "");
      setValue("kecamatan", user.UserProfile.kecamatan || "");
      setValue("kelurahan", user.UserProfile.kelurahan || "");
      if (user?.UserEducationHistories[0]?.educationLevel_id)
        setValue(
          "educationLevel_id",
          user.UserEducationHistories[0].educationLevel_id
        );
    }
  }, [user]);
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
          <TouchableOpacity
            style={{ marginLeft: "auto" }}
            onPress={() => router.push("/(autenticated)/notification")}
          >
            <IconNotification color="white" />
            {getNotification.data?.data.some((s) => !s.isReading) && (
                <View
                  style={{
                    backgroundColor: Colors["error-60"],
                    width: 5,
                    height: 5,
                    borderRadius: 100,
                    position: "absolute",
                    right: 3.9,
                    top: 3.1,
                  }}
                />
              )}
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Typography
          fontSize={20}
          style={{ textAlign: "center", marginTop: 15 }}
        >
          Pengajuan Kartu Kuning
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
            name="residance"
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
        <Typography
          fontSize={18}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: Colors["primary-10"],
            marginVertical: 20,
          }}
        >
          Pendidikan
        </Typography>
        <View style={{ paddingHorizontal: 20, gap: 20 }}>
          <Controller
            control={control}
            name="educationLevel_id"
            render={({ field, fieldState }) => (
              <SelectInput
                label="Pendidikan"
                placeholder="Pilih Pendidikan"
                data={educationLevel as any[]}
                onSelect={(data) =>
                  field.onChange(
                    educationLevel?.find((df) => df.title === data.title)?.id
                  )
                }
                value={
                  educationLevel?.find((df) => df.id == field.value)?.title ||
                  ""
                }
                trailingIcon={<IconCaretDown />}
                padding={12}
                borderRadius={15}
              />
            )}
          />
          <Controller
            control={control}
            name="skill"
            render={({ field, fieldState }) => (
              <TextInput
                label="Keterampilan"
                placeholder="Keterampilan yang dimiliki"
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
            name="job"
            render={({ field, fieldState }) => (
              <TextInput
                label="Pekerjaan"
                placeholder="Pekerjan saat ini"
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
        </View>
        <Button
          style={{ marginVertical: 20, marginHorizontal: 20 }}
          disabled={!formState.isValid || createYellowCard.isPending}
          onPress={handleMutation}
        >
          {createYellowCard.isPending ? (
            <Loader color="white" />
          ) : (
            " Kirim Pengajuan Sekarang"
          )}
        </Button>
      </ScrollView>
      <ModalAction
        isLoading={false}
        setVisible={setModalSkm}
        visible={modalSkm}
        onAction={() => router.replace("/(autenticated)/skm")}
        onNegativeAction={() =>
          router.replace({
            pathname: "/(autenticated)/(tabs)/history",
            params: {
              tabRiwayat: "Daftar Kartu Kuning",
            },
          })
        }
        title="Apakah Anda Ingin Mengisi Survei Kepuasan?"
      />
    </View>
  );
}
