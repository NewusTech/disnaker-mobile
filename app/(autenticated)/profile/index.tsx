import { IconPencilLine } from "@/components/icons/IconPencilLine";
import SectionKerja from "@/components/Profile/SectionKerja";
import SectionLinkPendukung from "@/components/Profile/SectionLinkPendukung";
import SectionOrganisasi from "@/components/Profile/SectionOrganisasi";
import SectionPendidikan from "@/components/Profile/SectionPendidikan";
import SectionSertificate from "@/components/Profile/SectionSertificate";
import SectionSkill from "@/components/Profile/SectionSkill";
import SectionTentang from "@/components/Profile/SectionTentang";
import Appbar from "@/components/ui/appBar";
import { Button } from "@/components/ui/button";
import Separator from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function index() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Profile Saya"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={{ padding: 15, paddingVertical: 20 }}
      >
        <LinearGradient
          colors={["#2F55D4", "#93278F"]}
          start={{ x: 1, y: 0.5 }}
          style={{
            height: "auto",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
            overflow: "hidden",
            borderRadius: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Image
              source={require("@/assets/images/dummy1.jpg")}
              style={{ width: 60, height: 60, borderRadius: 100 }}
            />
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                marginLeft: 15,
              }}
            >
              <Typography fontSize={18} style={{}} color="white">
                Irsyad Abi Izzulhaq
              </Typography>
              <Typography
                fontSize={15}
                fontFamily="Poppins-Light"
                style={{}}
                color="white"
              >
                irsyadabiizzulhaq@gmail.com
              </Typography>
            </View>
          </View>
          <Separator style={{ marginVertical: 20 }} />
          <View style={{ gap: 10, width: "100%" }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Typography
                fontSize={15}
                fontFamily="Poppins-Light"
                style={{}}
                color="white"
              >
                Tanggal Lahir
              </Typography>
              <Typography
                fontSize={16}
                fontFamily="Poppins-Medium"
                style={{}}
                color="white"
              >
                10-10-10
              </Typography>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Typography
                fontSize={15}
                fontFamily="Poppins-Light"
                style={{}}
                color="white"
              >
                Jenis Kelamin
              </Typography>
              <Typography
                fontSize={16}
                fontFamily="Poppins-Medium"
                style={{}}
                color="white"
              >
                Laki-Laki
              </Typography>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Typography
                fontSize={15}
                fontFamily="Poppins-Light"
                style={{}}
                color="white"
              >
                Nomor WhatApp
              </Typography>
              <Typography
                fontSize={16}
                fontFamily="Poppins-Medium"
                style={{}}
                color="white"
              >
                +62895640417123
              </Typography>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Typography
                fontSize={15}
                fontFamily="Poppins-Light"
                style={{}}
                color="white"
              >
                Pendidikan Terakhir
              </Typography>
              <Typography
                fontSize={16}
                fontFamily="Poppins-Medium"
                style={{}}
                color="white"
              >
                S1 Informatika
              </Typography>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Typography
                fontSize={15}
                fontFamily="Poppins-Light"
                style={{}}
                color="white"
              >
                Lokasi Terkini
              </Typography>
              <Typography
                fontSize={16}
                fontFamily="Poppins-Medium"
                style={{}}
                color="white"
              >
                Tanjung Karang, Kota Bandar Lampung
              </Typography>
            </View>
            <Pressable
              style={{
                flexDirection: "row",
                width: "100%",
                backgroundColor: Colors.white,
                padding: 15,
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                borderRadius: 100,
              }}
              onPress={() => router.push("/profile/editProfile")}
            >
              <IconPencilLine />
              <Typography color="primary-50">Ubah Profile</Typography>
            </Pressable>
          </View>
        </LinearGradient>
        {/* Tentang Saya */}
        <SectionTentang />
        {/* Pendidikan */}
        <SectionPendidikan />
        {/* Organisasi */}
        <SectionOrganisasi />
        {/* Pengalaman Kerja */}
        <SectionKerja />
        {/* Skill */}
        <SectionSkill />
        {/* sertificate */}
        <SectionSertificate />
        {/* Link Pendukung */}
        <SectionLinkPendukung />
      </ScrollView>
    </View>
  );
}
