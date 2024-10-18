import HistoryKartuKuning from "@/components/History/HistoryKartuKuning";
import HistoryLowongan from "@/components/History/HistoryLowongan";
import HistoryPengaduan from "@/components/History/HistoryPengaduan";
import HistoryTransmigrasi from "@/components/History/HistoryTrnasmigrasi";
import { SelectInput } from "@/components/selectInput";
import Appbar from "@/components/ui/appBar";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { RefreshControl, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function History() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const params = useLocalSearchParams<{
    tabRiwayat:
      | "Lowongan Pekerjaan"
      | "Daftar Kartu Kuning"
      | "Pengaduan"
      | "Daftar Tansmigrasi";
  }>();

  const [tabRiwayat, setTabRiwayat] = useState<
    | "Lowongan Pekerjaan"
    | "Daftar Kartu Kuning"
    | "Pengaduan"
    | "Daftar Tansmigrasi"
  >(() => (params.tabRiwayat ? params.tabRiwayat : "Lowongan Pekerjaan"));

  return (
    <View backgroundColor="white" style={{ flex: 1 }}>
      <Appbar title="Riwayat" variant="light" />
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          paddingBottom: 20,
          paddingTop: 20,
        }}
      >
        <View style={{ height: 50, width: "100%" }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                height: 50,
                borderWidth: 1,
                borderColor: Colors["primary-50"],
                borderRadius: 15,
                overflow: "hidden",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 200,
                  backgroundColor:
                    tabRiwayat === "Lowongan Pekerjaan"
                      ? Colors["primary-50"]
                      : Colors.white,
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setTabRiwayat("Lowongan Pekerjaan")}
              >
                <Typography
                  fontSize={14}
                  style={{ textAlignVertical: "center" }}
                  color={
                    tabRiwayat === "Lowongan Pekerjaan" ? "white" : "primary-50"
                  }
                >
                  Lowongan Pekerjaan
                </Typography>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 200,
                  backgroundColor:
                    tabRiwayat === "Daftar Kartu Kuning"
                      ? Colors["primary-50"]
                      : Colors.white,
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setTabRiwayat("Daftar Kartu Kuning")}
              >
                <Typography
                  fontSize={14}
                  style={{ textAlignVertical: "center" }}
                  color={
                    tabRiwayat === "Daftar Kartu Kuning"
                      ? "white"
                      : "primary-50"
                  }
                >
                  Daftar Kartu Kuning
                </Typography>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 200,
                  backgroundColor:
                    tabRiwayat === "Daftar Tansmigrasi"
                      ? Colors["primary-50"]
                      : Colors.white,
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setTabRiwayat("Daftar Tansmigrasi")}
              >
                <Typography
                  fontSize={14}
                  style={{ textAlignVertical: "center" }}
                  color={
                    tabRiwayat === "Daftar Tansmigrasi" ? "white" : "primary-50"
                  }
                >
                  Daftar Tansmigrasi
                </Typography>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 200,
                  backgroundColor:
                    tabRiwayat === "Pengaduan"
                      ? Colors["primary-50"]
                      : Colors.white,
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setTabRiwayat("Pengaduan")}
              >
                <Typography
                  fontSize={14}
                  style={{ textAlignVertical: "center" }}
                  color={tabRiwayat === "Pengaduan" ? "white" : "primary-50"}
                >
                  Pengaduan Online
                </Typography>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {tabRiwayat === "Lowongan Pekerjaan" && <HistoryLowongan />}
        {tabRiwayat === "Pengaduan" && <HistoryPengaduan />}
        {tabRiwayat === "Daftar Kartu Kuning" && <HistoryKartuKuning />}
        {tabRiwayat === "Daftar Tansmigrasi" && <HistoryTransmigrasi />}
      </View>
    </View>
  );
}
