import { removeItem } from "@/lib/async-storage";
import { getAuthActions } from "@/store/userStore";
import Toast from "react-native-toast-message";

export const handleLogoutSession = async () => {
  const { clearAuthSession } = getAuthActions();
  clearAuthSession();
  await removeItem("accesstoken");
  await removeItem("profile");

  Toast.show({ text1: "Loging Out", text2: "Berhasil Logout" });
};
