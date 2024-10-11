import View from "@/components/view";
import React from "react";
import { Modal, TouchableOpacity } from "react-native";
import { Typography } from "../typography";
import { useAppTheme } from "@/context/theme-context";
import Loader from "../loader";

type ModalAction = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onAction: () => void;
  isLoading: boolean;
};

export default function ModalAction({
  visible,
  setVisible,
  onAction,
  isLoading = false,
}: ModalAction) {
  const { Colors } = useAppTheme();
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
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
        <View
          backgroundColor="white"
          style={{
            width: "80%",
            height: 300,
            padding: 20,
            borderRadius: 15,
            justifyContent: "center",
            gap: 20,
          }}
        >
          <Typography fontFamily="Poppins-Medium" fontSize={16}>
            Yakin Ingin Menghapus Data Ini?
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
                {isLoading ? <Loader color="white" size={24}/> : "Ya!"}
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
        </View>
      </View>
    </Modal>
  );
}
