import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppTheme } from "@/context/theme-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Appbar from "@/components/ui/appBar";
import { Typography } from "@/components/ui/typography";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { useGetConsultationById } from "@/services/consultation";
import Separator from "@/components/ui/separator";
import { formatDate } from "@/constants/dateTime";

export default function DetailNews() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ slug: string }>();

  const getConsultation = useGetConsultationById(params.slug);
  const detail = getConsultation.data?.data;

  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Detail Konsultasi"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Typography fontFamily="Poppins-Medium" fontSize={20}>
          Career Fair Tanggamus 2024
        </Typography>
        <Typography fontFamily="Poppins-Light" fontSize={14}>
          23 Februari 2024
        </Typography>
        <Image
          source={{ uri: detail?.image }}
          style={{
            width: "100%",
            height: 150,
            marginTop: 20,
            borderRadius: 15,
          }}
        />
        <Typography fontSize={18} style={{ marginTop: 20 }}>
          Deskripsi
        </Typography>
        <RenderHTML
          systemFonts={[...defaultSystemFonts, "Poppins-Regular"]}
          contentWidth={Dimensions.get("screen").width - 48}
          source={{
            html: detail?.desc || "<p>Hello World</p>",
          }}
        />
        <Separator style={{ marginVertical: 20 }} />

        <View style={{ gap: 10 }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography fontSize={15} fontFamily="Poppins-Light" style={{}}>
              Nama Lembaga/Instansi
            </Typography>
            <Typography fontSize={16} fontFamily="Poppins-Medium" style={{}}>
              {detail?.Company.name || "-"}
            </Typography>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography fontSize={15} fontFamily="Poppins-Light" style={{}}>
              Kategori
            </Typography>
            <Typography fontSize={16} fontFamily="Poppins-Medium" style={{}}>
              {detail?.VacancyCategory.name || "-"}
            </Typography>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography fontSize={15} fontFamily="Poppins-Light" style={{}}>
              Kouta Peserta
            </Typography>
            <Typography fontSize={16} fontFamily="Poppins-Medium" style={{}}>
              {detail?.quota || "-"}
            </Typography>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography fontSize={15} fontFamily="Poppins-Light" style={{}}>
              Tempat
            </Typography>
            <Typography fontSize={16} fontFamily="Poppins-Medium" style={{}}>
              {detail?.location || "-"}
            </Typography>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography fontSize={15} fontFamily="Poppins-Light" style={{}}>
              Jam Mulai
            </Typography>
            <Typography fontSize={16} fontFamily="Poppins-Medium" style={{}}>
              {detail?.time || "-"}
            </Typography>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography fontSize={15} fontFamily="Poppins-Light" style={{}}>
              Tanggal Mulai
            </Typography>
            <Typography fontSize={16} fontFamily="Poppins-Medium" style={{}}>
              {formatDate(new Date(detail?.startDate || 0))}
            </Typography>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography fontSize={15} fontFamily="Poppins-Light" style={{}}>
              No WhatsApp :
            </Typography>
            <Typography fontSize={16} fontFamily="Poppins-Medium" style={{}}>
              {detail?.phoneNumber || "-"}
            </Typography>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography fontSize={15} fontFamily="Poppins-Light" style={{}}>
              Link Pendaftaran :
            </Typography>
            <Typography
              fontSize={16}
              fontFamily="Poppins-Medium"
              style={{ textDecorationLine: "underline" }}
            >
              {detail?.regisLink || "-"}
            </Typography>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}