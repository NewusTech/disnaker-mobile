import { Checkbox } from "@/components/checkBox";
import { IconCalender } from "@/components/icons/IconCalender";
import { IconCaretDown } from "@/components/icons/IconCeretDown";
import { SelectInput } from "@/components/selectInput";
import Appbar from "@/components/ui/appBar";
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/inputDate";
import { DateInputV3 } from "@/components/ui/inputDateV3";
import Loader from "@/components/ui/loader";
import TextInput from "@/components/ui/textInput";
import { Typography } from "@/components/ui/typography";
import UploadFile from "@/components/uploadFile";
import View from "@/components/view";
import { formatDateYMD } from "@/constants/dateTime";
import { useAppTheme } from "@/context/theme-context";
import {
  useCreateEducationHistory,
  useGetEducationLevel,
} from "@/services/user";
import { useAuthProfile } from "@/store/userStore";
import { userEducation, userEducationForm } from "@/validation";
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

  const [masihBersekolah, setMasihBersekolah] = useState<boolean>(false);

  const [fileIjazah, setFileIjazah] = useState<DocumentPickerAsset>();
  const [fileTranskrip, setFileTranskrip] = useState<DocumentPickerAsset>();

  const user = useAuthProfile();

  const { control, handleSubmit, formState, setValue, watch } =
    useForm<userEducationForm>({
      defaultValues: {
        joinDate: new Date(),
        graduationDate: new Date(),
      },
      resolver: zodResolver(userEducation),
      mode: "all",
    });

  const creteEducationHistory = useCreateEducationHistory();

  const getEducationLevel = useGetEducationLevel();
  const educationLevel = getEducationLevel.data?.data.map((data) => {
    return {
      title: data.level,
      id: data.id,
    };
  });

  const handleLoginMutation = handleSubmit((data) => {
    const formData = new FormData();
    // Memasukkan data ke dalam FormData
    Object.keys(data).forEach((key) => {
      if (key !== "joinDate" && key !== "graduationDate") {
        formData.append(key, data[key as keyof typeof any]);
      }
    });
    formData.append("joinDate", formatDateYMD(data.joinDate));
    formData.append("graduationDate", formatDateYMD(data.graduationDate));
    if (fileIjazah) {
      const unixTimestamp = Math.floor(new Date().getDate() / 1000);
      formData.append("fileIjazah", {
        ...fileIjazah,
        name: `${user?.UserProfile.slug}-${unixTimestamp}-ijazah`,
      } as any);
    }
    if (fileTranskrip) {
      const unixTimestamp = Math.floor(new Date().getDate() / 1000);
      formData.append("fileTranskrip", {
        ...fileTranskrip,
        name: `${user?.UserProfile.slug}-${unixTimestamp}-transkrip`,
      } as any);
    }
    creteEducationHistory.mutate(formData, {
      onSuccess: async (response) => {
        Toast.show({
          type: "success",
          text1: "Add Education History Berhasil!",
          text2: response.message,
        });
        router.dismiss();
      },
      onError: (reponse) => {
        console.error(reponse);
        Toast.show({
          type: "error",
          text1: "Add Education History Gagal!",
          text2: reponse.response?.data.message,
        });
      },
    });
  });

  useEffect(() => {
    if (masihBersekolah) setValue("graduationDate", new Date());
  }, [masihBersekolah]);

  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Tambah Pendidiakn"}
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
          Note : Inputkan institusi kamu dengan benar
        </Typography>
        <View style={{ marginTop: 20, gap: 20 }}>
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
                    educationLevel
                      ?.find((df) => df.title === data.title)
                      ?.id.toString()
                  )
                }
                value={
                  educationLevel?.find((df) => df.id.toString() == field.value)
                    ?.title || ""
                }
                trailingIcon={<IconCaretDown />}
                padding={12}
                borderRadius={15}
              />
            )}
          />
          <Controller
            control={control}
            name="instanceName"
            render={({ field, fieldState }) => (
              <TextInput
                label="Sekolah/ Universitas"
                placeholder="Masukan Nama Sekolah"
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
            name="department"
            render={({ field, fieldState }) => (
              <TextInput
                label="Jurusan"
                placeholder="Masukan Jurusan"
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
            name="gpa"
            render={({ field, fieldState }) => (
              <TextInput
                label="IPK / Nilai Akhir"
                placeholder="Masukan IPK/ Nilai Akhir"
                keyboardType="numeric"
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
            name="joinDate"
            render={({ field, fieldState }) => (
              <DateInput
                withBorder
                label={"Tanggal Masuk Pendidikan"}
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
              />
            )}
          />
          <TouchableWithoutFeedback
            onPress={() => setMasihBersekolah((prev) => !prev)}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Checkbox selected={masihBersekolah} />
              <Typography fontFamily="Poppins-Regular" fontSize={12}>
                Saya masih bersekolah disini
              </Typography>
            </View>
          </TouchableWithoutFeedback>
          <Controller
            control={control}
            name="graduationDate"
            render={({ field, fieldState }) => (
              <DateInput
                withBorder
                label={"Tanggal Lulus Pendidikan"}
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
                disabled={masihBersekolah}
              />
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
                  placeholder="Masukan Deskripsi selama di sekolah"
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

          <View style={{ marginTop: 5 }}>
            <UploadFile
              label={`Ijazah${fileIjazah ? "-" + fileIjazah?.name : ""}`}
              file={fileIjazah}
              setFile={setFileIjazah}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <UploadFile
              label={`Transkip/Nilai Akhir${
                fileTranskrip ? "-" + fileTranskrip?.name : ""
              }`}
              file={fileTranskrip}
              setFile={setFileTranskrip}
            />
          </View>
        </View>
        <Button
          style={{ marginTop: 20 }}
          disabled={!formState.isValid || creteEducationHistory.isPending}
          onPress={handleLoginMutation}
        >
          {creteEducationHistory.isPending ? (
            <Loader color="white" />
          ) : (
            "Simpan"
          )}
        </Button>
      </ScrollView>
    </View>
  );
}
