import React, { useEffect, useState } from "react";
import View from "../view";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAppTheme } from "@/context/theme-context";
import { Typography } from "../ui/typography";
import Animated from "react-native-reanimated";
import { IconPencilLine } from "../icons/IconPencilLine";
import TextInput from "../ui/textInput";
import { SelectInput } from "../selectInput";
import { IconCaretDown } from "../icons/IconCeretDown";
import { Button } from "../ui/button";

type anggota = {
  id: number;
};

export default function AnggotaJiwa() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const [dataAnggotaJiwa, setDataAnggotaJiwa] = useState<anggota[]>([
    { id: 1 },
  ]);

  const handleAddAnggota = () => {
    setDataAnggotaJiwa([
      ...dataAnggotaJiwa,
      { id: dataAnggotaJiwa.length + 1 },
    ]);
  };

  const handleDeleteAnggota = (id: number) => {
    setDataAnggotaJiwa(dataAnggotaJiwa.filter((data) => data.id !== id));
  };

  useEffect(() => {
    if (dataAnggotaJiwa.length === 0) {
      setDataAnggotaJiwa([{ id: 1 }]);
    }
  }, [dataAnggotaJiwa]);

  return (
    <View style={{ paddingHorizontal: 20, gap: 20 }}>
      {dataAnggotaJiwa.map((data, index) => (
        <View key={index} style={{ marginTop: 0 }}>
          <Pressable
            style={{
              padding: 10,
              backgroundColor: Colors["primary-50"],
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              fontSize={17}
              fontFamily="Poppins-Medium"
              style={{
                textAlign: "center",
                width: "100%",
              }}
              color="white"
            >
              Anggota {index + 1}
            </Typography>
          </Pressable>
          <Animated.View
            style={[
              {
                borderWidth: 1,
                borderColor: Colors["line-stroke-30"],
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                overflow: "scroll",
              },
            ]}
          >
            {/* Measure the actual content height */}
            <View style={{ height: "auto", padding: 15, gap: 20 }}>
              <TextInput
                label="NIK"
                placeholder="NIK"
                keyboardType="numeric"
                borderRadius={17}
                color="primary-50"
                textAlignVertical="top"
                // value={field.value}
                // onBlur={field.onBlur}
                // onChangeText={field.onChange}
                // errorMessage={fieldState.error?.message}
              />
              <TextInput
                label="Nama"
                placeholder="Nama"
                keyboardType="default"
                borderRadius={17}
                color="primary-50"
                textAlignVertical="top"
                // value={field.value}
                // onBlur={field.onBlur}
                // onChangeText={field.onChange}
                // errorMessage={fieldState.error?.message}
              />
              <SelectInput
                label="Jenis Klamin"
                data={[{ title: "laki-laki" }, { title: "perempuan" }]}
                onSelect={() => console.log()}
                value={"laki-laki"}
                trailingIcon={<IconCaretDown />}
                padding={12}
                borderRadius={15}
              />
              <SelectInput
                label="Status Kartu Keluarga"
                data={[{ title: "status 1" }, { title: "status 2" }]}
                onSelect={() => console.log()}
                value={"Pilih Status"}
                trailingIcon={<IconCaretDown />}
                padding={12}
                borderRadius={15}
              />
              <Button
                color="error-60"
                style={{ marginHorizontal: 20 }}
                onPress={() => handleDeleteAnggota(data.id)}
              >
                Hapus
              </Button>
            </View>
          </Animated.View>
        </View>
      ))}
      <Button
        color="success-60"
        style={{ marginHorizontal: 40 }}
        onPress={handleAddAnggota}
      >
        Tambah
      </Button>
    </View>
  );
}
