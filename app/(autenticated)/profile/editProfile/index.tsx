import { IconCalender } from "@/components/icons/IconCalender";
import { IconCaretDown } from "@/components/icons/IconCeretDown";
import { IconPencilLine } from "@/components/icons/IconPencilLine";
import { SelectInput } from "@/components/selectInput";
import Appbar from "@/components/ui/appBar";
import { Button } from "@/components/ui/button";
import { DateInputV3 } from "@/components/ui/inputDateV3";
import { DateInputV4 } from "@/components/ui/inputDateV4";
import TextInput from "@/components/ui/textInput";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable } from "react-native";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EditProfile() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const [tanggalLahir, setTanggalLahir] = useState<Date>(new Date());
  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title={"Edit Profile"}
        variant="light"
        backIconPress={() => router.back()}
      />
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={{ padding: 15, paddingVertical: 20 }}
      >
        <View
          style={{ width: 90, marginHorizontal: "auto", position: "relative" }}
        >
          <Image
            source={require("@/assets/images/dummy1.jpg")}
            style={{ width: 90, height: 90, borderRadius: 100 }}
          />
          <Pressable
            style={{
              backgroundColor: "white",
              padding: 3,
              borderRadius: 100,
              position: "absolute",
              bottom: -5,
              right: 0,
              borderWidth: 1,
              borderColor: Colors["primary-50"],
            }}
          >
            <IconPencilLine width={20} height={20} />
          </Pressable>
        </View>
        <View style={{ marginTop: 20, gap: 10 }}>
          <TextInput
            label="Nama Lengkap"
            placeholder="Nama Lengkap"
            keyboardType="default"
            borderRadius={17}
            color="primary-50"
            // value={field.value}
            // onBlur={field.onBlur}
            // onChangeText={field.onChange}
            // errorMessage={fieldState.error?.message}
          />
          <TextInput
            label="Email"
            placeholder="Email"
            keyboardType="email-address"
            borderRadius={17}
            color="primary-50"
            // value={field.value}
            // onBlur={field.onBlur}
            // onChangeText={field.onChange}
            // errorMessage={fieldState.error?.message}
          />
          <DateInputV3
            withBorder
            label={"Tanggal Lahir"}
            trailingIcon={
              <View style={{ marginLeft: "auto" }}>
                <IconCalender width={21} height={21} />
              </View>
            }
            onChange={(date) => setTanggalLahir(date || new Date())}
            value={tanggalLahir}
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
          <TextInput
            label="Nomor Wa"
            placeholder="Nomor Wa"
            keyboardType="number-pad"
            borderRadius={17}
            color="primary-50"
            // value={field.value}
            // onBlur={field.onBlur}
            // onChangeText={field.onChange}
            // errorMessage={fieldState.error?.message}
          />
          <SelectInput
            label="Pendidikan Terakhir"
            data={[{ title: "Sarjana" }, { title: "Pasca Sarjana" }]}
            onSelect={() => console.log()}
            value={"Sarjana"}
            trailingIcon={<IconCaretDown />}
            padding={12}
            borderRadius={15}
          />
          <TextInput
            label="Lokasi Terkini"
            placeholder="lokasi"
            keyboardType="default"
            borderRadius={17}
            color="primary-50"
            numberOfLines={5}
            textAlignVertical="top"
            multiline={true}
            // value={field.value}
            // onBlur={field.onBlur}
            // onChangeText={field.onChange}
            // errorMessage={fieldState.error?.message}
          />
          <Button>Simpan</Button>
        </View>
      </ScrollView>
    </View>
  );
}
