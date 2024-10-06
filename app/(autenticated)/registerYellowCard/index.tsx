import { IconNotification } from "@/components/icons";
import { IconCaretDown } from "@/components/icons/IconCeretDown";
import { SelectInput } from "@/components/selectInput";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/textInput";
import { Typography } from "@/components/ui/typography";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();
  return (
    <View style={{ flex: 1 }} backgroundColor="white">
      <View
        backgroundColor="primary-50"
        style={{ padding: 20, paddingTop: 60, paddingBottom: 25, gap: 20 }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 10,
          }}
        >
          <Image
            source={require("@/assets/images/dummy1.jpg")}
            style={{ width: 50, height: 50, borderRadius: 100 }}
          />
          <Typography fontSize={18} style={{}} color="white">
            Hi, Irsyad Abi Izzulhaq
          </Typography>
          <TouchableOpacity style={{ marginLeft: "auto" }}>
            <IconNotification color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Typography
          fontSize={20}
          style={{ textAlign: "center", marginTop: 15 }}
        >
          Pengajuan Kartu Kuning
        </Typography>
        <Typography
          fontSize={18}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: Colors["primary-10"],
            marginVertical: 20,
          }}
        >
          Domisili
        </Typography>
        <View style={{ paddingHorizontal: 20, gap: 20 }}>
          <TextInput
            label="Alamat Domisili"
            placeholder="Alamat"
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
          <SelectInput
            label="Kecamatan"
            data={[{ title: "Kecamatan" }, { title: "Kecamatan" }]}
            onSelect={() => console.log()}
            value={"Pilih Kecamatan"}
            trailingIcon={<IconCaretDown />}
            padding={12}
            borderRadius={15}
          />
          <SelectInput
            label="Kelurahan"
            data={[{ title: "Kelurahan" }, { title: "Kelurahan" }]}
            onSelect={() => console.log()}
            value={"Pilih Kelurahan"}
            trailingIcon={<IconCaretDown />}
            padding={12}
            borderRadius={15}
          />
        </View>
        <Typography
          fontSize={18}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: Colors["primary-10"],
            marginVertical: 20,
          }}
        >
          Pendidikan
        </Typography>
        <View style={{ paddingHorizontal: 20, gap: 20 }}>
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
            label="Keterampilan"
            placeholder="Keterampilan yang dimiliki"
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
          <TextInput
            label="Pekerjaan"
            placeholder="Pekerjan saat ini"
            keyboardType="default"
            color="primary-50"
            textAlignVertical="top"
            borderRadius={17}
            // value={field.value}
            // onBlur={field.onBlur}
            // onChangeText={field.onChange}
            // errorMessage={fieldState.error?.message}
          />
        </View>
        <Button style={{ marginVertical: 20, marginHorizontal: 20 }}>
          Kirim Pengajuan Sekarang
        </Button>
      </ScrollView>
    </View>
  );
}
