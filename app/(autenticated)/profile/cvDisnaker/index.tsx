import Appbar from "@/components/ui/appBar";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useRouter } from "expo-router";
import React from "react";
import Pdf from "react-native-pdf";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getAccessToken, useAuthProfile } from "@/store/userStore";
import { API_URL } from "@/constants";
import downloadFile from "@/helpers/downloadFile";
import { IconDownload } from "@/components/icons";
import { TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

export default function Index() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const accessToken = getAccessToken();
  const user = useAuthProfile();

  // Fungsi untuk menangani download ketika pengguna menekan tombol download
  const handleDownload = async () => {
    const accessToken = getAccessToken();
    const fileName = "CV_Disnaker";

    try {
      const message = await downloadFile(
        `${API_URL}/user/cv/generate/${user?.id}`,
        fileName,
        accessToken || ""
      );
      Toast.show({
        type: "success",
        text1: "Berhasil Mendownload CV",
        text2: message,
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Gagal Mendownload CV",
        text2: `${error}`,
      });
    }
  };

  return (
    <View backgroundColor="white" style={{ flex: 1 }}>
      <Appbar
        title={"Generate CV Disnaker"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <Pdf
        trustAllCerts={false}
        source={{
          uri: `${API_URL}/user/cv/generate/${user?.id}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }}
        onError={(error) => {
          console.error("Error loading PDF:", error);
        }}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          borderColor: Colors["line-stroke-30"],
          borderWidth: 1,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: insets.bottom + 50,
          right: insets.right + 20,
          gap: 10,
          flexDirection: "column",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Colors["primary-50"],
            padding: 10,
            borderRadius: 100,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
          onPress={handleDownload}
        >
          <IconDownload color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
