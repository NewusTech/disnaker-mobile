import React, { useState } from "react";
import View from "../view";
import { DataItem, SelectInput } from "../selectInput";
import { IconCaretDown } from "../icons/IconCeretDown";
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "@/context/theme-context";
import { Typography } from "../ui/typography";
import { IconGraduation } from "../icons/IconGraduation";
import { IconTipJar } from "../icons/IconTipJar";
import { IconLocation } from "../icons/IconLocation";
import Separator from "../ui/separator";
import { Pressable } from "react-native";
import { useUserHistoryApplication } from "@/services/user";
import { formatCurrency } from "@/constants";
import { formatDate } from "@/constants/dateTime";

export default function HistoryLowongan() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const [filter, setFilter] = useState("Semua");

  const getHistory = useUserHistoryApplication();

  const dataFilter: DataItem[] = [
    { title: "Semua" },
    { title: "Dilamar" },
    { title: "Wawancara" },
    { title: "Tes" },
    { title: "Diterima" },
    { title: "Ditolak" },
  ];

  const handleSelectFilter = (selectedItem: DataItem, index: number) => {
    setFilter(selectedItem.title as string);
  };

  const handleChangeBgColor = (status: string) => {
    if (status === "Dilamar") return "#656565";
    if (status === "Wawancara") return Colors["secondary-40"];
    if (status === "Tes") return Colors["primary-50"];
    if (status === "Diterima") return Colors["success-60"];
    return Colors["error-60"];
  };

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
        data={getHistory.data?.data.filter((f) =>
          filter !== "Semua" ? f.status === filter : true
        )}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={getHistory.isRefetching}
            onRefresh={() => getHistory.refetch()}
            progressViewOffset={20}
          />
        }
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
                pathname: `/jobVacancy/[slug]`,
                params: {
                  slug: item.Vacancy.slug,
                  applied: "true",
                },
              })
            }
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <Image
                source={require("@/assets/images/dummy1.jpg")}
                style={{ width: 50, height: 50, borderRadius: 100 }}
              />
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  marginLeft: 15,
                }}
              >
                <Typography fontSize={17} style={{}} color="black-80">
                  {item.Vacancy.title}
                </Typography>
                <Typography
                  fontSize={15}
                  fontFamily="Poppins-Light"
                  style={{}}
                  color="black-50"
                >
                  -
                </Typography>
              </View>
              {/* <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  padding: 3,
                  marginLeft: "auto",
                }}
              >
                <IconBookmarks width={27} height={27} color="black-80" />
              </TouchableOpacity> */}
            </View>
            <View style={{ gap: 5 }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconGraduation width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  -
                </Typography>
              </View>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconTipJar width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  {formatCurrency(Number.parseInt(item.Vacancy.salary || "0"))}
                </Typography>
              </View>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconLocation width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  {item.Vacancy.location}
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
              Dilamar tanggal : {formatDate(new Date(item.createdAt || 0))}
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
    </View>
  );
}
