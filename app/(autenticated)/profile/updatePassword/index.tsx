import Appbar from "@/components/ui/appBar";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import TextInput from "@/components/ui/textInput";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useUserUpdatePassword } from "@/services/user";
import { useAuthProfile } from "@/store/userStore";
import { userUpdatePassword, userUpdatePasswordForm } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function index() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const user = useAuthProfile();

  const { control, handleSubmit, formState, setValue, watch, setError } =
    useForm<userUpdatePasswordForm>({
      defaultValues: {},
      resolver: zodResolver(userUpdatePassword),
      mode: "all",
    });

  const postUpdatePassword = useUserUpdatePassword();

  const handleMutation = handleSubmit((data) => {
    postUpdatePassword.mutate(
      {
        data: data,
        user_slug: user?.UserProfile.slug || "",
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

  const newPassword = watch("newPassword");
  const confPassword = watch("confirmNewPassword");
  useEffect(() => {
    if (newPassword !== confPassword) {
      setError("confirmNewPassword", {
        message: "Password Baru dan konfirmasi password tidak sama",
      });
    } else {
      setError("confirmNewPassword", {
        message: "",
      });
    }
  }, [newPassword, confPassword]);

  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Update Password"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={{ padding: 15, paddingVertical: 20 }}
      >
        <View style={{ marginTop: 0, gap: 5 }}>
          <Controller
            control={control}
            name="oldPassword"
            render={({ field, fieldState }) => (
              <TextInput
                label="Password Lama"
                placeholder="Masukan password lama"
                borderRadius={17}
                color="primary-50"
                secureTextEntry
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="newPassword"
            render={({ field, fieldState }) => (
              <TextInput
                label="Password Baru"
                placeholder="Masukan password baru"
                borderRadius={17}
                color="primary-50"
                secureTextEntry
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmNewPassword"
            render={({ field, fieldState }) => (
              <TextInput
                label="Konfirmasi Password"
                placeholder="Masukan konfirmasi password"
                borderRadius={17}
                color="primary-50"
                secureTextEntry
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
          onPress={handleMutation}
          disabled={
            !formState ||
            postUpdatePassword.isPending ||
            newPassword !== confPassword
          }
          style={{
            marginHorizontal: 20,
          }}
        >
          {postUpdatePassword.isPending ? (
            <Loader />
          ) : (
            <Typography color="white">Simpan</Typography>
          )}
        </Button>
      </View>
    </View>
  );
}
