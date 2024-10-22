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
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, Image, Pressable, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconLogout } from "@/components/icons/IconLogout";
import { handleLogoutSession } from "@/services/auth.service";
import { useAuthActions, useAuthProfile } from "@/store/userStore";
import { useGetProfile, useUploadCvPortofolio } from "@/services/user";
import ModalAction from "@/components/ui/modalAction";
import { DocumentPickerAsset } from "expo-document-picker";
import Toast from "react-native-toast-message";
import Loader from "@/components/ui/loader";
import { useRoute } from "@react-navigation/native";

export default function Profile() {
  const router = useRouter();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const profileQuery = useGetProfile();

  const { setAccessToken, setProfile } = useAuthActions();

  const userProfile = useAuthProfile();

  const [modalUploadCv, setModalUploadCv] = useState<boolean>(false);
  const [modalLogout, setModalLogout] = useState<boolean>(false);
  const [tabUploadCV, setTabUploadCV] = useState<"cv" | "portofolio">("cv");

  const [fileCv, setFileCv] = useState<DocumentPickerAsset>();
  const [filePortofolio, setFilePortofolio] = useState<DocumentPickerAsset>();

  const uploadCvPortofolio = useUploadCvPortofolio();

  const handleUploadCv = () => {
    const formData = new FormData();

    if (fileCv) {
      formData.append("cv", {
        ...fileCv,
        name: `${userProfile?.UserProfile.slug}-cv.pdf`,
      } as any);
    }
    if (filePortofolio) {
      formData.append("portfolio", {
        ...filePortofolio,
        name: `${userProfile?.UserProfile.slug}-portfolio.pdf`,
      } as any);
    }
    uploadCvPortofolio.mutate(
      {
        data: formData,
        slug: userProfile?.UserProfile.slug || "",
      },
      {
        onSuccess: async (response) => {
          Toast.show({
            type: "success",
            text1: "Upload CV dan Portfolio berhasil!",
            text2: response.message,
          });
          profileQuery.refetch();
          setModalUploadCv(false);
        },
        onError: (reponse) => {
          console.error(reponse);
          Toast.show({
            type: "error",
            text1: "Upload CV dan Portfolio gagal!",
            text2: reponse.response?.data.message,
          });
        },
      }
    );
  };

  const handleLogout = () => {
    handleLogoutSession();
  };

  useEffect(() => {
    if (profileQuery.data) {
      setProfile(profileQuery.data.data);
    } else if (profileQuery.error) {
      setAccessToken(null);
      router.replace("/(public)/onboard/final");
    }
  }, [router, setAccessToken, setProfile, profileQuery.data, route.path]);

  useFocusEffect(
    useCallback(() => {
      console.log("Hello, I am focused!");
      profileQuery.refetch();
      return () => {
        console.log("This route is now unfocused.");
      };
    }, [])
  );

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
        {userProfile?.UserProfile?.image != null ? (
        <Image
          source={ {uri: userProfile.UserProfile.image}}
          style={{ width: 75, height: 75, borderRadius: 100 }}
        />
      ):(
        <Image
          source={require("@/assets/images/dummy1.jpg")}
          style={{ width: 75, height: 75, borderRadius: 100 }}
        />
      )}
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            width: "100%",
          }}
        >
          <Typography
            fontSize={22}
            style={{
              textAlign: "center",
              paddingLeft: 10,
            }}
            color="white"
          >
            {userProfile?.UserProfile.name}
          </Typography>
          <Typography
            fontSize={16}
            fontFamily="Poppins-Light"
            style={{ textAlign: "center", paddingLeft: 10 }}
            color="white"
          >
            {userProfile?.email || "emty@mail.com"}
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
          onPress={() => router.push("/(autenticated)/profile/userProfile")}
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
            onPress={() =>
              router.replace({
                pathname: "/(autenticated)/history",
                params: {
                  tabRiwayat: "Lowongan Pekerjaan",
                },
              })
            }
          >
            <Typography
              style={{ textAlign: "center" }}
              color="white"
              fontSize={25}
              fontFamily="Poppins-Medium"
            >
              {userProfile?.applicationCount}
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
            onPress={() => router.push("/(autenticated)/favorite")}
          >
            <Typography
              style={{ textAlign: "center" }}
              color="black-80"
              fontSize={25}
              fontFamily="Poppins-Medium"
            >
              {userProfile?.favoriteCount}
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
          <IconFilwArrowDown color="black-80" height={30} width={30} />
          <Typography
            color="black-80"
            fontSize={18}
            fontFamily="Poppins-Regular"
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
          <IconFilwArrowUp color="black-80" height={30} width={30} />
          <Typography
            color="black-80"
            fontSize={18}
            fontFamily="Poppins-Regular"
          >
            Upload CV
          </Typography>
          <View style={{ marginLeft: "auto" }}>
            <IconCaretRight color="black-80" height={30} width={30} />
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
          onPress={() => router.push("/(autenticated)/profile/account")}
        >
          <IconUserProfile color="black-80" height={30} width={30} />
          <Typography
            color="black-80"
            fontSize={18}
            fontFamily="Poppins-Regular"
          >
            Akun Saya
          </Typography>
          <View style={{ marginLeft: "auto" }}>
            <IconCaretRight color="black-80" height={30} width={30} />
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
          onPress={() => setModalLogout(true)}
        >
          <IconLogout color="black-80" height={30} width={30} />
          <Typography
            color="black-80"
            fontSize={18}
            fontFamily="Poppins-Regular"
          >
            Logout
          </Typography>
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
          {tabUploadCV === "cv" && (
            <UploadFile
              label={`${fileCv ? " Cv-" + fileCv?.name : "Upload Cv"}`}
              file={fileCv}
              setFile={setFileCv}
              fileUrl={userProfile?.UserProfile.cv}
            />
          )}
          {tabUploadCV === "portofolio" && (
            <UploadFile
              label={`${
                filePortofolio
                  ? " Portofolio-" + filePortofolio?.name
                  : "Upload Portofolio"
              }`}
              file={filePortofolio}
              setFile={setFilePortofolio}
              fileUrl={userProfile?.UserProfile.portfolio}
            />
          )}
          <Button
            disabled={uploadCvPortofolio.isPending}
            onPress={handleUploadCv}
          >
            {uploadCvPortofolio.isPending ? <Loader color="white" /> : "Simpan"}
          </Button>
        </View>
      </ModalSwipe>
      <ModalAction
        title="Yakin Ingin Keluar dari akun ini?"
        isLoading={false}
        onAction={handleLogout}
        setVisible={setModalLogout}
        visible={modalLogout}
      />
    </View>
  );
}
