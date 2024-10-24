import React, { useRef, useState } from "react";
import View from "../view";
import { Typography } from "../ui/typography";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "@/context/theme-context";
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { IconBookmarks } from "../icons/IconBookmarks";
import { IconGraduation } from "../icons/IconGraduation";
import { IconTipJar } from "../icons/IconTipJar";
import { IconLocation } from "../icons/IconLocation";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { useGetVacancy, useGetVacancyCategory } from "@/services/vacancy";
import { calculateDateDifference } from "@/constants/dateTime";
import { formatCurrency } from "@/constants";
import {
  useAuthActions,
  useAuthProfile,
  useSavedVacancy,
} from "@/store/userStore";
import { IconBookmarksFill } from "../icons";
import { useUserDeleteVacancy, useUserSaveVacancy } from "@/services/user";
import Toast from "react-native-toast-message";

export default function SectionBerdasarkanProfesi() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const user = useAuthProfile();
  const getCategorys = useGetVacancyCategory();

  const dataSavedVacancy = useSavedVacancy();
  const { setSavedVacancy } = useAuthActions();

  const saveVacancy = useUserSaveVacancy();
  const unsaveVacancy = useUserDeleteVacancy();

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

  const getProfesion = getCategorys.data?.data.find(
    (f) => f.name == user?.UserProfile.department
  )?.id;

  const getVacancy = useGetVacancy(
    getProfesion ? `category_id=${getProfesion}` : ""
  );

  const updateVacancyDate = (date: string) => {
    return calculateDateDifference(new Date(date || 0), new Date());
  };

  const visible = useSharedValue<boolean>(false);

  const flatListRef = useRef<FlatList>(null);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withDelay(
          100,
          withSpring(visible.value ? -200 : 0, {
            damping: 20,
          })
        ),
      },
    ],
  }));
  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withDelay(
          100,
          withSpring(visible.value ? -200 : 0, {
            damping: 20,
          })
        ),
      },
    ],
  }));

  // Scroll handler for FlatList
  const scrollHandler = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = Math.round(e.nativeEvent.contentOffset.x);
    const velocityX = Math.round(e.nativeEvent.velocity?.x || 0);
    if (offsetX > 1) {
      visible.value = true;
    }
    if (offsetX <= 0) {
      visible.value = false;
    }
    // console.log(offsetX, "offset");
    // console.log(velocityX, "velocity");
  };

  return (
    <View
      backgroundColor="white"
      style={{
        paddingVertical: 20,
        gap: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 342,
      }}
    >
      <Animated.View
        style={[
          {
            width: 189,
            height: 280,
            backgroundColor: Colors["primary-50"],
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            gap: 15,
            paddingVertical: 20,
            position: "absolute",
            left: 0,
          },
          animatedStyle,
        ]}
      >
        <Typography fontSize={17} style={{ textAlign: "center" }} color="white">
          Berdasarkan Profesimu
        </Typography>
        <Image
          source={require("@/assets/images/ilustrasi-profesi.png")}
          style={{ width: 92, height: 92 }}
        />
        <Pressable
          style={{
            backgroundColor: Colors.transparent,
            borderWidth: 1,
            borderColor: Colors.white,
            padding: 10,
            paddingHorizontal: 20,
            borderRadius: 100,
            marginTop: "auto",
          }}
          onPress={() =>
            router.push({
              pathname: "/(autenticated)/jobVacancy/all",
              params: {
                category_id: getProfesion,
              },
            })
          }
        >
          <Typography fontSize={12} color="white">
            Lihat Semuanya
          </Typography>
        </Pressable>
      </Animated.View>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={scrollHandler}
        data={getVacancy.data?.data}
        horizontal
        renderItem={({ item }) => {
          const isSaved = dataSavedVacancy.some((d) => d.id === item.id);
          return (
            <Pressable
              style={({ pressed }) => [
                {
                  padding: 20,
                  width: 342,
                  borderRadius: 15,
                  gap: 10,
                  borderWidth: 1,
                  height: 280,
                  borderColor: pressed
                    ? Colors["primary-50"]
                    : Colors["line-stroke-30"],
                  backgroundColor: pressed
                    ? Colors["primary-10"]
                    : Colors.white,
                },
              ]}
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
                  onPress={() => handleSaveVacancy(item.id, isSaved)}
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
              <View style={{ gap: 5, marginTop: "auto" }}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "flex-end",
                  }}
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
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "flex-end",
                  }}
                >
                  <IconTipJar width={20} height={20} color="black-80" />
                  <Typography fontSize={13} style={{}} color="black-80">
                    {formatCurrency(Number.parseInt(item.salary || "0"))}
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
          );
        }}
        style={[{ position: "relative", left: 190 }, animatedStyle2]}
        contentContainerStyle={{
          paddingLeft: visible.value ? 60 : 20,
          paddingRight: 20,
          columnGap: 20,
          alignItems: "center",
        }}
        // snapToStart
        // decelerationRate={"normal"}
        // snapToInterval={visible.value ? 352 : 0}
      />
    </View>
  );
}
