import { IconBookmarks } from "@/components/icons/IconBookmarks";
import { IconGraduation } from "@/components/icons/IconGraduation";
import { IconLocation } from "@/components/icons/IconLocation";
import { IconTipJar } from "@/components/icons/IconTipJar";
import { SearchBox } from "@/components/ui/searchBox";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useGetVacancyRecomend } from "@/services/vacancy";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formatCurrency } from "@/constants";
import { calculateDateDifference } from "@/constants/dateTime";
import { IconBookmarksFill, IconCaretLeft } from "@/components/icons";
import { useUserDeleteVacancy, useUserSaveVacancy } from "@/services/user";
import useDebounce from "@/hooks/useDebounce";
import { useAuthActions, useSavedVacancy } from "@/store/userStore";
import Toast from "react-native-toast-message";
import LottieView from "lottie-react-native";

export default function Recomendation() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const params = useLocalSearchParams<{
    category_id: string;
    search: string;
  }>();

  const dataSavedVacancy = useSavedVacancy();
  const { setSavedVacancy } = useAuthActions();

  const [search, setSearch] = useState<string>(params.search || "");
  const searchValueDebounce = useDebounce(search, 1000);

  const saveVacancy = useUserSaveVacancy();
  const unsaveVacancy = useUserDeleteVacancy();

  const getVacancy = useGetVacancyRecomend();
  const vacancy = getVacancy.data?.data.filter((f) => {
    if (search === "") return true; // Tampilkan semua jika search kosong
    return f.title.toLowerCase().includes(searchValueDebounce.toLowerCase()); // Pencarian case-insensitive dan menggunakan substring matching
  });

  const updateVacancyDate = (date: string) => {
    return calculateDateDifference(new Date(date || 0), new Date());
  };

  const handleSaveVacancy = (vacancy_id: number, saved: boolean) => {
    if (!saved) {
      saveVacancy.mutate(
        { vacancy_id: vacancy_id.toString() },
        {
          onSuccess: (res) => {
            Toast.show({
              type: "success",
              text1: "Simpan Lowongan berhasil!",
              text2: res.message,
            });
            setSavedVacancy([...dataSavedVacancy, { id: res.data.vacancy_id }]);
          },
          onError: (res) => {
            Toast.show({
              type: "error",
              text1: "Simpan Lowongan gagal",
              text2: res.response?.data.message,
            });
            console.error(res);
          },
        }
      );
      return;
    }
    unsaveVacancy.mutate(
      { vacancy_id: vacancy_id.toString() },
      {
        onSuccess: (res) => {
          Toast.show({
            type: "success",
            text1: "Hapus Lowongan berhasil!",
            text2: res.message,
          });
          setSavedVacancy([
            ...dataSavedVacancy.filter((f) => f.id !== vacancy_id),
          ]);
        },
        onError: (res) => {
          Toast.show({
            type: "error",
            text1: "Hapus Lowongan gagal",
            text2: res.response?.data.message,
          });
          console.error(res);
        },
      }
    );
  };

  return (
    <View backgroundColor="white" style={{ flex: 1, paddingBottom: 20 }}>
      <View
        backgroundColor="primary-50"
        style={{
          width: "100%",
          flexDirection: "row",
          paddingTop: insets.top + 20,
          paddingLeft: 20,
          padding: 10,
          gap: 15,
          alignItems: "center",
        }}
      >
        <TouchableWithoutFeedback onPress={() => router.back()}>
          <View style={{ height: 24, width: 24 }}>
            <IconCaretLeft color={"white"} />
          </View>
        </TouchableWithoutFeedback>
        <SearchBox
          placeholder="Cari Lowongan"
          width={"87%"}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginTop: 20,
        }}
      >
        <Typography>Rekomendasi Lowongan</Typography>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 0 }}
        refreshControl={
          <RefreshControl
            refreshing={getVacancy.isRefetching}
            onRefresh={() => getVacancy.refetch()}
            progressViewOffset={20}
          />
        }
      >
        <View style={{ marginTop: 20, gap: 20 }}>
          {vacancy?.map((data, index) => {
            const isSaved = dataSavedVacancy.some((d) => d.id === data.id);
            return (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  {
                    borderColor: pressed
                      ? Colors["primary-50"]
                      : Colors["line-stroke-30"],
                    backgroundColor: pressed
                      ? Colors["primary-10"]
                      : Colors.white,
                    borderWidth: 1,
                    padding: 20,
                    width: Dimensions.get("window").width - 40,
                    borderRadius: 15,
                    gap: 15,
                  },
                ]}
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
                    onPress={() => handleSaveVacancy(data.id, isSaved)}
                  >
                    {isSaved ? (
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
            );
          })}
          {(!getVacancy.isFetching &&
            getVacancy.data?.data &&
            getVacancy.data.data.length === 0) ||
            (vacancy?.length === 0 && (
              <>
                <LottieView
                  source={require("@/assets/lottie/Animation-Empty.json")}
                  style={{ width: "100%", height: 200 }}
                  autoPlay
                  loop={true}
                />
                <Typography
                  fontFamily="OpenSans-LightItalic"
                  style={{
                    textAlign: "center",
                    marginVertical: "auto",
                    flex: 1,
                  }}
                >
                  Opps Sepertinya Lowongan yang diacri tidak tersedia
                </Typography>
              </>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
