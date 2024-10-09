import { API_URL } from "@/constants";
import { handleLogoutSession } from "@/services/auth.service";
import { getAccessToken } from "@/store/userStore";
import {
  PostLoginPayload,
  PostRegisterPayload,
  profileForm,
  userAboutForm,
  userLinkForm,
} from "@/validation";
import axios, {
  AxiosError,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from "axios";

const apiClient = axios.create({
  baseURL: API_URL,
});

const requestInterceptor = (config: InternalAxiosRequestConfig<any>) => {
  const accessToken = getAccessToken();

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

const responseInterceptorSuccess = (response: AxiosResponse) => {
  console.log(response.config.url, {
    type: "api success",
    data: response.data,
  });
  return response;
};

const responseInterceptorError = (error: AxiosError) => {
  const accessToken = getAccessToken();
  console.error(error.config?.url, error);

  // force logout user if got status 401 Unauthorized
  if (error.response?.status === 401 && accessToken) {
    handleLogoutSession();
  }

  return Promise.reject(error);
};

apiClient.interceptors.request.use(requestInterceptor);
apiClient.interceptors.response.use(
  responseInterceptorSuccess,
  responseInterceptorError
);

export type PostLoginResponseSuccess = {
  data: {
    token: string;
    type: "bearer";
  };
};
export type PostResponseSuccess = {
  status: HttpStatusCode;
  message: string;
};

export type ResponseError = {
  message: string;
  status: string;
  data?: {
    type: string;
    message: string;
    field: string;
  }[];
};

export const postLogin = async (payload: PostLoginPayload) => {
  const response = await apiClient<PostLoginResponseSuccess>({
    method: "POST",
    url: "/login",
    data: payload,
  });

  return response.data;
};

export const postRegister = async (payload: PostRegisterPayload) => {
  const response = await apiClient({
    method: "POST",
    url: "/register",
    data: payload,
  });

  return response.data;
};

export type userProfileResponseSuccess = {
  status: 200;
  message: "Success Get User Profiles";
  data: {
    id: 6;
    email: string;
    UserProfile: {
      id: number;
      user_id: number;
      name: string;
      nik: string | null;
      birthDate: string | null;
      slug: string;
      department: string | null;
      gender: string | null;
      address: string | null;
      phoneNumber: string | null;
      about: string | null;
      cv: string | null;
      image: string | null;
      portfolio: string | null;
      birthPlace: string | null;
      religion: string | null;
      profession: string | null;
      employmentStatus: string | null;
      maritalStatus: string | null;
      citizenship: string | null;
      deletedAt: string | null;
      loclocation: string | null;
      createdAt: string;
      updatedAt: string;
      location: string;
      kk: string | null;
      ktp: string | null;
    };
    UserOrganizations: [];
    Skills: [];
    UserCertificates: [];
    UserLinks: userLinkResponseSuccess["data"];
    UserExperiences: [];
    UserEducationHistories: [];
    favoriteCount: number;
    applicationCount: number;
  };
};

export const getUserProfile = async () => {
  const response = await apiClient<userProfileResponseSuccess>({
    method: "GET",
    url: "/user/profile/get",
  });
  return response.data;
};

export type vacancyResponseSuccess = {
  status: 200;
  message: "Success Get User Profiles";
  data: {
    id: number;
    title: string;
    slug: string;
    workLocation: string;
    jobType: string;
    desc: string;
    applicationDeadline: string;
    isPublished: string;
    createdAt: string;
    updatedAt: string;
    Company: {
      id: number;
      name: string;
      imageLogo: string;
    };
    VacancyCategory: {
      id: number;
      name: string;
    };
  }[];
};

export const getVacancy = async () => {
  const response = await apiClient<vacancyResponseSuccess>({
    method: "GET",
    url: "/vacancy/get",
  });
  return response.data;
};

export const putEditProfile = async (payload: FormData, slug: string) => {
  // const response = await apiClient<PostResponseSuccess>({
  //   method: "PUT",
  //   url: "/user/profile/update/" + slug,
  //   data: payload,
  // });
  // return response.data;
  const accessToken = getAccessToken();
  try {
    const response = await fetch(`${API_URL}/user/profile/update/${slug}`, {
      method: "PUT",
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
      throw new Error(errorData.message || "Gagal memproses update profile.");
    }
    // Respons sukses, kembalikan data JSON
    const result = await response.json();
    return result;
  } catch (error: any) {
    // Tangani error di sini
    console.error(
      `Error saat memproses update profile: ${error.message} - ${error.data}`
    );
    // Kamu bisa mengembalikan error atau menampilkannya ke UI
    throw error;
  }
};

export type userLinkResponseSuccess = {
  status: 200;
  message: "Success Get User Profiles";
  data: {
    id: number;
    user_id: number;
    link: string;
    linkType: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export const getUserLink = async () => {
  const response = await apiClient<userLinkResponseSuccess>({
    method: "GET",
    url: "/user/link/get",
  });
  return response.data;
};

export const postUserLink = async (payload: userLinkForm) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "POST",
    url: "/user/link/create",
    data: payload,
  });
  return response.data;
};

export type vacancyCategoryResponseSuccess = {
  status: 200;
  message: "Success Get User Profiles";
  data: {
    id: number;
    name: string;
  }[];
};

export const getVacancyCategory = async () => {
  const response = await apiClient<vacancyCategoryResponseSuccess>({
    method: "GET",
    url: "/vacancy/category/get/",
  });
  return response.data;
};

export const putAbout = async (payload: userAboutForm, slug: string) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "PUT",
    url: "/user/about/update/" + slug,
    data: payload,
  });
  return response.data;
};
