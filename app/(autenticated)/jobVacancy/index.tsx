import { IconNotification } from "@/components/icons";
import SectionBerdasarkanProfesi from "@/components/jobVacancy/sectionBerdasarkanProfesi";
import SectionEvent from "@/components/jobVacancy/sectionEvent";
import SectionLowonganDibutuhkanSegera from "@/components/jobVacancy/sectionLowonganDibutuhkanSegera";
import SectionLowonganPendidikan from "@/components/jobVacancy/sectionLowonganPendidikan";
import SectionRekomendasi from "@/components/jobVacancy/sectionRekomendasi";
import { SearchBox } from "@/components/ui/searchBox";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useGetProfile, useGetUserSavedVacancy } from "@/services/user";
import { useAuthActions, useAuthProfile } from "@/store/userStore";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const coreMenu: {
  title: string;
  image: any;
  params: {
    category_id: string;
  };
}[] = [
  {
    title: "Komputer",
    image: require("@/assets/images/komputer.png"),
    params: {
      category_id: "1",
    },
  },
  {
    title: "Keuangan",
    image: require("@/assets/images/keuangan.png"),
    params: {
      category_id: "2",
    },
  },
  {
    title: "Pendidikan",
    image: require("@/assets/images/pendidikan.png"),
    params: {
      category_id: "3",
    },
  },
  {
    title: "Marketing",
    image: require("@/assets/images/marketing.png"),
    params: {
      category_id: "4",
    },
  },
  {
    title: "Administrasi",
    image: require("@/assets/images/tata-usaha.png"),
    params: {
      category_id: "6",
    },
  },
  {
    title: "Sales",
    image: require("@/assets/images/sales.png"),
    params: {
      category_id: "5",
    },
  },
  {
    title: "Kesehatan",
    image: require("@/assets/images/kesehatan.png"),
    params: {
      category_id: "7",
    },
  },
  {
    title: "Semua",
    image: require("@/assets/images/semua.png"),
    params: {
      category_id: "",
    },
  },
];

export default function JobVacancy() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const getUserProfile = useGetProfile();
  const userProfile = getUserProfile.data?.data;
  const getFavorites = useGetUserSavedVacancy();
  const favorites = getFavorites.data?.data;
  const { setSavedVacancy } = useAuthActions();

  if (userProfile?.Skills.length === 0) {
    Toast.show({
      type: "info",
      text1: "Skills Kamu Kosong",
      text2: "Tambahkan Skills Kamu terlebih dahulu",
    });
    return router.replace("/(autenticated)/profile/skills");
  }

  const _favorites =
    favorites?.map((d) => {
      return {
        id: d.vacancy_id,
      };
    }) || [];

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    router.push({
      pathname: "/(autenticated)/jobVacancy/all",
      params: {
        search,
      },
    });
  };

  useEffect(() => {
    setSavedVacancy(_favorites);
  }, [getFavorites.data?.data]);

  return (
    <View backgroundColor="white">
      <ScrollView contentContainerStyle={{}}>
        <View
          backgroundColor="primary-50"
          style={{ padding: 20, paddingTop: 60, paddingBottom: 25, gap: 20 }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 10,
            }}
            onPress={() => router.push("/profile/userProfile")}
          >
            <Image
              source={
                userProfile?.UserProfile.image
                  ? { uri: userProfile.UserProfile.image }
                  : require("@/assets/images/dummy1.jpg")
              }
              style={{ width: 50, height: 50, borderRadius: 100 }}
            />
            <Typography fontSize={18} style={{}} color="white">
              Hi, {userProfile?.UserProfile.name}
            </Typography>
            <TouchableOpacity style={{ marginLeft: "auto" }} onPress={()=>router.push("/notification")}>
              <IconNotification color="white" />
            </TouchableOpacity>
          </Pressable>
          <SearchBox
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={handleSearch} // Menjalankan aksi ketika tombol search ditekan
          />
        </View>
        <View
          style={{
            flexWrap: "wrap",
            width: "100%",
            height: 220,
            gap: 10,
            padding: 10,
            rowGap: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {coreMenu.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: 87,
                flexDirection: "column",
                gap: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                router.push({
                  pathname: "/(autenticated)/jobVacancy/all",
                  params: item.params,
                })
              }
            >
              <Image source={item.image} style={{ width: 48, height: 48 }} />
              <Typography
                fontSize={13}
                style={{ textAlign: "center" }}
                color="black"
              >
                {item.title}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ gap: 20, backgroundColor: "#F5F6F8" }}>
          {/* Rekomendasi Pekerjaan */}
          <SectionRekomendasi />
          {/* Event */}
          <SectionEvent />
          {/* berdasarkan profesi */}
          <SectionBerdasarkanProfesi />
          {/* pendidikan */}
          <SectionLowonganPendidikan />
          {/* Dibutuhkan Segera */}
          <SectionLowonganDibutuhkanSegera />
        </View>
      </ScrollView>
    </View>
  );
}
