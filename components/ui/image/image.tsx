import { useAppTheme } from "@/context/theme-context";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  Image as RIMAGE,
  ImageProps as RImageProps,
} from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import { Typography } from "../typography";

type ImageProps = {
  desc?: string;
  viewAspectRatio?: any;
} & RImageProps;

export default function Image(props: ImageProps) {
  const { desc, viewAspectRatio } = props;
  const { Colors } = useAppTheme();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <RIMAGE source={props.source} style={props.style} />
      </Pressable>
      {/* modal */}
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <Pressable
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(20, 21, 17, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setModalVisible(false)}
        >
          <Animated.View
            entering={SlideInDown}
            style={{
              width: "90%",
              height: "auto",
              borderRadius: 15,
              aspectRatio: viewAspectRatio ? viewAspectRatio : 1 / 1,
              flexDirection: "column",
              overflow: "hidden",
              backgroundColor: Colors.white,
            }}
          >
            <RIMAGE
              source={props.source}
              style={{ width: "100%", height: desc ? "80%" : "100%" }}
            />
            {desc && (
              <Typography
                fontFamily="Poppins-Light"
                fontSize={18}
                style={{
                  textAlign: "center",
                  textAlignVertical: "center",
                  height: "20%",
                }}
              >
                {desc}
              </Typography>
            )}
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
}