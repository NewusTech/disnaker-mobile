import { ImageBackground, Pressable } from "react-native";

import { useAppTheme } from "@/context/theme-context";

import { Typography } from "../typography";
import React from "react";
import { IconPlus } from "../icons/IconPlus";
import View from "../view";

export type InputFileProps = {
  label?: string;
  image?: string;
  setImage?: (image: string) => void;
  aspect?: [number, number];
};

export default function UploadFile(props: InputFileProps) {
  const { label, image, setImage, aspect } = props;
  const { Colors } = useAppTheme();

  //   const pickImage = async () => {
  //     // No permissions request is necessary for launching the image library
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.All,
  //       allowsEditing: true,
  //       quality: 0.2,
  //       aspect: aspect ?? undefined,
  //     });

  //     console.log(result);

  //     if (!result.canceled) {
  //       setImage(result.assets[0].uri);
  //     }
  //   };

  return (
    <Pressable style={{ gap: 5 }}>
      <View
        style={{
          padding: 5,
          borderWidth: 1.5,
          borderRadius: 20,
          gap: 5,
          paddingVertical: 10,
          flexDirection: "column",
          borderColor: Colors["primary-50"],
          backgroundColor: "rgba(47,85,212,0.1)",
          borderStyle: "dashed",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          height: 300,
        }}
      >
        <IconPlus color={"primary-50"} />
        <Typography fontFamily="Poppins-Bold" color={"primary-50"} fontSize={16}>
          {label}
        </Typography>
        <Typography
          fontFamily="Poppins-Light"
          color={"black-80"}
          fontSize={14}
          style={{ textAlign: "center", marginTop: 20 }}
        >
          Mendukung format PDF, DOC dengan maksimum 5 MB per dokumen
        </Typography>
      </View>
    </Pressable>
  );
}
