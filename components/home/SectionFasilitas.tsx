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

export default function SectionFasilitas() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const flatListRef = useRef<FlatList>(null);

  return (
    <View
      backgroundColor="white"
      style={{ paddingVertical: 20, gap: 10, paddingHorizontal: 20 }}
    >
      <View
        style={{
          paddingHorizontal: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontSize={16} color="black-80">
          Fasilitas
        </Typography>
        <TextLink fontSize={14} label="Lihat Semua" />
      </View>
      {/*  */}
      <Animated.FlatList
      scrollEnabled={false}
        ref={flatListRef}
        data={Array.from({ length: 10 }).map(() => {
          return {
            title: "",
          };
        })}
        numColumns={2}
        renderItem={({ item }) => (
          <Pressable style={{ gap: 10, marginHorizontal: 10 }}>
            <Image
              source={require("@/assets/images/no-image.png")}
              style={{
                width: Dimensions.get("window").width / 2 - 30,
                height: 130,
                borderRadius: 15,
              }}
            />
            <Typography style={{ textAlign: "center" }} fontSize={16}>
              Title
            </Typography>
          </Pressable>
        )}
        style={[{ gap: 20 }]}
        contentContainerStyle={{
          paddingLeft: 10,
          paddingRight: 20,
          columnGap: 20,
          alignItems: "center",
          gap: 20,
        }}
      />
      <Button>Selengkapnya</Button>
    </View>
  );
}
