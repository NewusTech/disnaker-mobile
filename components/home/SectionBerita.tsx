import React, { useRef, useState } from "react";
import View from "../view";
import { Typography } from "../ui/typography";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "@/context/theme-context";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { Button } from "../ui/button";

const dummyData = [
  {
    image: require("@/assets/images/image_1.png"),
    title: "Career Fair Tanggamus 2024",
    des: "Temukan berbagai kesempatan kerja di Career Fair Tanggamus! Hadiri acara ini dan bertemu langsung dengan perusahaan-perusahaan terkemuka yang siap merekrut talenta berbakat.",
  },
  {
    image: require("@/assets/images/image_1.png"),
    title: "Career Fair Tanggamus 2024",
    des: "Temukan berbagai kesempatan kerja di Career Fair Tanggamus! Hadiri acara ini dan bertemu langsung dengan perusahaan-perusahaan terkemuka yang siap merekrut talenta berbakat.",
  },
  {
    image: require("@/assets/images/image_1.png"),
    title: "Career Fair Tanggamus 2024",
    des: "Temukan berbagai kesempatan kerja di Career Fair Tanggamus! Hadiri acara ini dan bertemu langsung dengan perusahaan-perusahaan terkemuka yang siap merekrut talenta berbakat.",
  },
];

export default function SectionBerita() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

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
    console.log(offsetX, "offset");
    console.log(velocityX, "velocity");
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
        marginTop: 0,
      }}
    >
      <Animated.View
        style={[
          {
            width: 189,
            height: 320,
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
          Berita Disnaker Tanggamus
        </Typography>
        <Image
          source={require("@/assets/images/ilustrasi-profesi.png")}
          style={{ width: 130, height: 130 }}
        />
        <Pressable
          style={{
            backgroundColor: Colors.transparent,
            borderWidth: 1,
            borderColor: Colors.white,
            padding: 10,
            paddingHorizontal: 20,
            borderRadius: 100,
            // marginTop: "auto",
          }}
        >
          <Typography fontSize={12} color="white">
            Lihat Semuanya
          </Typography>
        </Pressable>
      </Animated.View>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={scrollHandler}
        data={dummyData}
        horizontal
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              {
                borderWidth: 1,
                borderColor: pressed
                  ? Colors["primary-50"]
                  : Colors["line-stroke-30"],
                backgroundColor: pressed
                  ? Colors["primary-10"]
                  : Colors.transparent,
                borderRadius: 15,
                width: Dimensions.get("window").width - 30,
                overflow: "hidden",
                height: 320,
                flexDirection: "column",
                justifyContent: "flex-start",
                rowGap: 10,
              },
            ]}
            onPress={() =>
              router.push({
                pathname: "/(autenticated)/information/[slug]",
                params: {
                  slug: "slug",
                },
              })
            }
          >
            {({ pressed }) => (
              <>
                <Image
                  source={item.image}
                  style={{ width: "100%", height: "33%" }}
                />
                <Typography
                  fontSize={18}
                  style={{
                    textAlign: "left",
                    width: "100%",
                    paddingHorizontal: 10,
                  }}
                  numberOfLines={1}
                  color={pressed ? "black-80" : "black-80"}
                >
                  {item.title}
                </Typography>
                <Typography
                  fontSize={14}
                  fontFamily="Poppins-Light"
                  style={{
                    textAlign: "left",
                    width: "100%",
                    paddingHorizontal: 10,
                  }}
                  numberOfLines={4}
                  color={pressed ? "black-80" : "black-80"}
                >
                  {item.des}
                </Typography>
                <Button
                  style={{ marginHorizontal: 10 }}
                  onPress={() =>
                    router.push({
                      pathname: "/(autenticated)/information/[slug]",
                      params: {
                        slug: "slug",
                      },
                    })
                  }
                >
                  Selengkapnya
                </Button>
              </>
            )}
          </Pressable>
        )}
        style={[{ position: "relative", left: 190 }, animatedStyle2]}
        contentContainerStyle={{
          paddingLeft: visible.value ? 60 : 30,
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
