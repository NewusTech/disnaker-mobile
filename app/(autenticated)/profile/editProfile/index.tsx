import { IconCalender } from "@/components/icons/IconCalender";
import { IconCaretDown } from "@/components/icons/IconCeretDown";
import { IconPencilLine } from "@/components/icons/IconPencilLine";
import { SelectInput } from "@/components/selectInput";
import Appbar from "@/components/ui/appBar";
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/inputDate";
import Loader from "@/components/ui/loader";
import TextInput from "@/components/ui/textInput";
import { Typography } from "@/components/ui/typography";
import UploadFile from "@/components/uploadFile";
import UploadFoto from "@/components/uploadFoto";
import View from "@/components/view";
import { formatDateYMD } from "@/constants/dateTime";
import { useAppTheme } from "@/context/theme-context";
import {
  useGetProfile,
  useUpdatePrfoile,
  useUploadFotoProfile,
} from "@/services/user";
import { useGetVacancyCategory } from "@/services/vacancy";
import { profile, profileForm } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentPickerAsset } from "expo-document-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Modal, Pressable, RefreshControl } from "react-native";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { any } from "zod";

export enum employmentStatus {
  "Sudah Bekerja" = "Sudah Bekerja",
  "Siap Bekerja" = "Siap Bekerja",
  "Tidak Bekerja" = "Tidak Bekerja",
}
export enum maritalStatus {
  "Menikah" = "Menikah",
  "Belum Menikah" = "Belum Menikah",
}
export enum gender {
  "Laki-laki" = "Laki-laki",
  "Perempuan" = "Perempuan",
}

