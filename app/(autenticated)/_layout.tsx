import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { useAccessToken, useAuthActions } from "@/store/userStore";
import { useGetProfile } from "@/services/user";
import Toast from "react-native-toast-message";

export default function AuthenticatedLayout() {
  const router = useRouter();

  const accessToken = useAccessToken();

  const profileQuery = useGetProfile();

  const { setAccessToken, setProfile } = useAuthActions();

  useEffect(() => {
    if (!accessToken) {
      router.replace("/(public)/onboard");
    }
  }, [accessToken, router]);

  useEffect(() => {
    if (profileQuery.data) {
      setProfile(profileQuery.data.data);
      if (profileQuery.data.data.UserProfile.nik === null) {
        Toast.show({
          type: "info",
          text1: "Hampir selesai",
          text2: "Isi Profil Kamu terlebih dahulu",
        });
        return router.push("/profile/editProfile");
      }
    } else if (profileQuery.error) {
      setAccessToken(null);
      router.replace("/(public)/onboard");
    }
  }, [router, setAccessToken, setProfile, profileQuery.data]);

  if (!accessToken) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "ios",
      }}
    />
  );
}
