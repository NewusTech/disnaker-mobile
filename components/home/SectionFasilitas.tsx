import React, { useRef, useState } from "react";
import View from "../view";
import { Typography } from "../ui/typography";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "@/context/theme-context";
import TextLink from "../ui/textLink";
import { Dimensions, FlatList, Image, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { Button } from "../ui/button";
import { Modal } from "react-native";
import { useGetFacility } from "@/services/facility";

export default function SectionFasilitas() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const flatListRef = useRef<FlatList>(null);

  const [modalFoto, setModalFoto] = useState<boolean>(false);
  const [contenctModal, setContentModal] = useState<{
    image: string;
    title: string;
  }>({
    image: "",
    title: "",
  });

  const getFacility = useGetFacility();

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
        <TextLink
          fontSize={14}
          label="Lihat Semua"
          onPress={() => router.push("/facility")}
        />
      </View>
      {/*  */}
      <Animated.FlatList
        scrollEnabled={false}
        ref={flatListRef}
        data={getFacility.data?.data}
        numColumns={2}
        renderItem={({ item }) => (
          <Pressable
            style={{ gap: 10, marginHorizontal: 5 }}
            onPress={() => {
              setModalFoto(true);
              setContentModal({
                image: item.image,
                title: item.title,
              });
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: Dimensions.get("window").width / 2 - 30,
                height: 130,
                borderRadius: 15,
              }}
            />
            <Typography style={{ textAlign: "center" }} fontSize={16}>
              {item.title}
            </Typography>
          </Pressable>
        )}
        style={[{ gap: 20 }]}
        contentContainerStyle={{
          paddingLeft: 0,
          paddingRight: 20,
          alignItems: "flex-start",
          flexDirection: "row",
          gap: 20,
        }}
      />
      <Button onPress={() => router.push("/facility")}>Selengkapnya</Button>
      {/* modal */}
      <Modal transparent={true} visible={modalFoto} animationType="fade">
        <Pressable
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(20, 21, 17, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setModalFoto(false)}
        >
          <View
            backgroundColor="white"
            style={{
              width: "80%",
              height: 300,
              borderRadius: 15,
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: contenctModal.image }}
              style={{ width: "100%", height: "80%" }}
            />
            <Typography
              fontFamily="Poppins-Light"
              fontSize={18}
              style={{
                textAlign: "center",
                textAlignVertical: "center",
                height: "20%",
              }}
            >
              {contenctModal.title}
            </Typography>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
