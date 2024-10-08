import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import TextInput from "@/components/ui/textInput";
import TextLink from "@/components/ui/textLink";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAuthRegister } from "@/services/user";
import { PostRegisterPayload, postRegisterPayloadSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Register() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const registerMutation = useAuthRegister();

  const { control, formState, handleSubmit } = useForm<PostRegisterPayload>({
    resolver: zodResolver(postRegisterPayloadSchema),
    mode: "all",
  });

  const handleRegister = handleSubmit((payload) => {
    registerMutation.mutate(payload, {
      onSuccess: (response) => {
        Toast.show({
          type: "success",
          text1: "Register berhasil!",
          text2: "Silahkan login dengan akun yg terdaftar",
        });

        router.replace("/auth/login");
      },
      onError: (error: any) => {
        const serverErrorString = error.response?.data?.message;
        Toast.show({
          type: "error",
          text1: "Registarasi gagal",
          text2: typeof serverErrorString === "string" ? serverErrorString : "",
        });
      },
    });
  });

  return (
    <View
      backgroundColor="primary-50"
      style={{ height: "100%", paddingTop: insets.top + 30 }}
    >
      <Typography fontSize={25} color="white" style={{ textAlign: "center" }}>
        Buat Akun
      </Typography>
      <View
        backgroundColor="white"
        style={{
          height: "100%",
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          marginTop: 20,
          paddingHorizontal: 20,
          flexDirection: "column",
          gap: 15,
          paddingTop: 30,
        }}
      >
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <TextInput
              label="Nama Lengkap"
              placeholder="Don Joe"
              borderRadius={17}
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
              placeholder="Contoh@gmail.com"
              keyboardType="email-address"
              borderRadius={17}
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <TextInput
              label="Password"
              placeholder="Kata Sandi"
              secureTextEntry
              borderRadius={17}
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <View style={{ alignItems: "flex-end" }}>
          <TextLink
            label="Lupa Password?"
            fontSize={15}
            onPress={() => router.replace("/auth/login")}
          />
        </View>
        <Button
          style={{ marginTop: 10 }}
          disabled={!formState.isValid || registerMutation.isPending}
          onPress={handleRegister}
        >
          {registerMutation.isPending ? <Loader color="white" /> : "Daftar"}
        </Button>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <Typography fontSize={15}>Sudah punya akun?</Typography>
          <TextLink
            label=" Masuk"
            fontSize={15}
            onPress={() => router.replace("/auth/login")}
          />
        </View>
      </View>
    </View>
  );
}
