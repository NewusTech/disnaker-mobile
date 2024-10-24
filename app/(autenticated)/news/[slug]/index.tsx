import { View, Text, ScrollView, Dimensions } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppTheme } from "@/context/theme-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Appbar from "@/components/ui/appBar";
import { Typography } from "@/components/ui/typography";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { useGetArticleBySlug } from "@/services/article/insex";
import { formatDate } from "@/constants/dateTime";
import Separator from "@/components/ui/separator";
import Image from "@/components/ui/image/image";

export default function DetailNews() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ slug: string }>();

  const getDetail = useGetArticleBySlug(params.slug);
  const detail = getDetail.data?.data;

  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Detail Berita"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }}>
        <Typography fontFamily="Poppins-Medium" fontSize={20}>
          {detail?.title}
        </Typography>
        <Typography fontFamily="Poppins-Light" fontSize={14}>
          {formatDate(new Date(detail?.updatedAt || 0))}
        </Typography>
        <Image
          source={{ uri: detail?.image }}
          style={{
            width: "100%",
            height: 150,
            marginTop: 20,
            borderRadius: 15,
          }}
          viewAspectRatio={2 / 1}
        />
        <Separator style={{ marginVertical: 20 }} />
        <RenderHTML
          systemFonts={[...defaultSystemFonts, "Poppins-Regular"]}
          contentWidth={Dimensions.get("screen").width - 48}
          source={{
            html: detail?.desc || "",
          }}
        />
      </ScrollView>
    </View>
  );
}
