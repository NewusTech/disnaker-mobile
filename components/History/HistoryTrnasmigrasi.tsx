import React, { useState } from "react";
import { DataItem, SelectInput } from "../selectInput";
import View from "../view";
import { IconCaretDown } from "../icons/IconCeretDown";
import { Dimensions, FlatList, Pressable, RefreshControl } from "react-native";
import { useGetUserTransmigration } from "@/services/user";
import Separator from "../ui/separator";
import { Typography } from "../ui/typography";
import { formatDate } from "@/constants/dateTime";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "@/context/theme-context";
import LottieView from "lottie-react-native";

export default function HistoryTransmigrasi() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const [filter, setFilter] = useState("Semua");

  const dataFilter: DataItem[] = [
    { title: "Semua" },
    { title: "Proses" },
    { title: "Diterima" },
    { title: "Pengajuan" },
    { title: "Ditutup" },
  ];

  const handleSelectFilter = (selectedItem: DataItem, index: number) => {
    setFilter(selectedItem.title as string);
  };

  const handleChangeBgColor = (status: string) => {
    if (status === "Pengajuan") return "#656565";
    if (status === "Proses") return Colors["primary-50"];
    if (status === "Diterima") return Colors["success-60"];
    return Colors["error-60"];
  };

  const getUserTransmigration = useGetUserTransmigration();
  const transmigration = getUserTransmigration.data?.data.filter((f) =>
    filter !== "Semua" ? f.status === filter : true
  );

  return (
    <View style={{ marginTop: 20 }}>
      <SelectInput
        data={dataFilter}
        value={filter}
        onSelect={handleSelectFilter}
        trailingIcon={<IconCaretDown />}
        placeholder="pilih status"
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={getUserTransmigration.isRefetching}
            onRefresh={() => getUserTransmigration.refetch()}
            progressViewOffset={20}
          />
        }
        data={transmigration}
        renderItem={({ item }) => (
          <Pressable
            style={{
              padding: 20,
              width: Dimensions.get("window").width - 40,
              borderRadius: 15,
              gap: 15,
              borderWidth: 1,
              borderColor: Colors["line-stroke-30"],
              backgroundColor: Colors.white,
            }}
            onPress={() =>
              router.push({
                pathname: "/(autenticated)/transmigrationApplication/[id]",
                params: {
                  id: item.id,
                },
              })
            }
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
                  {item.submissionNumber}
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
                  {item.User.UserProfile.name}
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
                  {item.User.UserProfile.nik}
                </Typography>
              </View>
            </View>
            <Separator />
            <Typography
              fontSize={13}
              fontFamily="Poppins-Light"
              style={{ textAlign: "center" }}
              color="black-80"
            >
              Tanggal Dibuat : {formatDate(new Date(item.createdAt || 0))}
            </Typography>
            <Typography
              fontSize={12}
              style={{
                padding: 7,
                paddingHorizontal: 25,
                paddingVertical: 12,
                backgroundColor: handleChangeBgColor(item.status),
                borderRadius: 100,
                textAlign: "center",
              }}
              color="white"
            >
              {item.status}
            </Typography>
          </Pressable>
        )}
        style={{ marginTop: 20 }}
        contentContainerStyle={{
          rowGap: 20,
          paddingBottom: 90,
        }}
      />
      {getUserTransmigration.isError ||
        (transmigration?.length === 0 && (
          <>
            <LottieView
              source={require("@/assets/lottie/Animation-Empty.json")}
              style={{ width: "100%", height: 200 }}
              autoPlay
              loop={true}
            />
            <Typography style={{ textAlign: "center" }}>
              Belum ada Transmigrasi yang di ajukan
            </Typography>
          </>
        ))}
    </View>
  );
}
