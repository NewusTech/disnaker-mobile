import SectionBerita from "@/components/home/SectionBerita";
import SectionFasilitas from "@/components/home/SectionFasilitas";
import SectionPelatihan from "@/components/home/SectionPelatihan";
import { IconKemenker } from "@/components/icons";
import PromoItem from "@/components/promoItem";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useRouter } from "expo-router";
import React, { ForwardedRef, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import PagerView from "react-native-pager-view";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
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

const duration = 2000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const bannerRef = useRef<PagerView>(null);

  const [activePage, setActivePage] = useState<number>(0);
  const logo = useSharedValue<number>(0);

  // React.useEffect(() => {
  //   logo.value = withDelay(500, withTiming(1, { duration, easing }));
  // }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${logo.value * 360}deg` }],
  }));

  const reapetAnim = () => {
    logo.value = 0;
    logo.value = withDelay(500, withTiming(1, { duration, easing }));
  };

  return (
    <ScrollView style={{ paddingBottom: 90, backgroundColor: Colors.white }}>
      <View
        backgroundColor="primary-50"
        style={{
          height: "auto",
          paddingTop: 50,
          paddingBottom: 10,
          flexDirection: "column",
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableWithoutFeedback onPress={reapetAnim}>
          <Animated.View style={[animatedStyle]}>
            <Image
              source={require("@/assets/images/logo_tanggamus.png")}
              style={{ width: 54, height: 74 }}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <Typography
          fontFamily="Poppins-Medium"
          fontSize={20}
          style={{ textAlign: "center", width: "80%" }}
          color="white"
        >
          Selamat datang di Aplikasi Disnaker Tanggamus
        </Typography>
      </View>
      {/* <Animated.FlatList
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        data={coreMenu}
        renderItem={({ item }) => (
          <Animated.View style={{ margin: 10 }}>
            <Pressable
              style={({ pressed }) => [
                {
                  borderWidth: 1,
                  borderColor: Colors["primary-50"],
                  backgroundColor: pressed
                    ? Colors["primary-50"]
                    : Colors.transparent,
                  borderRadius: 15,
                  width: Dimensions.get("window").width / 2 - 30,
                  padding: 10,
                  height: "auto",
                  aspectRatio: 1 / 1,
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  rowGap: 10,
                },
              ]}
              onPress={() => router.push(item.link)}
            >
              {({ pressed }) => (
                <>
                  <Image
                    source={item.image}
                    style={{ width: 60, height: 60 }}
                  />
                  <Typography
                    fontSize={16}
                    style={{
                      textAlign: "center",
                    }}
                    color={pressed ? "white" : "primary-50"}
                  >
                    {item.title}
                  </Typography>
                </>
              )}
            </Pressable>
          </Animated.View>
        )}
        style={{ width: "100%", marginTop: 10 }}
        contentContainerStyle={{ alignItems: "center" }}
      /> */}

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
