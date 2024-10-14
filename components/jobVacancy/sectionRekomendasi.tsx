import React from "react";
import View from "../view";
import { Typography } from "../ui/typography";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "@/context/theme-context";
import TextLink from "../ui/textLink";
import { FlatList, Image, Pressable, TouchableOpacity } from "react-native";
import { IconBookmarks } from "../icons/IconBookmarks";
import { IconGraduation } from "../icons/IconGraduation";
import { IconTipJar } from "../icons/IconTipJar";
import { IconLocation } from "../icons/IconLocation";
import { useGetVacancyRecomend } from "@/services/vacancy";
import { useSavedVacancy } from "@/store/userStore";
import { IconBookmarksFill } from "../icons";
import { formatCurrency } from "@/constants";
import { calculateDateDifference } from "@/constants/dateTime";

export default function SectionRekomendasi() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const getRecom = useGetVacancyRecomend();
  const savedVacancy = useSavedVacancy();

  const updateVacancyDate = (date: string) => {
    return calculateDateDifference(new Date(date || 0), new Date());
  };

  return (
    <View backgroundColor="primary-20" style={{ paddingVertical: 20, gap: 10 }}>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontSize={16}>Rekomendasi Pekerjaan</Typography>
        <TextLink fontSize={14} label="Lihat Semua" />
      </View>
      {/*  */}
      <FlatList
        data={getRecom.data?.data}
        horizontal
        renderItem={({ item }) => (
          <Pressable
            style={{
              padding: 20,
              width: 342,
              borderRadius: 15,
              gap: 10,
              borderWidth: 1,
              borderColor: Colors["line-stroke-30"],
              backgroundColor: Colors.white,
              height: 280,
            }}
            onPress={() => router.push(`/jobVacancy/${item.slug}`)}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <Image
                source={{ uri: item.Company.imageLogo }}
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
                  {item.title}
                </Typography>
                <Typography
                  fontSize={15}
                  fontFamily="Poppins-Light"
                  style={{}}
                  color="black-50"
                >
                  {item.Company.name}
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
                {savedVacancy.some((d) => d.id === item.id) ? (
                  <IconBookmarksFill
                    width={27}
                    height={27}
                    color="primary-50"
                  />
                ) : (
                  <IconBookmarks width={27} height={27} color="black-80" />
                )}
              </TouchableOpacity>
            </View>
            <View style={{ gap: 5, marginTop: "auto" }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconGraduation width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  {item.EducationLevels
                    ? item?.EducationLevels.sort((a, b) => a.id - b.id)
                        .map((el) => {
                          return el.level;
                        })
                        .join("/")
                    : "-"}
                </Typography>
              </View>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconTipJar width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  {formatCurrency(Number.parseInt(item.salary || "0"))}
                </Typography>
              </View>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconLocation width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  {item.location || "-"}
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
                {item.jobType}
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
                {item.workLocation}
              </Typography>
            </View>
            <Typography
              fontSize={14}
              fontFamily="Poppins-LightItalic"
              style={{}}
              color="black-80"
            >
              Note : Update{" "}
              {updateVacancyDate(item.updatedAt) === "0 hari"
                ? "hari ini"
                : updateVacancyDate(item.updatedAt) + " yang lalu"}
            </Typography>
          </Pressable>
        )}
        style={{ marginBottom: 10 }}
        contentContainerStyle={{
          paddingLeft: 20,
          paddingRight: 20,
          columnGap: 20,
        }}
        snapToStart
        decelerationRate={"normal"}
        snapToInterval={352}
      />
    </View>
  );
}
