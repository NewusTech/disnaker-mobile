import { IconBookmarks } from "@/components/icons/IconBookmarks";
import { IconCaretDown } from "@/components/icons/IconCeretDown";
import { SelectInput } from "@/components/selectInput";
import Appbar from "@/components/ui/appBar";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import TextInput from "@/components/ui/textInput";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { dataLinkPendukung } from "@/constants";
import { useAppTheme } from "@/context/theme-context";
import { usePostLiks } from "@/services/user";
import { userLink, userLinkForm } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function index() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const { control, handleSubmit, formState, setValue } = useForm<userLinkForm>({
    defaultValues: {},
    resolver: zodResolver(userLink),
    mode: "all",
  });

  const postUserLink = usePostLiks();

  const handleLoginMutation = handleSubmit((data) => {
    postUserLink.mutate(data, {
      onSuccess: async (response) => {
        Toast.show({
          type: "success",
          text1: "Tamabah Link Pendukung berhasil!",
          text2: response.message,
        });
        router.dismiss();
      },
      onError: (reponse) => {
        console.error(reponse);
        Toast.show({
          type: "error",
          text1: "Tamabah Link Pendukung gagal!",
          text2: reponse.response?.data.message,
        });
      },
    });
  });

  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Tambah Link Pendukung"}
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
          Note : Inputkan Link Pendukung kamu dengan benar
        </Typography>
        <View style={{ marginTop: 20, gap: 5 }}>
          <Controller
            control={control}
            name="linkType"
            render={({ field, fieldState }) => (
              <SelectInput
                label="Jenis Link"
                data={dataLinkPendukung}
                placeholder="Pilih link pendukung"
                onSelect={(dataItem: any, index: any) =>
                  field.onChange(dataItem.title)
                }
                value={field.value}
                trailingIcon={<IconCaretDown />}
                leadingIcon={
                  <Image
                    style={{ width: 18, height: 18 }}
                    source={
                      dataLinkPendukung.find((f) => f.title === field.value)
                        ?.image || require("@/assets/images/www.png")
                    }
                  />
                }
                padding={12}
                borderRadius={15}
              />
            )}
          />
          <Controller
            control={control}
            name="link"
            render={({ field, fieldState }) => (
              <TextInput
                label="Link"
                placeholder="Url"
                keyboardType="url"
                borderRadius={17}
                color="primary-50"
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          marginBottom: insets.bottom + 20,
        }}
      >
        <Button
          style={{ marginTop: 10, marginHorizontal: 20 }}
          disabled={!formState.isValid || postUserLink.isPending}
          onPress={handleLoginMutation}
        >
          {postUserLink.isPending ? <Loader color="white" /> : "Simpan"}
        </Button>
      </View>
    </View>
  );
}
