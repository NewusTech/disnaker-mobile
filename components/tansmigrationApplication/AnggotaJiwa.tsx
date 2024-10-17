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
import { gender } from "@/constants";

type anggota = {
  id: number;
  nik: string;
  name: string;
  gender: string;
  familyStatus: string;
};

export default function AnggotaJiwa({
  setDataAnggota,
}: {
  setDataAnggota: (data: anggota[]) => void;
}) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const [dataAnggotaJiwa, setDataAnggotaJiwa] = useState<anggota[]>([
    { id: 0, name: "", nik: "", gender: "", familyStatus: "" },
  ]);

  const handleAddAnggota = () => {
    setDataAnggotaJiwa((prevData) => [
      ...prevData,
      { id: prevData.length, name: "", nik: "", gender: "", familyStatus: "" },
    ]);
  };

  const handleDeleteAnggota = (id: number) => {
    setDataAnggotaJiwa((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleUpdateAnggota = (
    id: number,
    key: keyof anggota,
    value: string
  ) => {
    setDataAnggotaJiwa((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  useEffect(() => {
    setDataAnggota(dataAnggotaJiwa);
  }, [dataAnggotaJiwa]);

  useEffect(() => {
    if (dataAnggotaJiwa.length === 0) {
      setDataAnggotaJiwa([
        { id: 0, name: "", nik: "", gender: "", familyStatus: "" },
      ]);
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
                value={data.nik}
                onChangeText={(text) =>
                  handleUpdateAnggota(data.id, "nik", text)
                }
                maxLength={16}
              />
              <TextInput
                label="Nama"
                placeholder="Nama"
                keyboardType="default"
                borderRadius={17}
                color="primary-50"
                textAlignVertical="top"
                value={data.name}
                onChangeText={(text) =>
                  handleUpdateAnggota(data.id, "name", text)
                }
              />
              <SelectInput
                label="Jenis Klamin"
                data={Object.keys(gender).map((value) => {
                  return {
                    title: value,
                  };
                })}
                placeholder="Pilih Jenis Kelamin"
                onSelect={(dataItem: any) =>
                  handleUpdateAnggota(data.id, "gender", dataItem.title)
                }
                value={data.gender}
                trailingIcon={<IconCaretDown color="black-80" />}
                padding={12}
                borderRadius={15}
              />
              <SelectInput
                label="Status Kartu Keluarga"
                data={[
                  { title: "Anak" },
                  { title: "Istri" },
                  { title: "Suami" },
                ]}
                placeholder="Pilih Status Keluarga"
                onSelect={(dataItem: any) =>
                  handleUpdateAnggota(data.id, "familyStatus", dataItem.title)
                }
                value={data.familyStatus}
                trailingIcon={<IconCaretDown color="black-80" />}
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
