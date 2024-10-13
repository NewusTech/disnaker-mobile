import React, { useRef } from "react";
import View from "../view";
import { Typography } from "../ui/typography";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "@/context/theme-context";
import TextLink from "../ui/textLink";
import { Dimensions, FlatList, Image, Pressable } from "react-native";
import Animated from "react-native-reanimated";
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

export default function SectionPelatihan() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const flatListRef = useRef<FlatList>(null);

  return (
    <View backgroundColor="white" style={{ paddingVertical: 20, gap: 10 }}>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontSize={16} color="black-80">
          Pelatihan
        </Typography>
        <TextLink fontSize={14} label="Lihat Semua" />
      </View>
      {/*  */}
      <Animated.FlatList
        ref={flatListRef}
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
        style={[{}]}
        contentContainerStyle={{
          paddingLeft: 10,
          paddingRight: 20,
          columnGap: 20,
          alignItems: "center",
        }}
        snapToStart
        decelerationRate={"normal"}
        snapToInterval={382}
      />
    </View>
  );
}
