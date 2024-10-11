import { IconBookmarks } from "@/components/icons/IconBookmarks";
import { IconGraduation } from "@/components/icons/IconGraduation";
import { IconLocation } from "@/components/icons/IconLocation";
import { IconTipJar } from "@/components/icons/IconTipJar";
import Appbar from "@/components/ui/appBar";
import { SearchBox } from "@/components/ui/searchBox";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useGetVacancy } from "@/services/vacancy";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formatCurrency } from "@/constants";
import { calculateDateDifference } from "@/constants/dateTime";

export default function index() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const vacancy = useGetVacancy();

  const updateVacancyDate = (date: string) => {
    return calculateDateDifference(new Date(date || 0), new Date());
  };

  return (
    <View backgroundColor="white" style={{ flex: 1 }}>
      <Appbar
        title={"Semua Lowongan"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={vacancy.isRefetching}
            onRefresh={() => vacancy.refetch()}
            progressViewOffset={20}
          />
        }
      >
        <SearchBox placeholder="Cari Lowongan" />
        <View style={{ marginTop: 20, gap: 20 }}>
          {vacancy.data?.data.map((data, index) => (
            <Pressable
              key={index}
              style={{
                backgroundColor: Colors.white,
                borderColor: Colors["line-stroke-30"],
                borderWidth: 1,
                padding: 20,
                width: Dimensions.get("window").width - 40,
                borderRadius: 15,
                gap: 15,
              }}
              onPress={() => router.push(`/jobVacancy/${data.slug}`)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{
                    uri:
                      data.Company.imageLogo.trim() !== ""
                        ? data.Company.imageLogo
                        : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                    backgroundColor: Colors["black-10"],
                  }}
                />
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    marginLeft: 15,
                    width: "70%",
                  }}
                >
                  <Typography fontSize={17} style={{}} color="black-80">
                    {data.title}
                  </Typography>
                  <Typography
                    fontSize={15}
                    fontFamily="Poppins-Light"
                    style={{}}
                    color="black-50"
                  >
                    {data.Company.name}
                  </Typography>
                </View>
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    padding: 3,
                    marginLeft: "auto",
                  }}
                >
                  <IconBookmarks width={27} height={27} color="black-80" />
                </TouchableOpacity>
              </View>
              <View style={{ gap: 5 }}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "flex-end",
                  }}
                >
                  <IconGraduation width={20} height={20} color="black-80" />
                  <Typography fontSize={13} style={{}} color="black-80">
                    {data.EducationLevels
                      ? data?.EducationLevels.sort((a, b) => a.id - b.id)
                          .map((el) => {
                            return el.level;
                          })
                          .join("/")
                      : "-"}
                  </Typography>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "flex-end",
                  }}
                >
                  <IconTipJar width={20} height={20} color="black-80" />
                  <Typography fontSize={13} style={{}} color="black-80">
                    {formatCurrency(Number.parseInt(data.salary || "0"))}
                  </Typography>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "flex-end",
                  }}
                >
                  <IconLocation width={20} height={20} color="black-80" />
                  <Typography fontSize={13} style={{}} color="black-80">
                    {data.location || "-"}
                  </Typography>
                </View>
              </View>
              <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
                <Typography
                  fontSize={12}
                  style={{
                    padding: 7,
                    paddingHorizontal: 25,
                    backgroundColor: Colors["primary-50"],
                    borderRadius: 100,
                  }}
                  color="white"
                >
                  {data.jobType}
                </Typography>
                <Typography
                  fontSize={12}
                  style={{
                    padding: 7,
                    paddingHorizontal: 25,
                    backgroundColor: Colors["secondary-40"],
                    borderRadius: 100,
                  }}
                  color="white"
                >
                  {data.workLocation}
                </Typography>
              </View>
              <Typography
                fontSize={14}
                fontFamily="Poppins-LightItalic"
                style={{}}
                color="black-80"
              >
                Note : Update{" "}
                {updateVacancyDate(data.updatedAt) === "0 hari"
                  ? "hari ini"
                  : updateVacancyDate(data.updatedAt) + " yang lalu"}
              </Typography>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
