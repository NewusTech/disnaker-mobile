import React, { useRef, useState } from "react";
import View from "../view";
import { Typography } from "../ui/typography";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "@/context/theme-context";
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { IconBookmarks } from "../icons/IconBookmarks";
import { IconGraduation } from "../icons/IconGraduation";
import { IconTipJar } from "../icons/IconTipJat";
import { IconLocation } from "../icons/IconLocation";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

export default function SectionBerdasarkanProfesi() {
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
      }}
    >
      <Animated.View
        style={[
          {
            width: 189,
            height: 280,
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
          Berdasarkan Profesimu
        </Typography>
        <Image
          source={require("@/assets/images/ilustrasi-profesi.png")}
          style={{ width: 92, height: 92 }}
        />
        <Pressable
          style={{
            backgroundColor: Colors.transparent,
            borderWidth: 1,
            borderColor: Colors.white,
            padding: 10,
            paddingHorizontal: 20,
            borderRadius: 100,
            marginTop: "auto",
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
        data={[
          {
            id: 1,
            tes: "",
          },
          {
            id: 2,
            tes: "",
          },
        ]}
        horizontal
        renderItem={(item) => (
          <Pressable
            style={{
              padding: 20,
              width: 342,
              borderRadius: 15,
              gap: 15,
              borderWidth: 1,
              borderColor: Colors["line-stroke-30"],
              backgroundColor: Colors.white,
            }}
            onPress={() => router.push(`/jobVacancy/z`)}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <Image
                source={require("@/assets/images/dummy1.jpg")}
                style={{ width: 50, height: 50, borderRadius: 100 }}
              />
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  marginLeft: 15,
                }}
              >
                <Typography fontSize={17} style={{}} color="black-80">
                  Back End Developer
                </Typography>
                <Typography
                  fontSize={15}
                  fontFamily="Poppins-Light"
                  style={{}}
                  color="black-50"
                >
                  PT Brigitte
                </Typography>
              </View>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  padding: 3,
                  marginLeft: "auto",
                }}
              >
                <IconBookmarks width={27} height={27} color="black-80" />
              </TouchableOpacity>
            </View>
            <View style={{ gap: 5 }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconGraduation width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  SMA/SMK/S1
                </Typography>
              </View>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconTipJar width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  Rp. 3.000.000 - Rp. 4.500.000
                </Typography>
              </View>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconLocation width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  Tanggamus, Lampung
                </Typography>
              </View>
            </View>
            <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
              <Typography
                fontSize={12}
                style={{
                  padding: 7,
                  paddingHorizontal: 25,
                  backgroundColor: Colors["primary-50"],
                  borderRadius: 100,
                }}
                color="white"
              >
                Full Time
              </Typography>
              <Typography
                fontSize={12}
                style={{
                  padding: 7,
                  paddingHorizontal: 25,
                  backgroundColor: Colors["secondary-40"],
                  borderRadius: 100,
                }}
                color="white"
              >
                Remote
              </Typography>
            </View>
            <Typography
              fontSize={14}
              fontFamily="Poppins-LightItalic"
              style={{}}
              color="black-80"
            >
              Note: Update 2 Hari yang lalu
            </Typography>
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
