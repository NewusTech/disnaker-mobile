import Appbar from "@/components/ui/appBar";
import { Button } from "@/components/ui/button";
import {
  IconCaretRight,
  IconFilwArrowDown,
  IconFilwArrowUp,
  IconUserProfile,
} from "@/components/icons";
import { IconPencilLine } from "@/components/icons/IconPencilLine";
import ModalSwipe from "@/components/ui/modalSwipe";
import { Typography } from "@/components/ui/typography";
import UploadFile from "@/components/uploadFile";
import View from "@/components/view";
import { useAppTheme } from "@/context/theme-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, Pressable, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const [modalUploadCv, setModalUploadCv] = useState<boolean>(false);
  const [tabUploadCV, setTabUploadCV] = useState<"cv" | "portofolio">("cv");

  return (
    <View style={{ flex: 1 }} backgroundColor="white">
      <Appbar title="Profile" variant="light" />
      <LinearGradient
        colors={["#2F55D4", "#93278F"]}
        start={{ x: 1, y: 0.5 }}
        style={{
          height: "auto",
          flexDirection: "column",
          alignItems: "center",
          padding: 20,
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
          onPress={()=>router.push("/(autenticated)/profile/editProfile")}
        >
          <IconPencilLine />
          <Typography color="primary-50">Ubah Profile</Typography>
        </Pressable>
        <View
          style={{
            marginTop: 20,
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Pressable
            style={{
              width: Dimensions.get("window").width / 2 - 20,
              height: "auto",
              aspectRatio: 2 / 1.3,
              borderColor: Colors.white,
              borderWidth: 1,
              borderRadius: 15,
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              style={{ textAlign: "center" }}
              color="white"
              fontSize={25}
              fontFamily="Poppins-Medium"
            >
              04
            </Typography>
            <Typography
              fontSize={19}
              fontFamily="Poppins-Regular"
              style={{ textAlign: "center" }}
              color="white"
            >
              Riwayat
            </Typography>
          </Pressable>
          <Pressable
            style={{
              width: Dimensions.get("window").width / 2 - 20,
              height: "auto",
              aspectRatio: 2 / 1.3,
              borderColor: Colors.transparent,
              backgroundColor: Colors.white,
              borderWidth: 1,
              borderRadius: 15,
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              style={{ textAlign: "center" }}
              color="black-80"
              fontSize={25}
              fontFamily="Poppins-Medium"
            >
              24
            </Typography>
            <Typography
              fontSize={19}
              fontFamily="Poppins-Regular"
              style={{ textAlign: "center" }}
              color="black-80"
            >
              Favorite
            </Typography>
          </Pressable>
        </View>
      </LinearGradient>
      {/*  */}
      <View style={{ paddingHorizontal: 10, paddingVertical: 20, gap: 10 }}>
        <Pressable
          style={{
            borderBottomWidth: 1,
            flexDirection: "row",
            gap: 10,
            backgroundColor: Colors.white,
            padding: 10,
            borderColor: Colors["line-stroke-30"],
          }}
        >
          <IconFilwArrowDown />
          <Typography
            color="black-80"
            fontSize={18}
            fontFamily="Poppins-Medium"
          >
            Download CV Disnaker
          </Typography>
        </Pressable>
        <Pressable
          style={{
            borderBottomWidth: 1,
            flexDirection: "row",
            gap: 10,
            backgroundColor: Colors.white,
            padding: 10,
            borderColor: Colors["line-stroke-30"],
          }}
          onPress={() => setModalUploadCv(true)}
        >
          <IconFilwArrowUp />
          <Typography
            color="black-80"
            fontSize={18}
            fontFamily="Poppins-Medium"
          >
            Upload CV
          </Typography>
          <View style={{ marginLeft: "auto" }}>
            <IconCaretRight />
          </View>
        </Pressable>
        <Pressable
          style={{
            borderBottomWidth: 1,
            flexDirection: "row",
            gap: 10,
            backgroundColor: Colors.white,
            padding: 10,
            borderColor: Colors["line-stroke-30"],
          }}
          onPress={()=>router.push("/profile")}
        >
          <IconUserProfile />
          <Typography
            color="black-80"
            fontSize={18}
            fontFamily="Poppins-Medium"
          >
            Akun Saya
          </Typography>
          <View style={{ marginLeft: "auto" }}>
            <IconCaretRight />
          </View>
        </Pressable>
      </View>
      {/* Modal Upload CV */}
      <ModalSwipe
        modalVisible={modalUploadCv}
        setModalVisible={setModalUploadCv}
      >
        <View
          style={{
            flexDirection: "column",
            gap: 20,
            height: "auto",
          }}
        >
          <View
            style={{
              width: "100%",
              height: 50,
              borderWidth: 1,
              borderColor: Colors["primary-50"],
              borderRadius: 15,
              overflow: "hidden",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                width: "50%",
                backgroundColor:
                  tabUploadCV === "cv" ? Colors["primary-50"] : Colors.white,
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setTabUploadCV("cv")}
            >
              <Typography
                fontSize={18}
                style={{ textAlignVertical: "center" }}
                color={tabUploadCV === "cv" ? "white" : "primary-50"}
              >
                CV
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "50%",
                backgroundColor:
                  tabUploadCV === "portofolio"
                    ? Colors["primary-50"]
                    : Colors.white,
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setTabUploadCV("portofolio")}
            >
              <Typography
                fontSize={18}
                style={{ textAlignVertical: "center" }}
                color={tabUploadCV === "portofolio" ? "white" : "primary-50"}
              >
                Portofolio
              </Typography>
            </TouchableOpacity>
          </View>
          {
            tabUploadCV === "cv" && (
              <UploadFile label="Upload CV" />
            )}
          {
            tabUploadCV === "portofolio" && (
              <UploadFile label="Upload Portofolio" />
            )}
          <Button>Simpan</Button>
        </View>
      </ModalSwipe>
    </View>
  );
}
