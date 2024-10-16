import { API_URL } from "@/constants";
import apiClient from "@/lib/fatcher";
import { getAccessToken } from "@/store/userStore";
import { HttpStatusCode } from "axios";

export const postUserComplaint = async (payload: FormData) => {
  const accessToken = getAccessToken();
  try {
    const response = await fetch(`${API_URL}/complaint/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: payload,
    });

    // Periksa apakah respons sukses (status 2xx)
    if (!response.ok) {
      // Jika tidak sukses, ambil pesan error
      const errorData = await response.json();
      // Buat error baru dengan pesan dari respons
      throw new Error(errorData.message || "Gagal");
    }
    // Respons sukses, kembalikan data JSON
    const result = await response.json();
    return result;
  } catch (error: any) {
    // Tangani error di sini
    console.error(
      `Error saat menambah data : ${error.message} - ${error.data}`
    );
    // Kamu bisa mengembalikan error atau menampilkannya ke UI
    throw error;
  }
};

export type userComplaintByIdResponseSuccess = {
  status: 200;
  message: "Success Get User Profiles";
  data: {
    id: number;
    user_id: number;
    submissionNumber: string;
    title: string;
    desc: string;
    response: string | null;
    file: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    User: {
      id: number;
      UserProfile: {
        id: number;
        name: string;
      };
    };
  };
};

export const getUserComplaintById = async (id: string) => {
  const response = await apiClient<userComplaintByIdResponseSuccess>({
    method: "GET",
    url: "/complaint/get/" + id,
  });
  return response.data;
};

export type userComplaintResponseSuccess = {
  status: 200;
  message: "Success Get User Profiles";
  data: userComplaintByIdResponseSuccess["data"][];
};

export const getUserComplaint = async () => {
  const response = await apiClient<userComplaintResponseSuccess>({
    method: "GET",
    url: "/complaint/get/",
  });
  return response.data;
};
