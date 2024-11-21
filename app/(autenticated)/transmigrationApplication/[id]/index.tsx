import Appbar from "@/components/ui/appBar";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useGetUserTransmigrationById } from "@/services/user";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Modal, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Pdf from "react-native-pdf";
import { Button } from "@/components/ui/button";
import { IconDownload } from "@/components/icons";
import downloadFile from "@/helpers/downloadFile";
import Toast from "react-native-toast-message";
import AnggotaJiwa from "@/components/tansmigrationApplication/AnggotaJiwa";
import { API_URL } from "@/constants";
import { getAccessToken } from "@/store/userStore";

export default function index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();
  const accessToken = getAccessToken();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const params = useLocalSearchParams<{ id: string }>();

  const getTransmigration = useGetUserTransmigrationById(params.id);
  const detail = getTransmigration.data?.data;

  const handleDownloadFile = async () => {
    try {
      await downloadFile(
        `${API_URL}/transmigration/generate/${params.id}`,
        `Nota-Pengambilan-${detail?.submissionNumber}-${detail?.User.UserProfile.name}`,
        accessToken || ""
      );
      Toast.show({
        type: "success",
        text1: "Berhasil Mendownload Kartu Kuning",
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Gagal Mendownload Kartu Kuning",
      });
    }
  };

  return (
    <View style={{ flex: 1 }} backgroundColor="white">
      <Appbar
        title={"Detail Transmigrasi"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <View
        style={{
          flex: 1,
          paddingTop: 20,
          paddingHorizontal: 20,
          gap: 10,
          paddingBottom: 20,
        }}
      >
        {!getTransmigration.isFetching && detail?.status === "Proses" && (
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
            Note : Pengajuan{" "}
            <Typography fontFamily="Poppins-Medium" fontSize={14}>
              Transmigrasi
            </Typography>{" "}
            Anda masih dalam proses oleh pihak Disnaker. Mohon bersabar dan
            menunggu informasi selanjutnya. Terima kasih."
          </Typography>
        )}
        {!getTransmigration.isFetching && detail?.status === "Ditutup" && (
          <Typography
            fontFamily="Poppins-LightItalic"
            fontSize={14}
            style={{
              padding: 10,
              borderColor: Colors["line-stroke-30"],
              borderWidth: 1,
              borderRadius: 15,
            }}
            color="error-60"
          >
            Note : Pengajuan{" "}
            <Typography fontFamily="Poppins-Medium" fontSize={14}>
              Kartu Kuning
            </Typography>{" "}
            Anda ditolak, silahkan cek berkas anda kembali, dan lakukan
            pengajuan ulang.
          </Typography>
        )}
        {!getTransmigration.isFetching && detail?.status === "Terbit" && (
          <ScrollView style={{ flex: 1 }}>
            <View
              style={{
                width: Dimensions.get("window").width - 40,
                borderRadius: 15,
                gap: 15,
                borderWidth: 1,
                borderColor: Colors["line-stroke-30"],
                backgroundColor: Colors.white,
                paddingBottom: 20,
              }}
            >
              <View style={{ gap: 10, padding: 20 }}>
                <View>
                  <Typography
                    fontSize={13}
                    fontFamily="Poppins-Light"
                    color="black-80"
                  >
                    No Pengajuan
                  </Typography>
                  <Typography
                    fontSize={15}
                    fontFamily="Poppins-Medium"
                    color="black-80"
                  >
                    {detail?.submissionNumber}
                  </Typography>
                </View>
                <View>
                  <Typography
                    fontSize={13}
                    fontFamily="Poppins-Light"
                    color="black-80"
                  >
                    Nama
                  </Typography>
                  <Typography
                    fontSize={15}
                    fontFamily="Poppins-Medium"
                    color="black-80"
                  >
                    {detail?.User.UserProfile.name}
                  </Typography>
                </View>
                <View>
                  <Typography
                    fontSize={13}
                    fontFamily="Poppins-Light"
                    color="black-80"
                  >
                    NIK
                  </Typography>
                  <Typography
                    fontSize={15}
                    fontFamily="Poppins-Medium"
                    color="black-80"
                  >
                    {detail?.User.UserProfile.nik}
                  </Typography>
                </View>
                <View>
                  <Typography
                    fontSize={13}
                    fontFamily="Poppins-Light"
                    color="black-80"
                  >
                    Alamat
                  </Typography>
                  <Typography
                    fontSize={15}
                    fontFamily="Poppins-Medium"
                    color="black-80"
                  >
                    {detail?.User.UserProfile.address}
                  </Typography>
                </View>
                <View>
                  <Typography
                    fontSize={13}
                    fontFamily="Poppins-Light"
                    color="black-80"
                  >
                    Kecamatan
                  </Typography>
                  <Typography
                    fontSize={15}
                    fontFamily="Poppins-Medium"
                    color="black-80"
                  >
                    {detail?.kecamatan}
                  </Typography>
                </View>
                <View>
                  <Typography
                    fontSize={13}
                    fontFamily="Poppins-Light"
                    color="black-80"
                  >
                    Kelurahan
                  </Typography>
                  <Typography
                    fontSize={15}
                    fontFamily="Poppins-Medium"
                    color="black-80"
                  >
                    {detail?.kelurahan}
                  </Typography>
                </View>
              </View>
              <View style={{ marginBottom: 20 }}>
                <AnggotaJiwa
                  editable={false}
                  members={detail.TransmigrationMembers.map((d) => {
                    return {
                      id: Number.parseInt(d.id.toString()),
                      familyStatus: d.familyStatus,
                      gender: d.gender,
                      name: d.name,
                      nik: d.nik,
                    };
                  })}
                />
              </View>
              <Pressable
                onPress={() => setOpenModal(true)}
                style={{ paddingHorizontal: 20 }}
              >
                <Pdf
                  trustAllCerts={false}
                  source={{
                    uri: `${API_URL}/transmigration/generate/${params.id}`,
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  }}
                  scale={2}
                  onError={(error) => {
                    console.error(error);
                  }}
                  style={{
                    flex: 1,
                    width: "100%",
                    height: 150,
                    borderColor: Colors["line-stroke-30"],
                    borderWidth: 1,
                    borderRadius: 15,
                  }}
                />
              </Pressable>
              <Button
                onPress={handleDownloadFile}
                style={{ marginHorizontal: 20 }}
              >
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <IconDownload color="white" />
                  <Typography color="white">
                    Download Nota Pengambilan
                  </Typography>
                </View>
              </Button>
            </View>
          </ScrollView>
        )}
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={openModal}
        onRequestClose={() => setOpenModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(20, 21, 17, 0.5)",
            height: "auto",
          }}
        >
          <Pdf
            trustAllCerts={false}
            source={{
              uri: `${API_URL}/transmigration/generate/${params.id}`,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }}
            onError={(error) => {
              console.error(error);
            }}
            style={{
              flex: 1,
              width: "100%",
              height: 300,
              borderColor: Colors["line-stroke-30"],
              borderWidth: 1,
            }}
          />
        </View>
      </Modal>
    </View>
  );
}