export default function EditProfile() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const profileQuery = useGetProfile();
  const user = profileQuery.data?.data;

  const getVacancyCategory = useGetVacancyCategory();
  const vacancyCategory = getVacancyCategory.data?.data.map((data) => {
    return {
      title: data.name,
    };
  });

  // console.log(user?.UserProfile, "user profile");

  const [fileKTP, setFileKTP] = useState<DocumentPickerAsset>();
  const [fileKK, setFileKK] = useState<DocumentPickerAsset>();
  const [newFotoProfile, setNewFotoProfile] = useState("");
  const [modalProfile, setModalProfile] = useState(false);

  const { control, handleSubmit, formState, setValue, watch } =
    useForm<profileForm>({
      defaultValues: {
        birthDate: new Date(),
      },
      resolver: zodResolver(profile),
      mode: "all",
    });

  const updateProfile = useUpdatePrfoile();
  const uploadFotoProfile = useUploadFotoProfile();

  const handleLoginMutation = handleSubmit((data) => {
    const formData = new FormData();
    // Memasukkan data ke dalam FormData
    Object.keys(data).forEach((key) => {
      if (key !== "birthDate") {
        formData.append(key, data[key as keyof typeof any]);
      }
    });
    formData.append("birthDate", formatDateYMD(data.birthDate));
    if (fileKTP) {
      formData.append("ktp", {
        ...fileKTP,
        name: `${user?.UserProfile.slug}-ktp.pdf`,
      } as any);
    }
    if (fileKK) {
      const unixTimestamp = Math.floor(new Date().getDate() / 1000);
      formData.append("kk", {
        ...fileKK,
        name: `${user?.UserProfile.slug}-${unixTimestamp}-kk.pdf`,
      } as any);
    }
    updateProfile.mutate(
      {
        data: formData,
        slug: user?.UserProfile.slug || "",
      },
      {
        onSuccess: async (response) => {
          Toast.show({
            type: "success",
            text1: "Update Profile berhasil!",
            text2: response.message,
          });
          router.dismiss();
        },
        onError: (reponse) => {
          console.error(reponse);
          Toast.show({
            type: "error",
            text1: "Update Prfile gagal!",
            text2: reponse.response?.data.message,
          });
        },
      }
    );
  });

  const handleUploadFotoProfile = () => {
    const formData = new FormData();

    if (newFotoProfile === "")
      return Toast.show({
        type: "error",
        text1: "Opps Gambar Kosong!",
        text2: "Mohon pilih gambar terlebih dahulu",
      });
    const imageProfile: any = {
      name: "image_profile",
      type: "image/jpeg", // Pastikan MIME type sesuai
      uri: newFotoProfile,
    };

    formData.append("image", imageProfile);
    uploadFotoProfile.mutate(
      { data: formData, slug: user?.UserProfile.slug || "" },
      {
        onSuccess: (res) => {
          console.log(res, "res");
          Toast.show({
            type: "success",
            text1: "Update Profile berhasil!",
            text2: res.message,
          });
          setNewFotoProfile("");
          setModalProfile(false);
          profileQuery.refetch();
        },
        onError: (res) => {
          Toast.show({
            type: "error",
            text1: "Update Foto Profile gagal, coba setelah beberapa saat",
            text2: res.response?.data.message,
          });
          console.error(res);
          setNewFotoProfile("");
          setModalProfile(false);
          profileQuery.refetch();
        },
      }
    );
  };

  useEffect(() => {
    if (user && user.UserProfile) {
      setValue("name", user.UserProfile.name || "");
      setValue("email", user.email || "");
      setValue("nik", user.UserProfile.nik || "");
      setValue(
        "birthDate",
        new Date(user.UserProfile.birthDate || "12-12-1999")
      );
      setValue("department", user.UserProfile.department || "");
      setValue("gender", user.UserProfile.gender || "");
      setValue("address", user.UserProfile.address || "");
      setValue("phoneNumber", user.UserProfile.phoneNumber || "");
      setValue("birthPlace", user.UserProfile.birthPlace || "");
      setValue("religion", user.UserProfile.religion || "");
      setValue("profession", user.UserProfile.profession || "");
      setValue("employmentStatus", user.UserProfile.employmentStatus || "");
      setValue("maritalStatus", user.UserProfile.maritalStatus || "");
      setValue("citizenship", user.UserProfile.citizenship || "");
    }
  }, [user]);

  useEffect(() => {
    setValue("name", watch("name"), { shouldValidate: true });
  }, [fileKK, fileKTP]);

  return (
    <View backgroundColor="white" style={{ flex: 1 }}>
      <Appbar
        title={"Edit Profile"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={{ padding: 15, paddingVertical: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={profileQuery.isRefetching}
            onRefresh={() => profileQuery.refetch()}
            progressViewOffset={20}
          />
        }
      >
        <View
          style={{ width: 90, marginHorizontal: "auto", position: "relative" }}
        >
          <Image
            source={
              user?.UserProfile.image
                ? { uri: user.UserProfile.image }
                : require("@/assets/images/dummy1.jpg")
            }
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
            onPress={() => setModalProfile(true)}
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
                    <IconCalender width={21} height={21} color="black-80" />
                  </View>
                }
                onChange={(date) => {
                  console.log(date, "Tanggal Lahir");
                  field.onChange(new Date(date?.toString() || ""));
                }}
                value={new Date(field.value)}
                errorMessage={fieldState.error?.message}
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
                data={Object.keys(gender).map((value) => {
                  return {
                    title: value,
                  };
                })}
                placeholder="Pilih Jenis Kelamin"
                onSelect={(dataItem: any, index: any) =>
                  field.onChange(dataItem.title)
                }
                value={field.value}
                trailingIcon={<IconCaretDown color="black-80" />}
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
              <SelectInput
                label="Bidang Pekerjaan"
                data={vacancyCategory || []}
                placeholder="Pilih Bidang Pekerjaan"
                onSelect={(dataItem: any, index: any) =>
                  field.onChange(dataItem.title)
                }
                value={field.value}
                trailingIcon={<IconCaretDown color="black-80" />}
                padding={12}
                borderRadius={15}
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
                placeholder="Pilih Agama"
                onSelect={(dataItem: any, index: any) =>
                  field.onChange(dataItem.title)
                }
                value={field.value}
                trailingIcon={<IconCaretDown color="black-80" />}
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
                data={Object.keys(employmentStatus).map((value) => {
                  return {
                    title: value,
                  };
                })}
                placeholder="Pilih Status Pekerjaan"
                onSelect={(dataItem: any, index: any) =>
                  field.onChange(dataItem.title)
                }
                value={field.value}
                trailingIcon={<IconCaretDown color="black-80" />}
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
                data={Object.keys(maritalStatus).map((value) => {
                  return {
                    title: value,
                  };
                })}
                placeholder="Pilih Status Pekerjaan"
                onSelect={(dataItem: any, index: any) =>
                  field.onChange(dataItem.title)
                }
                value={field.value}
                trailingIcon={<IconCaretDown color="black-80" />}
                padding={12}
                borderRadius={15}
              />
            )}
          />
          <Controller
            control={control}
            name="citizenship"
            render={({ field, fieldState }) => (
              <SelectInput
                label="Status Warga Negara"
                data={[{ title: "WNI" }, { title: "WNA" }]}
                placeholder="Pilih Warganegara"
                onSelect={(dataItem: any, index: any) =>
                  field.onChange(dataItem.title)
                }
                value={field.value}
                trailingIcon={<IconCaretDown color="black-80" />}
                padding={12}
                borderRadius={15}
              />
            )}
          />
          <View style={{ marginTop: 10 }} key={user?.UserProfile.ktp}>
            <UploadFile
              label={`KTP${fileKTP ? "-" + fileKTP?.name : ""}`}
              file={fileKTP}
              setFile={setFileKTP}
              fileUrl={user?.UserProfile.ktp}
            />
          </View>
          <View style={{ marginTop: 10 }} key={user?.UserProfile.kk}>
            <UploadFile
              label={`KK${fileKK ? "-" + fileKK?.name : ""}`}
              file={fileKK}
              setFile={setFileKK}
              fileUrl={user?.UserProfile.kk}
            />
          </View>
          <Button
            style={{ marginTop: 10 }}
            disabled={!formState.isValid || updateProfile.isPending}
            onPress={handleLoginMutation}
          >
            {updateProfile.isPending ? <Loader color="white" /> : "Simpan"}
          </Button>
        </View>
      </ScrollView>
      {/* Modal foto profile */}
      <Modal transparent={true} visible={modalProfile}>
        <Pressable
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(20, 21, 17, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setModalProfile(false)}
        >
          <View
            backgroundColor="white"
            style={{
              width: "80%",
              height: 300,
              padding: 20,
              borderRadius: 15,
              justifyContent: "center",
              gap: 20,
            }}
          >
            <UploadFoto
              label="Masukan Foto Profile"
              image={newFotoProfile}
              setImage={setNewFotoProfile}
              aspect={[1, 1]}
            />
            <Button
              onPress={handleUploadFotoProfile}
              disabled={uploadFotoProfile.isPending}
            >
              {uploadFotoProfile.isPending ? (
                <Loader />
              ) : (
                <Typography color="white">Simpan Foto Profile</Typography>
              )}
            </Button>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
