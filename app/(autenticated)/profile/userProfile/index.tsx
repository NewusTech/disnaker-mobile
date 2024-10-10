import { IconPencilLine } from "@/components/icons/IconPencilLine";
import SectionKerja from "@/components/Profile/SectionKerja";
import SectionLinkPendukung from "@/components/Profile/SectionLinkPendukung";
import SectionOrganisasi from "@/components/Profile/SectionOrganisasi";
import SectionPendidikan from "@/components/Profile/SectionPendidikan";
import SectionSertificate from "@/components/Profile/SectionSertificate";
import SectionSkill from "@/components/Profile/SectionSkill";
import SectionTentang from "@/components/Profile/SectionTentang";
import Appbar from "@/components/ui/appBar";
import Separator from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useGetProfile } from "@/services/user";
import { useAuthActions, useAuthProfile } from "@/store/userStore";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, Pressable, RefreshControl, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function index() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const profileQuery = useGetProfile();

  const { setAccessToken, setProfile } = useAuthActions();

  const userProfile = useAuthProfile();

  const shrotEdu = userProfile?.UserEducationHistories?.sort(
    (a: any, b: any) => b.educationLevel_id - a.educationLevel_id
  );
  // const lastEdu = shrotEdu ? shrotEdu[0] :""

  console.log(shrotEdu);

  useEffect(() => {
    if (profileQuery.data) {
      setProfile(profileQuery.data.data);
    } else if (profileQuery.error) {
      setAccessToken(null);
      router.replace("/(public)/onboard/final");
    }
  }, [router, setAccessToken, setProfile, profileQuery.data]);

  return (
    <View backgroundColor="white" style={{ flex: 1 }}>
      <Appbar
        title={"Profile Saya"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={{ padding: 15, paddingVertical: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={profileQuery.isRefetching}
            onRefresh={() => profileQuery.refetch()}
            progressViewOffset={20}
          />
        }
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
              source={
                userProfile?.UserProfile.image
                  ? { uri: userProfile.UserProfile.image }
                  : require("@/assets/images/dummy1.jpg")
              }
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
                {userProfile?.UserProfile.name}
              </Typography>
              <Typography
                fontSize={15}
                fontFamily="Poppins-Light"
                style={{}}
                color="white"
              >
                {userProfile?.email}
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
                {userProfile?.UserProfile.birthDate || "-"}
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
                {userProfile?.UserProfile.gender || "-"}
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
                {userProfile?.UserProfile.phoneNumber || "-"}
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
                {}
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
                {userProfile?.UserProfile.address || "-"}
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
              <Typography color="primary-50">Edit Profile</Typography>
            </Pressable>
          </View>
        </LinearGradient>
        {/* Tentang Saya */}
        <SectionTentang about={userProfile?.UserProfile.about || ""} />
        {/* Pendidikan */}
        <SectionPendidikan
          education={userProfile?.UserEducationHistories || []}
        />
        {/* Organisasi */}
        <SectionOrganisasi
          organization={userProfile?.UserOrganizations || []}
        />
        {/* Pengalaman Kerja */}
        <SectionKerja experience={userProfile?.UserExperiences || []} />
        {/* Skill */}
        <SectionSkill skills={userProfile?.Skills || []} />
        {/* sertificate */}
        <SectionSertificate />
        {/* Link Pendukung */}
        <SectionLinkPendukung linkPendukung={userProfile?.UserLinks || []} />
      </ScrollView>
    </View>
  );
}
