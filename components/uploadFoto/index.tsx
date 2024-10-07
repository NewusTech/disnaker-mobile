import { ImageBackground, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { useAppTheme } from "@/context/theme-context";
import { Typography } from "../ui/typography";
import { IconUpload } from "../icons";
import React from "react";

export type InputFileProps = {
  label: string;
  image: string;
  setImage: (image: string) => void;
  aspect?: [number, number];
};

export default function UploadFoto(props: InputFileProps) {
  const { label, image, setImage, aspect } = props;
  const { Colors } = useAppTheme();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.2,
      aspect: aspect ?? undefined,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Pressable style={{ gap: 5 }} onPress={pickImage}>
      <Typography fontFamily="Poppins-Medium" fontSize={14}>
        {label}
      </Typography>
      <ImageBackground
        source={{ uri: image }}
        style={{
          padding: 5,
          borderWidth: 1,
          borderRadius: 20,
          gap: 5,
          paddingVertical: 10,
          flexDirection: "column",
          borderColor: Colors["line-stroke-30"],
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          height: 180,
        }}
      >
        {!image && (
          <>
            <IconUpload color={"black"} />
            <Typography
              fontFamily="Poppins-Bold"
              color={"black-80"}
              fontSize={16}
            >
              Pilih Gambar
            </Typography>
            <Typography
              fontFamily="Poppins-Light"
              color={"black-50"}
              fontSize={14}
              style={{ textAlign: "center" }}
            >
              Supported formates: JPEG, PNG
            </Typography>
          </>
        )}
      </ImageBackground>
    </Pressable>
  );
}
