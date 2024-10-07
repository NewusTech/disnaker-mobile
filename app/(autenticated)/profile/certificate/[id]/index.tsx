import { Checkbox } from "@/components/checkBox";
import { IconCalender } from "@/components/icons/IconCalender";
import { IconCaretDown } from "@/components/icons/IconCeretDown";
import { SelectInput } from "@/components/selectInput";
import Appbar from "@/components/ui/appBar";
import { Button } from "@/components/ui/button";
import { DateInputV3 } from "@/components/ui/inputDateV3";
import TextInput from "@/components/ui/textInput";
import { Typography } from "@/components/ui/typography";
import UploadFile from "@/components/uploadFile";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, TouchableWithoutFeedback } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function index() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const [masihBekerja, setMasihBekerja] = useState<boolean>(false);

  return (
    <View backgroundColor="white" style={{ flex: 1 }}>
      <Appbar
        title={"Edit Sertifikat"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={{ padding: 15, paddingVertical: 20 }}
      >
        <Typography
          fontFamily="Poppins-LightItalic"
          fontSize={14}
          style={{
            padding: 10,
            borderColor: Colors["line-stroke-30"],
            borderWidth: 1,
            borderRadius: 15,
          }}
          color="black-30"
        >
          Note : Inputkan Sertifikat kamu dengan benar
        </Typography>
        <View style={{ marginTop: 20, gap: 20 }}>
          <TextInput
            label="Nama Sertifikat"
            placeholder="Masukan Nama Sertifikat"
            keyboardType="default"
            borderRadius={17}
            color="primary-50"
            // value={field.value}
            // onBlur={field.onBlur}
            // onChangeText={field.onChange}
            // errorMessage={fieldState.error?.message}
          />
          <TextInput
            label="Organisasi/ Instansi Penerbit"
            placeholder="Masukan Organisasi/ Instansi Penerbit"
            keyboardType="default"
            borderRadius={17}
            color="primary-50"
            // value={field.value}
            // onBlur={field.onBlur}
            // onChangeText={field.onChange}
            // errorMessage={fieldState.error?.message}
          />
          <DateInputV3
            withBorder
            label={"Masa Berlaku Hingga"}
            trailingIcon={
              <View style={{ marginLeft: "auto" }}>
                <IconCalender width={21} height={21} />
              </View>
            }
            onChange={(date) => console.log(date)}
            value={new Date()}
          />
          <TouchableWithoutFeedback
            onPress={() => setMasihBekerja((prev) => !prev)}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Checkbox selected={masihBekerja} />
              <Typography fontFamily="Poppins-Regular" fontSize={12}>
                Sertifikat ini tidak memiliki batas waktu
              </Typography>
            </View>
          </TouchableWithoutFeedback>
          <View style={{ marginTop: 0, gap: 5 }}>
            <Typography fontSize={16}>
              Deskripsi{" "}
              <Typography fontFamily="Poppins-Light" fontSize={14}>
                (Optional)
              </Typography>
            </Typography>
            <TextInput
              placeholder="Masukan Deskripsi"
              keyboardType="default"
              borderRadius={17}
              color="primary-50"
              numberOfLines={10}
              textAlignVertical="top"
              multiline={true}
              value={""}
              // onBlur={field.onBlur}
              // onChangeText={field.onChange}
              // errorMessage={fieldState.error?.message}
            />
            <Typography color="black-30" style={{ textAlign: "right" }}>
              236/1000
            </Typography>
          </View>
          <UploadFile label="Upload File Sertificate" />
        </View>
        <Button style={{ marginTop: 20 }}>Simpan</Button>
        <Button
          style={{ marginTop: 20 }}
          color="error-60"
          textColor="error-60"
          variant="secondary"
        >
          Hapus
        </Button>
      </ScrollView>
    </View>
  );
}
