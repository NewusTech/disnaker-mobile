import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { useAccessToken, useAuthActions } from "@/store/userStore";
import { useGetProfile } from "@/services/user";

export default function AuthenticatedLayout() {
  const router = useRouter();

  const accessToken = useAccessToken();

  const profileQuery = useGetProfile();

  const { setAccessToken, setProfile } = useAuthActions();

  useEffect(() => {
    if (!accessToken) {
      router.replace("/(public)/onboard/final");
    }
  }, [accessToken, router]);

  useEffect(() => {
    if (profileQuery.data) {
      setProfile(profileQuery.data.data);
    } else if (profileQuery.error) {
      setAccessToken(null);
      router.replace("/(public)/onboard/final");
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
