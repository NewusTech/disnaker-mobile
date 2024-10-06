import {
  Text,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppTheme } from "@/context/theme-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Typography } from "@/components/ui/typography";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import View from "@/components/view";
import { IconGraduation } from "@/components/icons/IconGraduation";
import Separator from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ModalSwipe from "@/components/ui/modalSwipe";
import { LinearGradient } from "expo-linear-gradient";
import { IconPencilLine } from "@/components/icons/IconPencilLine";
import TextInput from "@/components/ui/textInput";

export default function DetailVacancy() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ id: string }>();

  const [tabDetail, setTabDetail] = useState<
    "Detail Pekerjaan" | "Detail Perusahaan"
  >("Detail Pekerjaan");

  const [modalLamar, setModalLamar] = useState<boolean>(false);

  return (
    <View style={{ flex: 1, paddingBottom: 0 }}>
      <ScrollView
        style={{ flex: 1, paddingTop: insets.top }}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <View
          style={{
            height: 195,
            position: "relative",
            alignItems: "center",
            overflow: "visible",
          }}
        >
          <ImageBackground
            source={require("@/assets/images/bg1.png")}
            style={{ height: 150, width: "100%" }}
          />
          <Image
            source={require("@/assets/images/dummy1.jpg")}
            style={{
              width: 85,
              height: 85,
              borderRadius: 100,
              position: "absolute",
              bottom: 0,
            }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Typography fontSize={18} style={{ textAlign: "center" }}>
            Back End Developer
          </Typography>
          <Typography
            fontSize={16}
            style={{ textAlign: "center" }}
            color="black-30"
            fontFamily="Poppins-Light"
          >
            PT Brigitte
          </Typography>
          <Typography
            fontSize={14}
            style={{ textAlign: "center" }}
            fontFamily="Poppins-LightItalic"
          >
            Deadline 20 Oktober 2025
          </Typography>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Typography
              fontSize={14}
              style={{
                padding: 7,
                paddingHorizontal: 25,
                backgroundColor: Colors["primary-50"],
                borderRadius: 100,
              }}
              color="white"
            >
              Full Time
            </Typography>
            <Typography
              fontSize={14}
              style={{
                padding: 7,
                paddingHorizontal: 25,
                backgroundColor: Colors["secondary-40"],
                borderRadius: 100,
              }}
              color="white"
            >
              Remote
            </Typography>
          </View>
        </View>
        {/*  */}
        <View
          style={{
            borderWidth: 1,
            padding: 10,
            marginTop: 20,
            marginHorizontal: 20,
            borderRadius: 15,
            borderColor: Colors["line-stroke-30"],
            gap: 10,
            paddingVertical: 15,
          }}
        >
          {/* row 1 */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconGraduation width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  Pendidikan
                </Typography>
              </View>
              <Typography fontSize={14} style={{}} color="black-80">
                SMA/SMK/S1
              </Typography>
            </View>
            <View style={{ width: "50%" }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconGraduation width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  Jenis Kelamin
                </Typography>
              </View>
              <Typography fontSize={14} style={{}} color="black-80">
                Semua Jenis Kelamin
              </Typography>
            </View>
          </View>
          <Separator />
          {/* row 2 */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconGraduation width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  Gaji
                </Typography>
              </View>
              <Typography fontSize={14} style={{}} color="black-80">
                Rp. 3.000.000
              </Typography>
            </View>
            <View style={{ width: "50%" }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconGraduation width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  Pengalaman
                </Typography>
              </View>
              <Typography fontSize={14} style={{}} color="black-80">
                Minimal 1 Tahun
              </Typography>
            </View>
          </View>
          <Separator />
          {/* row 2 */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconGraduation width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  Gaji
                </Typography>
              </View>
              <Typography fontSize={14} style={{}} color="black-80">
                Rp. 3.000.000
              </Typography>
            </View>
            <View style={{ width: "50%" }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconGraduation width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  Usia
                </Typography>
              </View>
              <Typography fontSize={14} style={{}} color="black-80">
                Maksimal 50 Tahun
              </Typography>
            </View>
          </View>
        </View>
        {/*  */}
        <View
          style={{
            width: "90%",
            height: 70,
            backgroundColor: Colors["primary-50"],
            borderRadius: 100,
            overflow: "hidden",
            flexDirection: "row",
            padding: 10,
            paddingVertical: 10,
            marginTop: 20,
            marginHorizontal: "auto",
          }}
        >
          <TouchableOpacity
            style={{
              width: "50%",
              backgroundColor:
                tabDetail === "Detail Pekerjaan"
                  ? Colors.white
                  : Colors["primary-50"],
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
            }}
            onPress={() => setTabDetail("Detail Pekerjaan")}
          >
            <Typography
              fontSize={15}
              style={{ textAlignVertical: "center" }}
              color={tabDetail === "Detail Pekerjaan" ? "primary-50" : "white"}
            >
              Detail Pekerjaan
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "50%",
              backgroundColor:
                tabDetail === "Detail Perusahaan"
                  ? Colors.white
                  : Colors["primary-50"],
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
            }}
            onPress={() => setTabDetail("Detail Perusahaan")}
          >
            <Typography
              fontSize={15}
              style={{ textAlignVertical: "center" }}
              color={tabDetail === "Detail Perusahaan" ? "primary-50" : "white"}
            >
              Detail Perusahaan
            </Typography>
          </TouchableOpacity>
        </View>
        {/*  */}
        {tabDetail === "Detail Pekerjaan" && (
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 20,
              paddingBottom: 10,
            }}
          >
            <RenderHTML
              systemFonts={[...defaultSystemFonts, "Poppins-Regular"]}
              contentWidth={Dimensions.get("screen").width - 48}
              source={{
                html: `<strong>Deskripsi Pekerjaan</strong>
                        <p>Bertanggung jawab untuk membangun dan mengelola server, basis data, dan API aplikasi Disnaker. Fokus pada memastikan performa yang optimal, keamanan data pengguna.</p>
                        <br/>
                        <strong>Tanggung Jawab</strong>
                        <ul>
                        <li>Pengalaman minimal 2 tahun dalam pengembangan back end menggunakan Node.js, Python, atau Java.</li>
                        <li>Pengalaman minimal 2 tahun dalam pengembangan back end menggunakan Node.js, Python, atau Java.</li>
                        <li>Pengalaman minimal 2 tahun dalam pengembangan back end menggunakan Node.js, Python, atau Java.</li>
                        </ul>
                        <br/>
                        <strong>Persyaratan</strong>
                        <ul>
                        <li>Pengalaman minimal 2 tahun dalam pengembangan back end menggunakan Node.js, Python, atau Java.</li>
                        <li>Pengalaman minimal 2 tahun dalam pengembangan back end menggunakan Node.js, Python, atau Java.</li>
                        <li>Pengalaman minimal 2 tahun dalam pengembangan back end menggunakan Node.js, Python, atau Java.</li>
                        </ul>`,
              }}
            />
          </View>
        )}
        {tabDetail === "Detail Perusahaan" && (
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 20,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Image
                source={require("@/assets/images/dummy1.jpg")}
                style={{ width: 60, height: 60, borderRadius: 100 }}
              />
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  marginLeft: 15,
                }}
              >
                <Typography fontSize={18} style={{}} color="black-80">
                  Irsyad Abi Izzulhaq
                </Typography>
                <Typography
                  fontSize={15}
                  fontFamily="Poppins-Light"
                  style={{}}
                  color="black-50"
                >
                  irsyadabiizzulhaq@gmail.com
                </Typography>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <Typography fontSize={18} style={{}} color="black-80">
                Detail Perusahaan
              </Typography>
              <Typography
                fontSize={15}
                fontFamily="Poppins-Light"
                style={{}}
                color="black-50"
              >
                PT Brigitte adalah konsultan IT yag menawarkan solusi teknologi,
                pengembangan perangkat lunak, dan integrasi sistem untuk
                meningkatkan efisiensi bisnis.
              </Typography>
            </View>
            {/*  */}
            <View
              style={{
                marginTop: 10,
                marginHorizontal: 0,
                borderWidth: 1,
                borderColor: Colors["line-stroke-30"],
                borderRadius: 15,
                gap: 10,
                padding: 20,
              }}
            >
              <View style={{}}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "flex-end",
                  }}
                >
                  <IconGraduation width={20} height={20} color="black-80" />
                  <Typography fontSize={13} style={{}} color="black-80">
                    Pendidikan
                  </Typography>
                </View>
                <Typography fontSize={14} style={{}} color="black-80">
                  SMA/SMK/S1
                </Typography>
              </View>
              <Separator />
              <View style={{}}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "flex-end",
                  }}
                >
                  <IconGraduation width={20} height={20} color="black-80" />
                  <Typography fontSize={13} style={{}} color="black-80">
                    Alamat Kantor
                  </Typography>
                </View>
                <Typography fontSize={14} style={{}} color="black-80">
                  Jl Kebersihan Gg . Lisna no 77 Sukadana Ham
                </Typography>
              </View>
              <Separator />
              <View style={{}}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "flex-end",
                  }}
                >
                  <IconGraduation width={20} height={20} color="black-80" />
                  <Typography fontSize={13} style={{}} color="black-80">
                    Jumlah Karyawan
                  </Typography>
                </View>
                <Typography fontSize={14} style={{}} color="black-80">
                  100 - 500 Karyawan
                </Typography>
              </View>
              <Separator />
              <View style={{}}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "flex-end",
                  }}
                >
                  <IconGraduation width={20} height={20} color="black-80" />
                  <Typography fontSize={13} style={{}} color="black-80">
                    Website
                  </Typography>
                </View>
                <Typography fontSize={14} style={{}} color="black-80">
                  (irsyadabi.framer.website)
                </Typography>
              </View>
              <Separator />
              <View style={{}}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "flex-end",
                  }}
                >
                  <IconGraduation width={20} height={20} color="black-80" />
                  <Typography fontSize={13} style={{}} color="black-80">
                    Instagram
                  </Typography>
                </View>
                <Typography fontSize={14} style={{}} color="black-80">
                  https://www.instagram.com/irsyadabii
                </Typography>
              </View>
              <Separator />
            </View>
          </View>
        )}
        <Button
          style={{ marginVertical: 0, marginHorizontal: 20 }}
          onPress={() => setModalLamar(true)}
        >
          Lamar Sekarang
        </Button>
      </ScrollView>
      <ModalSwipe modalVisible={modalLamar} setModalVisible={setModalLamar}>
        <View>
          <LinearGradient
            colors={["#2F55D4", "#93278F"]}
            start={{ x: 1, y: 0.5 }}
            style={{
              height: "auto",
              flexDirection: "column",
              alignItems: "center",
              padding: 20,
              borderRadius: 15,
            }}
          >
            <Image
              source={require("@/assets/images/dummy1.jpg")}
              style={{ width: 75, height: 75, borderRadius: 100 }}
            />
            <View style={{ marginTop: 20, marginBottom: 20 }}>
              <Typography
                fontSize={19}
                style={{ textAlign: "center" }}
                color="white"
              >
                Irsyad Abi Izzulhaq
              </Typography>
              <Typography
                fontSize={16}
                fontFamily="Poppins-Light"
                style={{ textAlign: "center" }}
                color="white"
              >
                irsyadabiizzulhaq@gmail.com
              </Typography>
            </View>
            <Pressable
              style={{
                flexDirection: "row",
                width: "100%",
                backgroundColor: Colors.white,
                padding: 15,
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                borderRadius: 100,
              }}
              onPress={() => router.push("/(autenticated)/profile/editProfile")}
            >
              <IconPencilLine />
              <Typography color="primary-50">Ubah Profile</Typography>
            </Pressable>
          </LinearGradient>
          <View style={{ marginVertical: 20 }}>
            <TextInput
              placeholder="Note: Pastikan profilmu sudah terisi dengan lengkap dan benar sebelum mengirimkan lamaran"
              keyboardType="default"
              borderRadius={17}
              color="primary-50"
              numberOfLines={5}
              textAlignVertical="top"
              multiline={true}
              value={""}
              // onBlur={field.onBlur}
              // onChangeText={field.onChange}
              // errorMessage={fieldState.error?.message}
            />
          </View>
          <Button style={{ marginVertical: 0 }}>Lamar Sekarang</Button>
        </View>
      </ModalSwipe>
    </View>
  );
}
