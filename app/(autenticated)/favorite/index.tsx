import { IconBookmarksFill } from "@/components/icons";
import { IconBookmarks } from "@/components/icons/IconBookmarks";
import { IconGraduation } from "@/components/icons/IconGraduation";
import { IconLocation } from "@/components/icons/IconLocation";
import { IconTipJar } from "@/components/icons/IconTipJar";
import Appbar from "@/components/ui/appBar";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { formatCurrency } from "@/constants";
import { calculateDateDifference } from "@/constants/dateTime";
import { useAppTheme } from "@/context/theme-context";
import {
  useGetProfile,
  useGetUserSavedVacancy,
  useUserDeleteVacancy,
  useUserSaveVacancy,
} from "@/services/user";
import { useAuthActions, useSavedVacancy } from "@/store/userStore";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function index() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const dataSavedVacancy = useSavedVacancy();
  const profileQuery = useGetProfile();
  const saveVacancy = useUserSaveVacancy();
  const unsaveVacancy = useUserDeleteVacancy();
  const getFavorites = useGetUserSavedVacancy();
  const favorites = getFavorites.data?.data;
  const { setSavedVacancy, setProfile } = useAuthActions();

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

  const updateVacancyDate = (date: string) => {
    return calculateDateDifference(new Date(date || 0), new Date());
  };

  useEffect(() => {
    const _favorites =
      favorites?.map((d) => {
        return {
          id: d.vacancy_id,
        };
      }) || [];
    setSavedVacancy(_favorites);
  }, [getFavorites.data?.data]);

  useEffect(() => {
    if (profileQuery.data) {
      setProfile(profileQuery.data.data);
    }
  }, [router, setProfile, profileQuery.data]);

  return (
    <View style={{ flex: 1 }} backgroundColor="white">
      <Appbar
        title={"Favorite"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <FlatList
        data={favorites}
        renderItem={({ item }) => {
          const isSaved = dataSavedVacancy.some(
            (d) => d.id === item.vacancy_id
          );
          return (
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
              onPress={() => router.push(`/jobVacancy/${item.Vacancy.slug}`)}
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
                    width: "70%",
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
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    padding: 3,
                    marginLeft: "auto",
                  }}
                  onPress={() => handleSaveVacancy(item.vacancy_id, isSaved)}
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
                    -
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
                    {formatCurrency(
                      Number.parseInt(item.Vacancy.salary || "0")
                    )}
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
                    {item.Vacancy.location}
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
                  {item.Vacancy.jobType}
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
                  {item.Vacancy.workLocation}
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
          );
        }}
        style={{ marginTop: 20 }}
        contentContainerStyle={{
          rowGap: 20,
          marginHorizontal: "auto",
          paddingBottom: 20,
        }}
      />
    </View>
  );
}
