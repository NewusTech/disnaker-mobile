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
import { useGetProfile } from "@/services/user";
import { useAuthActions, useAuthProfile } from "@/store/userStore";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const coreMenu: {
  title: string;
  image: any;
  link: any;
}[] = [
  {
    title: "Komputer",
    image: require("@/assets/images/komputer.png"),
    link: "/jobVacancy",
  },
  {
    title: "Keuangan",
    image: require("@/assets/images/keuangan.png"),
    link: "",
  },
  {
    title: "Pendidikan",
    image: require("@/assets/images/pendidikan.png"),
    link: "",
  },
  {
    title: "Marketing",
    image: require("@/assets/images/marketing.png"),
    link: "",
  },
  {
    title: "Administrasi",
    image: require("@/assets/images/tata-usaha.png"),
    link: "",
  },
  {
    title: "Sales",
    image: require("@/assets/images/sales.png"),
    link: "",
  },
  {
    title: "Kesehatan",
    image: require("@/assets/images/kesehatan.png"),
    link: "",
  },
  {
    title: "Semua",
    image: require("@/assets/images/semua.png"),
    link: "/jobVacancy/all",
  },
];

export default function JobVacancy() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const userProfile = useAuthProfile();

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
            onPress={() => router.push("/profile")}
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
            <TouchableOpacity style={{ marginLeft: "auto" }}>
              <IconNotification color="white" />
            </TouchableOpacity>
          </Pressable>
          <SearchBox placeholder="Search" />
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
              onPress={() => (item.link !== "" ? router.push(item.link) : null)}
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
