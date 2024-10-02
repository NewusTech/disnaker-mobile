import { Button } from "@/components/button";
import TextInput from "@/components/textInput";
import TextLink from "@/components/textLink";
import { Typography } from "@/components/typography";
import View from "@/components/view";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
        <TextInput
          label="Email"
          placeholder="Contoh@gmail.com"
          keyboardType="email-address"
          borderRadius={17}
          // value={field.value}
          // onBlur={field.onBlur}
          // onChangeText={field.onChange}
          // errorMessage={fieldState.error?.message}
        />
        <TextInput
          label="Password"
          placeholder="Kata Sandi"
          secureTextEntry
          borderRadius={17}
          // value={field.value}
          // onBlur={field.onBlur}
          // onChangeText={field.onChange}
          // errorMessage={fieldState.error?.message}
        />
        <View style={{ alignItems: "flex-end" }}>
          <TextLink
            label="Lupa Password?"
            fontSize={15}
            onPress={() => router.replace("/auth/login")}
          />
        </View>
        <Button style={{ marginTop: 10 }} onPress={()=> router.push("/home")}>Login</Button>
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
      </View>
    </View>
  );
}