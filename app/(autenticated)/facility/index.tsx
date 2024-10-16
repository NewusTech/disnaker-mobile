import {
  Image,
  Dimensions,
  Animated,
  FlatList,
  Pressable,
  Modal,
} from "react-native";
import React, { useRef, useState } from "react";
import { useRouter } from "expo-router";
import { useAppTheme } from "@/context/theme-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Appbar from "@/components/ui/appBar";
import { Typography } from "@/components/ui/typography";
import { useGetFacility } from "@/services/facility";
import View from "@/components/view";

export default function Facility() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

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
    <View style={{ flex: 1, gap: 20 }}>
      <Appbar
        title={"Fasilitas"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <Animated.FlatList
        ref={flatListRef}
        data={getFacility.data?.data}
        renderItem={({ item }) => (
          <Pressable
            style={{ gap: 10, marginHorizontal: 10, width: "100%" }}
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
                width: Dimensions.get("window").width - 40,
                height: 180,
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
          paddingLeft: 10,
          paddingRight: 20,
          columnGap: 20,
          alignItems: "flex-start",
          gap: 20,
        }}
      />
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
