import { getMasterSkills } from "@/api";
import { Checkbox } from "@/components/checkBox";
import { IconMagnifyingGlass } from "@/components/icons";
import { IconCross } from "@/components/icons/IconCsross";
import { IconPlus } from "@/components/icons/IconPlus";
import Appbar from "@/components/ui/appBar";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import ModalSwipe from "@/components/ui/modalSwipe";
import TextInput from "@/components/ui/textInput";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useCreateUserSkill, useGetSkills } from "@/services/user";
import { useGetMasterSkills } from "@/services/vacancy";
import { useAuthProfile } from "@/store/userStore";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

type skillProps = {
  id: number;
  name: string;
};

export default function index() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const user = useAuthProfile();

  const [modalSkill, setModalSkill] = useState<boolean>(false);
  const [skill, setSkill] = useState<skillProps[]>(
    () =>
      user?.Skills.map((d) => {
        return {
          name: d.name,
          id: d.id,
        };
      }) || []
  );

  const [search, setSearch] = useState("");

  const getSkills = useGetMasterSkills();
  const dataSkills = getSkills.data?.data?.map((data) => {
    return {
      name: data.name,
      id: data.id,
    };
  }) as skillProps[];

  const handleAddSkill = (selectedSkill: skillProps, selected: boolean) => {
    if (!selected) {
      setSkill([
        ...skill,
        ...dataSkills?.filter((f) => f.id === selectedSkill.id),
      ]);
    } else {
      setSkill(skill.filter((f) => f.id !== selectedSkill.id));
    }
  };

  const handleDeleteSkill = (id: number) => {
    setSkill(skill.filter((f) => f.id !== id));
  };

  const createUserSkill = useCreateUserSkill();

  const handleCreate = () => {
    const data = skill.map((s) => {
      return s.id;
    });
    createUserSkill.mutate(
      {
        skills: data,
      },
      {
        onSuccess: async (response) => {
          Toast.show({
            type: "success",
            text1: "Add Skills Berhasil!",
            text2: response.message,
          });
          router.dismiss();
        },
        onError: (reponse) => {
          console.error(reponse);
          Toast.show({
            type: "error",
            text1: "Add Skills Gagal!",
            text2: reponse.response?.data.message,
          });
        },
      }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Edit Skills"}
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
          Note : Ceritakan tentang dirimu agar peluang diproses HRD lebih tinggi
        </Typography>
        <View
          style={{
            marginTop: 20,
            padding: 10,
            borderWidth: 1,
            borderRadius: 15,
            borderColor: Colors["line-stroke-30"],
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 5,
              width: "100%",
              height: "auto",
              minHeight: 40,
            }}
          >
            {skill?.map((data_, index) => (
              <View
                key={index}
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                  borderWidth: 1,
                  borderRadius: 7,
                  borderColor: Colors["line-stroke-30"],
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Typography style={{ textAlign: "center" }} fontSize={12}>
                  {data_.name}
                </Typography>
                <TouchableOpacity
                  style={{ marginLeft: "auto" }}
                  onPress={() => handleDeleteSkill(data_.id)}
                >
                  <IconCross color="error-60" width={18} height={18} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            marginTop: 10,
          }}
        >
          <IconPlus width={18} height={18} color="primary-50" />
          <Typography
            fontSize={18}
            color="primary-50"
            onPress={() => setModalSkill(true)}
          >
            Tambah Keahlian Lainya
          </Typography>
        </TouchableOpacity>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          marginBottom: insets.bottom + 20,
        }}
      >
        <Button
          style={{ marginTop: 20, marginHorizontal: 20 }}
          disabled={createUserSkill.isPending}
          onPress={handleCreate}
        >
          {createUserSkill.isPending ? <Loader color="white" /> : "Simpan"}
        </Button>
      </View>
      <ModalSwipe modalVisible={modalSkill} setModalVisible={setModalSkill}>
        <View
          style={{
            flexDirection: "column",
            gap: 20,
            height: "auto",
          }}
        >
          <TextInput
            label="Pilih Keahlian Kamu"
            placeholder="Cari Keahlianmu"
            keyboardType="default"
            borderRadius={17}
            color="primary-50"
            trailingIcon={<IconMagnifyingGlass />}
            value={search}
            onChangeText={(e) => setSearch(e)}
          />
          {dataSkills
            ?.filter((f) => {
              if (search === "") return true; // Tampilkan semua jika search kosong
              return f.name.toLowerCase().includes(search.toLowerCase()); // Pencarian case-insensitive dan menggunakan substring matching
            })
            .map((data, index) => {
              const selected = skill.some((s) => s.id === data.id);
              return (
                <Pressable
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  onPress={() => {
                    handleAddSkill(data, selected);
                  }}
                >
                  <Typography>{data.name}</Typography>
                  <Checkbox selected={selected} />
                </Pressable>
              );
            })}
        </View>
      </ModalSwipe>
    </View>
  );
}
