import { API_URL } from "@/constants";
import { handleLogoutSession } from "@/services/auth.service";
import { getAccessToken } from "@/store/userStore";
import {
  PostLoginPayload,
  PostRegisterPayload,
  profileForm,
} from "@/validation";
import axios, {
  AxiosError,
  AxiosResponse,
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
    };
    UserOrganizations: [];
    Skills: [];
    UserCertificates: [];
    UserLinks: {
      id: number;
      user_id: number;
      link: string;
      linkType: string;
      createdAt: string;
      updatedAt: string;
    }[];
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

export const putEditProfile = async (payload: profileForm, slug: string) => {
  const response = await apiClient<PostLoginResponseSuccess>({
    method: "PUT",
    url: "/user/profile/update/" + slug,
    data: payload,
  });
  return response.data;
};

