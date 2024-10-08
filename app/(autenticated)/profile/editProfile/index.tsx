import { IconCalender } from "@/components/icons/IconCalender";
import { IconCaretDown } from "@/components/icons/IconCeretDown";
import { IconPencilLine } from "@/components/icons/IconPencilLine";
import { SelectInput } from "@/components/selectInput";
import Appbar from "@/components/ui/appBar";
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/inputDate";
import { DateInputV3 } from "@/components/ui/inputDateV3";
import { DateInputV4 } from "@/components/ui/inputDateV4";
import Loader from "@/components/ui/loader";
import TextInput from "@/components/ui/textInput";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useGetProfile, useUpdatePrfoile } from "@/services/user";
import { profile, profileForm } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Pressable } from "react-native";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function EditProfile() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const profileQuery = useGetProfile();
  const user = profileQuery.data?.data;

  const { control, handleSubmit, formState } = useForm<profileForm>({
    defaultValues: {
      name: user?.UserProfile.name,
      email: user?.email,
      nik: user?.UserProfile.nik || "",
      birthDate: user?.UserProfile.birthDate || new Date().toString(),
      department: user?.UserProfile.department || "",
      gender: user?.UserProfile.gender || "",
      address: user?.UserProfile.address || "",
      phoneNumber: user?.UserProfile.phoneNumber || "",
      birthPlace: user?.UserProfile.birthPlace || "",
      religion: user?.UserProfile.religion || "",
      profession: user?.UserProfile.profession || "",
      employmentStatus: user?.UserProfile.employmentStatus || "",
      maritalStatus: user?.UserProfile.maritalStatus || "",
    },
    resolver: zodResolver(profile),
    mode: "all",
  });

  const updateProfile = useUpdatePrfoile();

  const handleLoginMutation = handleSubmit((data) => {
    console.log(data,"Data Update Profile")
    updateProfile.mutate(
      { data, slug: user?.UserProfile.slug || "" },
      {
        onSuccess: async (response) => {
          Toast.show({
            type: "success",
            text1: "Update Profile berhasil!",
            text2: "Berhasil membuat profile",
          });
        },
        onError: () => {
          Toast.show({
            type: "error",
            text1: "Update Prfile gagal!",
            text2: "Gagal",
          });
        },
      }
    );
  });

  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Edit Profile"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={{ padding: 15, paddingVertical: 20 }}
      >
        <View
          style={{ width: 90, marginHorizontal: "auto", position: "relative" }}
        >
          <Image
            source={require("@/assets/images/dummy1.jpg")}
            style={{ width: 90, height: 90, borderRadius: 100 }}
          />
          <Pressable
            style={{
              backgroundColor: "white",
              padding: 3,
              borderRadius: 100,
              position: "absolute",
              bottom: -5,
              right: 0,
              borderWidth: 1,
              borderColor: Colors["primary-50"],
            }}
          >
            <IconPencilLine width={20} height={20} />
          </Pressable>
        </View>
        <View style={{ marginTop: 20, gap: 10 }}>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <TextInput
                label="Nama Lengkap"
                placeholder="Nama Lengkap"
                keyboardType="default"
                borderRadius={17}
                color="primary-50"
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="nik"
            render={({ field, fieldState }) => (
              <TextInput
                label="NIK"
                placeholder="NIK"
                keyboardType="numeric"
                maxLength={16}
                borderRadius={17}
                color="primary-50"
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <TextInput
                label="Email"
                placeholder="Email"
                keyboardType="email-address"
                borderRadius={17}
                color="primary-50"
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="birthDate"
            render={({ field, fieldState }) => (
              <DateInput
                withBorder
                label={"Tanggal Lahir"}
                trailingIcon={
                  <View style={{ marginLeft: "auto" }}>
                    <IconCalender width={21} height={21} />
                  </View>
                }
                onChange={(date) => field.onChange(date || new Date())}
                value={new Date(field.value)}
              />
            )}
          />
          <Controller
            control={control}
            name="birthPlace"
            render={({ field, fieldState }) => (
              <TextInput
                label="Tempat Lahir"
                placeholder="Masukan tempat lahir"
                keyboardType="default"
                borderRadius={17}
                color="primary-50"
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="gender"
            render={({ field, fieldState }) => (
              <SelectInput
                label="Jenis Klamin"
                data={[{ title: "Laki-laki" }, { title: "Perempuan" }]}
                placeholder="Pilih Jenis Kelamin"
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
            name="phoneNumber"
            render={({ field, fieldState }) => (
              <TextInput
                label="Nomor Wa"
                placeholder="Nomor Wa"
                keyboardType="number-pad"
                maxLength={13}
                borderRadius={17}
                color="primary-50"
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="department"
            render={({ field, fieldState }) => (
              <TextInput
                label="Departemen"
                placeholder="Komputer"
                keyboardType="default"
                borderRadius={17}
                color="primary-50"
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="address"
            render={({ field, fieldState }) => (
              <TextInput
                label="Lokasi Terkini"
                placeholder="Masukan alamat"
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
            name="religion"
            render={({ field, fieldState }) => (
              <SelectInput
                label="Agama"
                data={[
                  { title: "Islam" },
                  { title: "Kristen" },
                  { title: "Budha" },
                  { title: "konghucu" },
                ]}
                placeholder="Pilih Jenis Agama"
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
            name="profession"
            render={({ field, fieldState }) => (
              <TextInput
                label="profesi"
                placeholder="Masukan profesi"
                keyboardType="default"
                borderRadius={17}
                color="primary-50"
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="employmentStatus"
            render={({ field, fieldState }) => (
              <SelectInput
                label="Status Bekerja"
                data={[{ title: "Sudah Bekerja" }, { title: "Belum Bekerja" }]}
                placeholder="Pilih Status Pekerjaan"
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
            name="maritalStatus"
            render={({ field, fieldState }) => (
              <SelectInput
                label="Status Pernikahan"
                data={[{ title: "Menikah" }, { title: "Belum Menikah" }]}
                placeholder="Pilih Status Pekerjaan"
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
          <Button
            style={{ marginTop: 10 }}
            disabled={!formState.isValid || updateProfile.isPending}
            onPress={handleLoginMutation}
          >
            {updateProfile.isPending ? <Loader color="white" /> : "Simpan"}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
