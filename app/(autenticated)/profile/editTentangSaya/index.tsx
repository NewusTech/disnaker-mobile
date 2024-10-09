import Appbar from "@/components/ui/appBar";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import TextInput from "@/components/ui/textInput";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useGetProfile, useUpdateAbout } from "@/services/user";
import { userAbout, userAboutForm } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function index() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const profileQuery = useGetProfile();
  const user = profileQuery.data?.data;

  const { control, handleSubmit, formState, setValue, watch } =
    useForm<userAboutForm>({
      defaultValues: {
        about: user?.UserProfile.about || "",
      },
      resolver: zodResolver(userAbout),
      mode: "all",
    });

  const updateAbout = useUpdateAbout();

  const handleLoginMutation = handleSubmit((data) => {
    updateAbout.mutate(
      { data, slug: user?.UserProfile.slug || "" },
      {
        onSuccess: async (response) => {
          Toast.show({
            type: "success",
            text1: "Update About berhasil!",
            text2: response.message,
          });
          router.dismiss();
        },
        onError: (reponse) => {
          console.error(reponse);
          Toast.show({
            type: "error",
            text1: "Update About gagal!",
            text2: reponse.response?.data.message,
          });
        },
      }
    );
  });

  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Edit Tentang Saya"}
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
          Note : Ceritakan tentang dirimu agar peluang diproses HRD lebih tinggi
        </Typography>
        <View style={{ marginTop: 20, gap: 5 }}>
          <Controller
            control={control}
            name="about"
            render={({ field, fieldState }) => (
              <TextInput
                placeholder="Tentang saya"
                keyboardType="default"
                borderRadius={17}
                color="primary-50"
                numberOfLines={10}
                textAlignVertical="top"
                multiline={true}
                maxLength={1000}
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Typography color="black-30" style={{ textAlign: "right" }}>
            {(watch("about") || "").toString().length}/1000
          </Typography>
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
          disabled={!formState.isValid || updateAbout.isPending}
          onPress={handleLoginMutation}
        >
          {updateAbout.isPending ? <Loader color="white" /> : "Simpan"}
        </Button>
      </View>
    </View>
  );
}
