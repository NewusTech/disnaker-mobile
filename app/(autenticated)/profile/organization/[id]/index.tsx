import { Checkbox } from "@/components/checkBox";
import { IconCalender } from "@/components/icons/IconCalender";
import Appbar from "@/components/ui/appBar";
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/inputDate";
import Loader from "@/components/ui/loader";
import TextInput from "@/components/ui/textInput";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { formatDateYMD } from "@/constants/dateTime";
import { useAppTheme } from "@/context/theme-context";
import {
  useGetOrganizationById,
  useUpdateOrganizationHistory,
} from "@/services/user";
import { userOrganization, userOrganizationForm } from "@/validation";
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

  const editor = useEditorBridge({
    autofocus: false,
    avoidIosKeyboard: true,
    initialContent: "Start editing!",
  });

  const params = useLocalSearchParams<{ id: string }>();
  const getOrganizationHistoryById = useGetOrganizationById(params.id);
  const organization = getOrganizationHistoryById.data?.data;

  const { control, handleSubmit, formState, setValue, watch } =
    useForm<userOrganizationForm>({
      defaultValues: {
        joinDate: new Date(),
        leaveDate: new Date(),
        isCurrently: false,
      },
      resolver: zodResolver(userOrganization),
      mode: "all",
    });

  const updateOrganizationHistory = useUpdateOrganizationHistory();

  const handleLoginMutation = handleSubmit(async (data) => {
    const htmlValue = await editor.getHTML();
    updateOrganizationHistory.mutate(
      {
        data: {
          ...data,
          isCurrently: data.isCurrently ? ("true" as any) : ("false" as any),
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
            text1: "Update Organisasi History Berhasil!",
            text2: response.message,
          });
          router.dismiss();
        },
        onError: (reponse) => {
          console.error(reponse);
          Toast.show({
            type: "error",
            text1: "Update Organisasi History Gagal!",
            text2: reponse.response?.data.message,
          });
        },
      }
    );
  });

  const masihBerorganisasi = watch("isCurrently");
  useEffect(() => {
    if (masihBerorganisasi) setValue("leaveDate", new Date());
  }, [masihBerorganisasi]);

  useEffect(() => {
    if (!organization) return;
    setValue("desc", organization?.desc);
    setValue("isCurrently", organization?.isCurrently === "true");
    setValue("joinDate", new Date(organization?.joinDate));
    setValue("leaveDate", new Date(organization?.leaveDate || 0));
    setValue("organizationName", organization?.organizationName);
    setValue("position", organization?.name);
    editor.setContent(organization.desc);
  }, [organization]);

  return (
    <View backgroundColor="white" style={{ flex: 1 }}>
      <Appbar
        title={"Edit Organisasi"}
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
          Note : Inputkan nama Organisasi kamu dengan benar
        </Typography>
        <View style={{ marginTop: 20, gap: 20 }}>
          <Controller
            control={control}
            name="organizationName"
            render={({ field, fieldState }) => (
              <TextInput
                label="Nama Organisasi"
                placeholder="Masukan Organisasi"
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
            name="position"
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
            name="joinDate"
            render={({ field, fieldState }) => (
              <DateInput
                withBorder
                label={"Tanggal Masuk Organisasi"}
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
                    Saya masih Berorganisasi disini
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
                label={"Tanggal Selesai Organisasi"}
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
                disabled={masihBerorganisasi}
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
        </View>
        <Button
          style={{ marginTop: 20 }}
          disabled={!formState.isValid || updateOrganizationHistory.isPending}
          onPress={handleLoginMutation}
        >
          {updateOrganizationHistory.isPending ? (
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
