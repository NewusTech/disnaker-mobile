import { Checkbox } from "@/components/checkBox";
import { IconCalender } from "@/components/icons/IconCalender";
import Appbar from "@/components/ui/appBar";
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/inputDate";
import Loader from "@/components/ui/loader";
import TextInput from "@/components/ui/textInput";
import { Typography } from "@/components/ui/typography";
import UploadFile from "@/components/uploadFile";
import View from "@/components/view";
import { formatDateYMD } from "@/constants/dateTime";
import { useAppTheme } from "@/context/theme-context";
import { useCreateSetificate } from "@/services/user";
import { useAuthProfile } from "@/store/userStore";
import { userSertificate, userSertificateForm } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentPickerAsset } from "expo-document-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, TouchableWithoutFeedback } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { any } from "zod";

export default function index() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const [fileSertificate, setFileSertificate] = useState<DocumentPickerAsset>();

  const user = useAuthProfile();

  const { control, handleSubmit, formState, setValue, watch } =
    useForm<userSertificateForm>({
      defaultValues: {
        expiredDate: new Date(),
        isNonExpire: false,
      },
      resolver: zodResolver(userSertificate),
      mode: "all",
    });

  const createSertificate = useCreateSetificate();

  const handleLoginMutation = handleSubmit((data) => {
    const formData = new FormData();
    // Memasukkan data ke dalam FormData
    Object.keys(data).forEach((key) => {
      if (key !== "expiredDate") {
        formData.append(key, data[key as keyof typeof any]);
      }
    });
    formData.append("expiredDate", formatDateYMD(data.expiredDate));
    if (fileSertificate) {
      const unixTimestamp = Math.floor(new Date().getDate() / 1000);
      formData.append("file", {
        ...fileSertificate,
        name: `${user?.UserProfile.slug}-${unixTimestamp}-sertificate`,
      } as any);
    }
    createSertificate.mutate(formData, {
      onSuccess: async (response) => {
        Toast.show({
          type: "success",
          text1: "Add Sertificate Berhasil!",
          text2: response.message,
        });
        router.dismiss();
      },
      onError: (reponse) => {
        console.error(reponse);
        Toast.show({
          type: "error",
          text1: "Add Sertificate Gagal!",
          text2: reponse.response?.data.message,
        });
      },
    });
  });

  const isNonExpire = watch("isNonExpire");
  useEffect(() => {
    if (isNonExpire) setValue("expiredDate", new Date("9999-12-30"));
    else setValue("expiredDate", new Date());
  }, [isNonExpire]);

  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Tambah Sertifikat"}
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
          Note : Inputkan Sertifikat kamu dengan benar
        </Typography>
        <View style={{ marginTop: 20, gap: 20 }}>
          <Controller
            control={control}
            name="title"
            render={({ field, fieldState }) => (
              <TextInput
                label="Nama Sertifikat"
                placeholder="Masukan Nama Sertifikat"
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
            name="organization"
            render={({ field, fieldState }) => (
              <TextInput
                label="Organisasi/ Instansi Penerbit"
                placeholder="Masukan Organisasi/ Instansi Penerbit"
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
            name="expiredDate"
            render={({ field, fieldState }) => (
              <DateInput
                withBorder
                label={"Masa Berlaku Hingga"}
                trailingIcon={
                  <View style={{ marginLeft: "auto" }}>
                    <IconCalender width={21} height={21} color="black-80" />
                  </View>
                }
                onChange={(date) => {
                  field.onChange(new Date(date?.toString() || ""));
                }}
                value={new Date(field.value)}
                errorMessage={fieldState.error?.message}
                disabled={isNonExpire}
              />
            )}
          />
          <Controller
            control={control}
            name="isNonExpire"
            render={({ field, fieldState }) => (
              <TouchableWithoutFeedback
                onPress={() => field.onChange(!field.value)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Checkbox selected={field.value} />
                  <Typography fontFamily="Poppins-Regular" fontSize={12}>
                    Sertifikat ini tidak memiliki batas waktu
                  </Typography>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
          <Controller
            control={control}
            name="desc"
            render={({ field, fieldState }) => (
              <View style={{ marginTop: 0, gap: 5 }}>
                <Typography fontSize={16}>
                  Deskripsi{" "}
                  <Typography fontFamily="Poppins-Light" fontSize={14}>
                    (Optional)
                  </Typography>
                </Typography>
                <TextInput
                  placeholder="Masukan Deskripsi sertificate"
                  keyboardType="default"
                  borderRadius={17}
                  color="primary-50"
                  numberOfLines={10}
                  textAlignVertical="top"
                  maxLength={1000}
                  multiline={true}
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  errorMessage={fieldState.error?.message}
                />
                <Typography color="black-30" style={{ textAlign: "right" }}>
                  {(field.value || "").toString().length} /1000
                </Typography>
              </View>
            )}
          />
          <View style={{ marginTop: 10 }}>
            <UploadFile
              label={`Sertificate${
                fileSertificate ? "-" + fileSertificate?.name : ""
              }`}
              file={fileSertificate}
              setFile={setFileSertificate}
            />
          </View>
        </View>
        <Button
          style={{ marginTop: 20 }}
          disabled={!formState.isValid || createSertificate.isPending}
          onPress={handleLoginMutation}
        >
          {createSertificate.isPending ? <Loader color="white" /> : "Simpan"}
        </Button>
      </ScrollView>
    </View>
  );
}
