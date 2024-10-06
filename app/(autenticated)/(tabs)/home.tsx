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

const coreMenu: {
  title: string;
  image: any;
  link: any;
}[] = [
  {
    title: "Lowongan Pekerjaan",
    image: require("@/assets/images/checklist.png"),
    link: "/jobVacancy",
  },
  {
    title: "Daftar Kartu Kuning",
    image: require("@/assets/images/credit-card.png"),
    link: "",
  },
  {
    title: "Daftar Transmigrasi",
    image: require("@/assets/images/data.png"),
    link: "",
  },
  {
    title: "Pengaduan Online",
    image: require("@/assets/images/contract.png"),
    link: "",
  },
];

const PromoItemList = [
  {
    image: require("@/assets/images/image_1.png"),
  },
  {
    image: require("@/assets/images/image_1.png"),
  },
  {
    image: require("@/assets/images/image_1.png"),
  },
  {
    image: require("@/assets/images/image_1.png"),
  },
  {
    image: require("@/assets/images/image_1.png"),
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

  React.useEffect(() => {
    logo.value = withDelay(500, withTiming(1, { duration, easing }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${logo.value * 360}deg` }],
  }));

  const reapetAnim = () => {
    logo.value = 0;
    logo.value = withDelay(500, withTiming(1, { duration, easing }));
  };

  return (
    <ScrollView style={{ paddingBottom: 90 }}>
      <View
        backgroundColor="primary-50"
        style={{
          height: "auto",
          paddingTop: 70,
          paddingBottom: 40,
          flexDirection: "column",
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableWithoutFeedback onPress={reapetAnim}>
          <Animated.View style={[animatedStyle]}>
            <IconKemenker size={32} color="white" />
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
      <Animated.FlatList
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        data={coreMenu}
        renderItem={({ item }) => (
          <Animated.View style={{ margin: 10 }}>
            {/* Add margin to create gaps */}
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
      />
      {/* <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={PromoItemList}
        renderItem={({ item }) => (
          <PromoItem imgUrl={item.image} width={346} borderRadius={20} />
        )}
        style={{ width: "100%", marginBottom: 10, marginTop: 20 }}
        snapToStart
        decelerationRate={"normal"}
        snapToInterval={356}
        contentContainerStyle={{ gap: 10, paddingHorizontal: 20 }}
      /> */}
      <View
        style={{
          width: "100%",
          height: "auto",
          paddingHorizontal: 10,
        }}
      >
        <PagerView
          ref={bannerRef}
          style={{
            width: "100%",
            height: 160,
            paddingVertical: 10,
            marginLeft: 10,
            marginTop: 10,
            // backgroundColor: "red",
          }}
          initialPage={0}
          onPageSelected={(e) => setActivePage(e.nativeEvent.position)}
        >
          {PromoItemList.map((data, index) => (
            <PromoItem
              key={index}
              imgUrl={data.image}
              width={350}
              borderRadius={20}
            />
          ))}
        </PagerView>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          marginBottom: 20,
        }}
      >
        {PromoItemList.map((_, index) => {
          return (
            <Pressable
              key={index}
              style={{
                width: 10,
                height: 10,
                borderRadius: 100,
                backgroundColor:
                  activePage === index
                    ? Colors["primary-50"]
                    : Colors["primary-30"],
              }}
              onPress={() => bannerRef.current?.setPage(index)}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}
