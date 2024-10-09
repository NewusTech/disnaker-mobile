import { ImageBackground, Modal, Pressable } from "react-native";

import { useAppTheme } from "@/context/theme-context";

import { Typography } from "../ui/typography";
import React, { useState } from "react";
import View from "../view";
import * as DocumentPicker from "expo-document-picker";
import Pdf from "react-native-pdf";
import { IconPdf } from "../icons";

export type InputFileProps = {
  label?: string;
  file?: DocumentPicker.DocumentPickerAsset;
  setFile?: (file: DocumentPicker.DocumentPickerAsset) => void;
  aspect?: [number, number];
  fileUrl?: string | null;
};

export default function UploadFile(props: InputFileProps) {
  const { label, file, setFile, fileUrl } = props;
  const { Colors } = useAppTheme();

  const source = {
    uri: fileUrl || "",
    cache: true,
  };

  const [openModal, setOpenModal] = useState<boolean>(false);
  const pickDocument = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        multiple: false,
        copyToCacheDirectory: true,
        type: "application/pdf",
      });
      if (doc.assets && setFile) {
        const newDoc = {
          name: doc.assets[0].name,
          uri: doc.assets[0].uri,
          type: doc.assets[0].mimeType,
          size: doc.assets[0].size,
        };
        setFile(newDoc);
      }
    } catch (error) {
      console.log("Error picking documents:", error);
    }
  };

  return (
    <>
      <Pressable style={{ gap: 5 }} onPress={pickDocument}>
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
          <IconPdf color={"primary-50"} width={34} height={34} />
          <Typography
            fontFamily="Poppins-Bold"
            color={"primary-50"}
            fontSize={16}
            style={{ textAlign: "center" }}
          >
            {label}
          </Typography>
          <Typography
            fontFamily="Poppins-Light"
            color={"black-80"}
            fontSize={14}
            style={{ textAlign: "center", marginTop: 5, marginHorizontal: 20 }}
          >
            Mendukung format PDF, DOC dengan maksimum 1 MB per dokumen
          </Typography>
          {(file || fileUrl) && (
            <Pressable
              style={{ marginTop: 20, paddingHorizontal: 10 }}
              onPress={() => setOpenModal(true)}
            >
              <Typography
                fontFamily="Poppins-Light"
                color={"primary-50"}
                fontSize={16}
                style={{ textAlign: "center" }}
              >
                Tekan disini untuk melihat file
              </Typography>
            </Pressable>
          )}
        </View>
      </Pressable>
      <Modal
        transparent={true}
        animationType="slide"
        visible={openModal}
        onRequestClose={() => setOpenModal(false)}
      >
        {(file || fileUrl) && (
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "rgba(20, 21, 17, 0.5)",
              height: "auto",
            }}
          >
            <Pdf
              trustAllCerts={false}
              source={file ?? source}
              onError={(error) => {
                console.error(error);
              }}
              style={{
                flex: 1,
                width: "100%",
                height: 300,
                borderColor: Colors["line-stroke-30"],
                borderWidth: 1,
              }}
            />
          </View>
        )}
      </Modal>
    </>
  );
}
