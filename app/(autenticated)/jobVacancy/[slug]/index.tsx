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
import { useGetVacancyBySlug } from "@/services/vacancy";
import { formatDate } from "@/constants/dateTime";
import { formatCurrency } from "@/constants";
import { IconTipJar } from "@/components/icons/IconTipJar";
import {
  IconClock,
  IconGender,
  IconGenderNetural,
  IconHourglass,
} from "@/components/icons";
import { IconLocation } from "@/components/icons/IconLocation";
import { IconCalender } from "@/components/icons/IconCalender";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";

export default function DetailVacancy() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ slug: string }>();

  const [tabDetail, setTabDetail] = useState<
    "Detail Pekerjaan" | "Detail Perusahaan"
  >("Detail Pekerjaan");

  const [modalLamar, setModalLamar] = useState<boolean>(false);

  const getVacancyBySLug = useGetVacancyBySlug(params.slug);
  const detail = getVacancyBySLug.data?.data;

  if (!detail) return router.back();

  return (
    <View style={{ flex: 1, paddingBottom: 0 }} backgroundColor="white">
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
            source={{ uri: detail?.Company.imageBanner }}
            style={{
              height: 150,
              width: "100%",
              backgroundColor: Colors["black-20"],
            }}
          />
          <Image
            source={{ uri: detail?.Company.imageLogo }}
            style={{
              width: 85,
              height: 85,
              borderRadius: 100,
              position: "absolute",
              bottom: 0,
              backgroundColor: Colors["black-10"],
            }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Typography fontSize={18} style={{ textAlign: "center" }}>
            {detail?.title}
          </Typography>
          <Typography
            fontSize={16}
            style={{ textAlign: "center" }}
            color="black-30"
            fontFamily="Poppins-Light"
          >
            {detail?.Company.name}
          </Typography>
          <Typography
            fontSize={14}
            style={{ textAlign: "center" }}
            fontFamily="Poppins-LightItalic"
          >
            Deadline{" "}
            {formatDate(new Date(detail?.applicationDeadline || 0), {
              day: "2-digit",
              month: "long",
              hour: "numeric",
            })}
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
              fontFamily="Poppins-Light"
              style={{
                padding: 5,
                paddingHorizontal: 15,
                backgroundColor: Colors["primary-50"],
                borderRadius: 100,
                textAlignVertical: "center",
              }}
              color="white"
            >
              {detail?.jobType}
            </Typography>
            <Typography
              fontSize={14}
              fontFamily="Poppins-Light"
              style={{
                padding: 4,
                paddingHorizontal: 15,
                backgroundColor: Colors["white"],
                borderWidth: 1,
                borderColor: Colors["primary-50"],
                borderRadius: 100,
                textAlignVertical: "center",
              }}
              color="primary-50"
            >
              {detail?.workLocation}
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
                {detail.EducationLevels
                  ? detail?.EducationLevels.sort((a, b) => a.id - b.id)
                      .map((el) => {
                        return el.level;
                      })
                      .join("/")
                  : "-"}
              </Typography>
            </View>
            <View style={{ width: "50%" }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconGender width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  Jenis Kelamin
                </Typography>
              </View>
              <Typography fontSize={14} style={{}} color="black-80">
                {detail?.gender}
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
                <IconTipJar width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  Gaji
                </Typography>
              </View>
              <Typography fontSize={14} style={{}} color="black-80">
                {formatCurrency(Number.parseInt(detail?.salary || "0"))}
              </Typography>
            </View>
            <View style={{ width: "50%" }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconHourglass width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  Pengalaman
                </Typography>
              </View>
              <Typography fontSize={14} style={{}} color="black-80">
                Minimal {detail?.minExperience} Tahun
              </Typography>
            </View>
          </View>
          <Separator />
          {/* row 3 */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconLocation width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  Penempatan
                </Typography>
              </View>
              <Typography fontSize={14} style={{}} color="black-80">
                {detail?.location || "-"}
              </Typography>
            </View>
            <View style={{ width: "50%" }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconGenderNetural width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  Usia
                </Typography>
              </View>
              <Typography fontSize={14} style={{}} color="black-80">
                Maksimal {detail?.maxAge} Tahun
              </Typography>
            </View>
          </View>
          <Separator />
          {/* row 4 */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconCalender width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  Hari Kerja
                </Typography>
              </View>
              <Typography fontSize={14} style={{}} color="black-80">
                {detail?.workingDay}
              </Typography>
            </View>
            <View style={{ width: "50%" }}>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "flex-end" }}
              >
                <IconClock width={20} height={20} color="black-80" />
                <Typography fontSize={13} style={{}} color="black-80">
                  Jam Kerja
                </Typography>
              </View>
              <Typography fontSize={14} style={{}} color="black-80">
                {detail?.workingHour}
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
          <Animated.View
            entering={SlideInLeft}
            style={{
              marginHorizontal: 20,
              marginTop: 20,
              paddingBottom: 20,
            }}
          >
            <RenderHTML
              systemFonts={[...defaultSystemFonts, "Poppins-Regular"]}
              contentWidth={Dimensions.get("screen").width - 48}
              source={{
                html: detail?.desc || "-",
              }}
            />
            <Typography fontSize={18} style={{ marginTop: 20 }}>
              Skil
            </Typography>
            <View
              style={{
                flexWrap: "wrap",
                gap: 5,
                width: "100%",
                height: (5 / 1) * 20,
              }}
            >
              {detail?.VacancySkills.map((item, index) => (
                <Typography
                  key={index}
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    borderWidth: 1,
                    borderRadius: 7,
                    borderColor: Colors["line-stroke-30"],
                    textAlignVertical: "center",
                    width: "auto",
                  }}
                >
                  {item.Skill.name}
                </Typography>
              ))}
            </View>
          </Animated.View>
        )}
        {tabDetail === "Detail Perusahaan" && (
          <Animated.View
            entering={SlideInRight}
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
                source={{ uri: detail?.Company.imageLogo }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 100,
                  backgroundColor: Colors["black-10"],
                }}
              />
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  marginLeft: 15,
                }}
              >
                <Typography fontSize={18} style={{}} color="black-80">
                  {detail?.Company.name}
                </Typography>
                <Typography
                  fontSize={15}
                  fontFamily="Poppins-Light"
                  style={{}}
                  color="black-50"
                >
                  It Consultan (belum)
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
                {detail?.Company.desc}
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
                    Alamat Kantor
                  </Typography>
                </View>
                <Typography fontSize={14} style={{}} color="black-80">
                  {detail?.Company.address}
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
                  {detail?.Company.numberEmployee} Karyawan
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
                  {detail?.Company.website}
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
                  {detail?.Company.instagram}
                </Typography>
              </View>
            </View>
          </Animated.View>
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
