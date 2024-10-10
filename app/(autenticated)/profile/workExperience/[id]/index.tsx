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
import View from "@/components/view";
import { formatDateYMD } from "@/constants/dateTime";
import { useAppTheme } from "@/context/theme-context";
import {
  useGetExperienceById,
  useUpdateExperienceHistory,
} from "@/services/user";
import { userExperience, userExperienceForm } from "@/validation";
import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function index() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const params = useLocalSearchParams<{ id: string }>();

  const editor = useEditorBridge({
    autofocus: false,
    avoidIosKeyboard: true,
    initialContent: "Start editing!",
  });

  const getExperienceById = useGetExperienceById(params.id);
  const experience = getExperienceById.data?.data;

  const { control, handleSubmit, formState, setValue, watch } =
    useForm<userExperienceForm>({
      defaultValues: {
        joinDate: new Date(),
        leaveDate: new Date(),
        isCurrently: false,
      },
      resolver: zodResolver(userExperience),
      mode: "all",
    });

  const updateExperienceHistory = useUpdateExperienceHistory();

  const handleLoginMutation = handleSubmit(async (data) => {
    const htmlValue = await editor.getHTML();
    updateExperienceHistory.mutate(
      {
        data: {
          ...data,
          isCurrently: data.isCurrently ? "true" : ("false" as any),
          desc: htmlValue,
          joinDate: formatDateYMD(data.joinDate) as any,
          leaveDate: formatDateYMD(data.leaveDate) as any,
        },
        id: params.id,
      },
      {
        onSuccess: async (response) => {
          Toast.show({
            type: "success",
            text1: "Update Pengalaman Kerja History Berhasil!",
            text2: response.message,
          });
          router.dismiss();
        },
        onError: (reponse) => {
          console.error(reponse);
          Toast.show({
            type: "error",
            text1: "Update Pengalaman Kerja History Gagal!",
            text2: reponse.response?.data.message,
          });
        },
      }
    );
  });

  const masihBekerja = watch("isCurrently");
  useEffect(() => {
    if (masihBekerja) setValue("leaveDate", new Date());
  }, [masihBekerja]);

  useEffect(() => {
    if (experience) {
      setValue("companyName", experience?.companyName);
      setValue("contractType", experience?.contractType);
      setValue("desc", experience?.desc);
      setValue("isCurrently", experience?.isCurrently === "true");
      setValue("joinDate", new Date(experience?.joinDate));
      setValue("leaveDate", new Date(experience?.leaveDate || 0));
      setValue("possition", experience?.possition);
      setValue("title", experience?.title);
      editor.setContent(experience.desc);
    }
  }, [experience]);

  return (
    <View style={{ flex: 1 }} backgroundColor="white">
      <Appbar
        title={"Edit Pengalaman Kerja"}
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
          Note : Inputkan Pengalaman Kerja kamu dengan benar
        </Typography>
        <View style={{ marginTop: 20, gap: 20 }}>
          <Controller
            control={control}
            name="companyName"
            render={({ field, fieldState }) => (
              <TextInput
                label="Nama Perusahaan"
                placeholder="Masukan Perusahaan"
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
            name="contractType"
            render={({ field, fieldState }) => (
              <SelectInput
                label="Tipe Kontrak Kerja"
                data={[
                  { title: "Full Time" },
                  { title: "Part Time" },
                  { title: "Freelance" },
                  { title: "Internship" },
                ]}
                placeholder="Pilih kontrak kerja"
                onSelect={(e) => field.onChange(e.title)}
                value={field.value}
                trailingIcon={<IconCaretDown />}
                padding={12}
                borderRadius={15}
              />
            )}
          />
          <Controller
            control={control}
            name="possition"
            render={({ field, fieldState }) => (
              <TextInput
                label="Posisi"
                placeholder="Masukan Posisi"
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
            name="title"
            render={({ field, fieldState }) => (
              <TextInput
                label="Nama Pekerjaan"
                placeholder="Masukan Nama Pekerjaan"
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
          <View style={{ marginTop: 10, gap: 5 }}>
            <Typography fontSize={16}>
              Deskripsi{" "}
              <Typography fontFamily="Poppins-Light" fontSize={14}>
                (Optional)
              </Typography>
            </Typography>
            <View
              backgroundColor="white"
              style={{
                flex: 1,
                height: 300,
                borderWidth: 1,
                borderColor: Colors["line-stroke-30"],
                marginTop: 5,
                padding: 10,
                paddingTop: 0,
                borderRadius: 15,
                overflow: "hidden",
              }}
            >
              <RichText editor={editor} />
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{
                  position: "absolute",
                  width: "100%",
                  bottom: 0,
                }}
              >
                <Toolbar editor={editor} />
              </KeyboardAvoidingView>
            </View>
          </View>
          <Controller
            control={control}
            name="joinDate"
            render={({ field, fieldState }) => (
              <DateInput
                withBorder
                label={"Tanggal Masuk Kerja"}
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
          <Controller
            control={control}
            name="isCurrently"
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
                    Saya masih bekerja disini
                  </Typography>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
          <Controller
            control={control}
            name="leaveDate"
            render={({ field, fieldState }) => (
              <DateInput
                withBorder
                label={"Tanggal Selesai Kerja"}
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
                disabled={masihBekerja}
              />
            )}
          />
        </View>
        <Button
          style={{ marginTop: 20 }}
          disabled={!formState.isValid || updateExperienceHistory.isPending}
          onPress={handleLoginMutation}
        >
          {updateExperienceHistory.isPending ? (
            <Loader color="white" />
          ) : (
            "Update"
          )}
        </Button>
        <Button
          style={{ marginTop: 20 }}
          color="error-60"
          textColor="error-60"
          variant="secondary"
        >
          Hapus
        </Button>
      </ScrollView>
    </View>
  );
}
