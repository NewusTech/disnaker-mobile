import HistoryLowongan from "@/components/History/HistoryLowongan";
import { SelectInput } from "@/components/selectInput";
import Appbar from "@/components/ui/appBar";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function History() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const [tanbRiwayat, setTanbRiwayat] = useState<
    | "Lowongan Pekerjaan"
    | "Daftar Kartu Kuning"
    | "Pengaduan"
    | "Daftar Tansmigrasi"
  >("Lowongan Pekerjaan");

  return (
    <View backgroundColor="white" style={{ flex: 1 }}>
      <Appbar title="Riwayat" variant="light" />
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: 20,
          paddingBottom: 20,
          paddingTop: 20,
        }}
      >
        <ScrollView horizontal>
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
                  tanbRiwayat === "Lowongan Pekerjaan"
                    ? Colors["primary-50"]
                    : Colors.white,
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setTanbRiwayat("Lowongan Pekerjaan")}
            >
              <Typography
                fontSize={14}
                style={{ textAlignVertical: "center" }}
                color={
                  tanbRiwayat === "Lowongan Pekerjaan" ? "white" : "primary-50"
                }
              >
                Lowongan Pekerjaan
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 200,
                backgroundColor:
                  tanbRiwayat === "Daftar Kartu Kuning"
                    ? Colors["primary-50"]
                    : Colors.white,
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setTanbRiwayat("Daftar Kartu Kuning")}
            >
              <Typography
                fontSize={14}
                style={{ textAlignVertical: "center" }}
                color={
                  tanbRiwayat === "Daftar Kartu Kuning" ? "white" : "primary-50"
                }
              >
                Daftar Kartu Kuning
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 200,
                backgroundColor:
                  tanbRiwayat === "Daftar Tansmigrasi"
                    ? Colors["primary-50"]
                    : Colors.white,
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setTanbRiwayat("Daftar Tansmigrasi")}
            >
              <Typography
                fontSize={14}
                style={{ textAlignVertical: "center" }}
                color={
                  tanbRiwayat === "Daftar Tansmigrasi" ? "white" : "primary-50"
                }
              >
                Daftar Tansmigrasi
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 200,
                backgroundColor:
                  tanbRiwayat === "Pengaduan"
                    ? Colors["primary-50"]
                    : Colors.white,
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setTanbRiwayat("Pengaduan")}
            >
              <Typography
                fontSize={14}
                style={{ textAlignVertical: "center" }}
                color={tanbRiwayat === "Pengaduan" ? "white" : "primary-50"}
              >
                Pengaduan Online
              </Typography>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {tanbRiwayat === "Lowongan Pekerjaan" && <HistoryLowongan />}
      </ScrollView>
    </View>
  );
}
