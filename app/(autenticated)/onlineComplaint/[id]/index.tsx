import Appbar from "@/components/ui/appBar";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useGetUserComplaintById } from "@/services/user";
import { useAuthProfile } from "@/store/userStore";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const params = useLocalSearchParams<{ id: string }>();

  const getComplaint = useGetUserComplaintById(params.id);
  const detail = getComplaint.data?.data;

  return (
    <View style={{ flex: 1 }} backgroundColor="white">
      <Appbar
        title={"Detail Event"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }}>
        <View
          style={{
            padding: 20,
            width: Dimensions.get("window").width - 40,
            borderRadius: 15,
            gap: 15,
            borderWidth: 1,
            borderColor: Colors["line-stroke-30"],
            backgroundColor: Colors.white,
          }}
        >
          <View style={{ gap: 10 }}>
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
                Judul Pengaduan
              </Typography>
              <Typography
                fontSize={15}
                fontFamily="Poppins-Medium"
                color="black-80"
              >
                {detail?.title}
              </Typography>
            </View>
            <View>
              <Typography
                fontSize={13}
                fontFamily="Poppins-Light"
                color="black-80"
              >
                Deskripsi Pengaduan
              </Typography>
              <Typography
                fontSize={15}
                fontFamily="Poppins-Medium"
                color="black-80"
              >
                {detail?.desc}
              </Typography>
            </View>
          </View>
          <Typography
            style={{
              padding: 40,
              paddingVertical: 10,
              borderRadius: 100,
              backgroundColor: Colors["primary-10"],
            }}
          >
            {detail?.response ? "Balasan" : "Belum ada balasan"}
          </Typography>
          {detail?.response && (
            <Typography
              style={{
                marginTop: 10,
                borderWidth: 1,
                borderRadius: 13,
                borderColor: Colors["primary-50"],
                padding: 20,
              }}
            >
              {detail?.response}
            </Typography>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
