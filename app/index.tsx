import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import View from "@/components/view";
import Loader from "@/components/loader";
import { getItem } from "@/lib/async-storage";

export default function InitialScreen() {
  const router = useRouter();
  const navigation = useNavigation<any>();

//   const { setAccessToken, setProfile } = useAuthActions();


  useEffect(() => {
    const initAuth = async () => {
      const storageAccessToken = await getItem ("accesstoken");

    //   if (storageAccessToken) {
    //     setAccessToken(storageAccessToken);
    //   } else {
    //     router.replace("/auth/initial");
    //   }
        router.replace("/(public)/onboard")
    };

    initAuth();
  }, [router]);

//   useEffect(() => {
//     if (profileQuery.data) {
//       navigation.reset({
//         index: 0,
//         routes: [{ name: "(authenticated)" }],
//       });
//       setProfile(profileQuery.data.data);
//     } else if (profileQuery.error) {
//       setAccessToken(null);
//       router.replace("/auth/initial");
//     }
//   }, [
//     router,
//     navigation,
//     setAccessToken,
//     setProfile,
//   ]);


  return (
    <View style={style.container}>
      <Loader/>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
