import SecctionHeader from "@/components/home/SecctionHeader";
import SectionBerita from "@/components/home/SectionBerita";
import SectionFasilitas from "@/components/home/SectionFasilitas";
import SectionPelatihan from "@/components/home/SectionPelatihan";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type coreMenu = {
  title: string;
  image: any;
  link: any;
};

const coreMenu1: coreMenu[] = [
  {
    title: "Lowongan Pekerjaan",
    image: require("@/assets/images/checklist.png"),
    link: "/jobVacancy",
  },
  {
    title: "Daftar Kartu Kuning",
    image: require("@/assets/images/credit-card.png"),
    link: "/registerYellowCard",
  },
  {
    title: "Daftar Transmigrasi",
    image: require("@/assets/images/data.png"),
    link: "/transmigrationApplication",
  },
  {
    title: "Pengaduan Online",
    image: require("@/assets/images/contract.png"),
    link: "/onlineComplaint",
  },
];

const coreMenu2: coreMenu[] = [
  {
    title: "Pelatihan",
    image: require("@/assets/images/teacher.png"),
    link: "/training",
  },
  {
    title: "Konsultasi",
    image: require("@/assets/images/call.png"),
    link: "/consultation",
  },
  {
    title: "Sertifikasi",
    image: require("@/assets/images/stamp.png"),
    link: "/certification",
  },
  {
    title: "Informasi",
    image: require("@/assets/images/information.png"),
    link: "/information",
  },
];

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  return (
    <ScrollView style={{ paddingBottom: 90, backgroundColor: Colors.white }}>
      <SecctionHeader />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "auto",
          gap: 10,
          padding: 10,
          rowGap: 30,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {coreMenu1.map((item, index) => (
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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "auto",
          gap: 10,
          padding: 10,
          rowGap: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {coreMenu2.map((item, index) => (
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
      <SectionBerita />
      <SectionPelatihan />
      <SectionFasilitas />
    </ScrollView>
  );
}
