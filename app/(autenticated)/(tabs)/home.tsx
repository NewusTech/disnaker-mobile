import { IconKemenker } from "@/components/icons";
import PromoItem from "@/components/promoItem";
import { Typography } from "@/components/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const coreMenu = [
  {
    title: "Logongan Pekerjaan",
    image: require("@/assets/images/checklist.png"),
    link: "",
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

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();
  return (
    <ScrollView style={{paddingBottom:90}}>
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
        <IconKemenker size={32} color="white" />
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
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={PromoItemList}
        renderItem={({ item }) => (
          <PromoItem imgUrl={item.image} width={346} borderRadius={20} />
        )}
        style={{ width: "100%",marginBottom:20 ,marginTop:20}}
        snapToStart
        decelerationRate={"normal"}
        snapToInterval={356}
        contentContainerStyle={{ gap: 10, paddingHorizontal:20 }}
      />
    </ScrollView>
  );
}
