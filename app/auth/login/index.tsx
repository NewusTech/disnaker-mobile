import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/textInput";
import TextLink from "@/components/ui/textLink";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { DEVELOPMENT_MODE } from "@/constants";
import { useAuthActions } from "@/store/userStore";
import { useNavigation, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthLogin } from "@/services/user";
import { setItem } from "@/lib/async-storage";
import Toast from "react-native-toast-message";
import Loader from "@/components/ui/loader";
import { PostLoginPayload, postLoginPayloadSchema } from "@/validation";

export default function Login() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  // store
  const { setAccessToken } = useAuthActions();

  const loginMutation = useAuthLogin();

  const { control, handleSubmit, formState } = useForm<PostLoginPayload>({
    defaultValues: {
      email: DEVELOPMENT_MODE ? "test9@gmail.com" : "",
      password: DEVELOPMENT_MODE ? "123456" : "",
    },
    resolver: zodResolver(postLoginPayloadSchema),
    mode: "all",
  });

  const handleLoginMutation = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: async (response) => {
        setAccessToken(response.data.token);

        await setItem("accesstoken", response.data.token);
        await setItem("profile", response.data);

        Toast.show({
          type: "success",
          text1: "Login berhasil!",
          text2: "Selamat anda berhasil login",
        });

        navigation.reset({
          index: 0,
          routes: [{ name: "(autenticated)" }],
        });
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Login gagal!",
          text2: "email atau password tidak sesuai",
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
        Masuk Akun
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
          disabled={!formState.isValid || loginMutation.isPending}
          onPress={handleLoginMutation}
        >
          {loginMutation.isPending ? <Loader color="white" /> : "Login"}
        </Button>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <Typography fontSize={15}>Belum punya akun?</Typography>
          <TextLink
            label=" Daftar"
            fontSize={15}
            onPress={() => router.replace("/auth/register")}
          />
        </View>
        <Typography style={{ textAlign: "center" }}>
          Dengan masuk kesistem, Anda menyetujui{" "}
          <Typography
            color="primary-50"
            fontFamily="Poppins-Medium"
            onPress={() => router.push("/tnc")}
          >
            Syarat & Ketentuan
          </Typography>{" "}
          kami dan Anda telah membaca{" "}
          <Typography
            color="primary-50"
            fontFamily="Poppins-Medium"
            onPress={() => router.push("/pnp")}
          >
            {" "}
            Kebijakan Privasi
          </Typography>{" "}
          kami
        </Typography>
      </View>
    </View>
  );
}
