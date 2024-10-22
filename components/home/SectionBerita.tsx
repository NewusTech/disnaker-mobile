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
import { useGetArticle } from "@/services/article/insex";
import { removeHtmlTags } from "@/helpers";

export default function SectionBerita() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const visible = useSharedValue<boolean>(false);

  const flatListRef = useRef<FlatList>(null);

  const getNews = useGetArticle("");

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
        minHeight: 342,
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
          Berita Disnaker Tanggamus
        </Typography>
        <Image
          source={require("@/assets/images/news.png")}
          style={{
            width: 75,
            height: 92,
          }}
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
          onPress={() => router.push("/news")}
        >
          <Typography fontSize={12} color="white">
            Lihat Semuanya
          </Typography>
        </Pressable>
      </Animated.View>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={scrollHandler}
        data={getNews.data?.data}
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
                width: Dimensions.get("window").width * 0.7,
                overflow: "hidden",
                height: 280,
                flexDirection: "column",
                justifyContent: "flex-start",
                rowGap: 8,
              },
            ]}
            onPress={() =>
              router.push({
                pathname: "/(autenticated)/news/[slug]",
                params: {
                  slug: item.slug,
                },
              })
            }
          >
            {({ pressed }) => (
              <>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: "100%", height: "37%" }}
                />
                <Typography
                  fontSize={17}
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
                  fontSize={13}
                  fontFamily="Poppins-Light"
                  style={{
                    textAlign: "left",
                    width: "100%",
                    paddingHorizontal: 10,
                  }}
                  numberOfLines={4}
                  color={pressed ? "black-80" : "black-80"}
                >
                  {removeHtmlTags(item.desc, 90)}
                </Typography>
                <Pressable
                  style={{
                    padding: 10,
                    backgroundColor: Colors["primary-50"],
                    marginHorizontal: 10,
                    borderRadius: 100,
                    marginTop: 5,
                  }}
                  onPress={() =>
                    router.push({
                      pathname: "/(autenticated)/news/[slug]",
                      params: {
                        slug: item.slug,
                      },
                    })
                  }
                >
                  <Typography color="white" style={{ textAlign: "center" }}>
                    Selengkapnya
                  </Typography>
                </Pressable>
              </>
            )}
          </Pressable>
        )}
        style={[{ position: "relative", left: 190 }, animatedStyle2]}
        contentContainerStyle={{
          paddingLeft: 20,
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
