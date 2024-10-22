import View from "@/components/view";
import React from "react";
import { Modal, TouchableOpacity } from "react-native";
import { Typography } from "../typography";
import { useAppTheme } from "@/context/theme-context";
import Loader from "../loader";
import Animated, { SlideInDown } from "react-native-reanimated";

type ModalAction = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onAction: () => void;
  isLoading: boolean;
  title?: string;
};

export default function ModalAction({
  visible,
  setVisible,
  onAction,
  isLoading = false,
  title = " Yakin Ingin Menghapus Data Ini?",
}: ModalAction) {
  const { Colors } = useAppTheme();
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(20, 21, 17, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View
          entering={SlideInDown}
          style={{
            width: "80%",
            height: "auto",
            padding: 20,
            borderRadius: 15,
            justifyContent: "center",
            gap: 20,
            backgroundColor: Colors.white,
          }}
        >
          <Typography
            fontFamily="Poppins-Medium"
            fontSize={16}
            style={{ textAlign: "center" }}
          >
            {title}
          </Typography>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: "50%",
                backgroundColor: Colors["primary-50"],
                borderRadius: 15,
                padding: 10,
              }}
              disabled={isLoading}
              onPress={onAction}
            >
              <Typography
                fontFamily="Poppins-Medium"
                fontSize={16}
                color="white"
                style={{ textAlign: "center" }}
              >
                {isLoading ? <Loader color="white" size={24} /> : "Ya!"}
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "50%",
                backgroundColor: Colors["error-60"],
                borderRadius: 15,
                padding: 10,
              }}
              onPress={() => setVisible(false)}
            >
              <Typography
                fontFamily="Poppins-Medium"
                fontSize={16}
                color="white"
                style={{ textAlign: "center" }}
              >
                Tidak
              </Typography>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
