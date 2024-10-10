import { API_URL } from "@/constants";
import { handleLogoutSession } from "@/services/auth.service";
import { getAccessToken } from "@/store/userStore";
import {
  PostLoginPayload,
  PostRegisterPayload,
  userAboutForm,
  userExperience,
  userExperienceForm,
  userLinkForm,
  userOrganizationForm,
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
    UserOrganizations: organizationHistoryIdResponseSuccess["data"];
    Skills: SkillsResponseSuccess["data"];
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

export type educationHistoryResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: educationHistoryByIdResponseSuccess["data"][];
};

export const getEducationHistory = async () => {
  const response = await apiClient<educationHistoryResponseSuccess>({
    method: "GET",
    url: "/user/education/get/",
  });
  return response.data;
};

export type educationLevelResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    level: string;
  }[];
};

export const getEducationLevel = async () => {
  const response = await apiClient<educationLevelResponseSuccess>({
    method: "GET",
    url: "/education-level/get/",
  });
  return response.data;
};

export type educationHistoryByIdResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    user_id: number;
    educationLevel_id: number;
    instanceName: string;
    department: string;
    gpa: string;
    joinDate: string;
    graduationDate: string;
    desc: string;
    ijazah: string;
    transkrip: string;
    createdAt: string;
    updatedAt: string;
  };
};
export const getEducationHistoryById = async (id: string) => {
  const response = await apiClient<educationHistoryByIdResponseSuccess>({
    method: "GET",
    url: "/user/education/get/" + id,
  });
  return response.data;
};

export const postEducationHistory = async (payload: FormData) => {
  const accessToken = getAccessToken();
  try {
    const response = await fetch(`${API_URL}/user/education/create`, {
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
      throw new Error(errorData.message || "Gagal Menambah Education History.");
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
export const putEducationHistory = async (payload: FormData, id: number) => {
  const accessToken = getAccessToken();
  try {
    const response = await fetch(`${API_URL}/user/education/update/${id}`, {
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
      throw new Error(errorData.message || "Gagal Menambah Education History.");
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

export const deleteEducationHistory = async (id: string) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "DELETE",
    url: "/user/education/delete/" + id,
  });
  return response.data;
};

export type organizationHistoryByIdResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    user_id: number;
    name: string;
    organizationName: string;
    joinDate: string;
    leaveDate: string | null;
    desc: string;
    isCurrently: string;
    createdAt: string;
    updatedAt: string;
  };
};
export const getOrganizationHistoryById = async (id: string) => {
  const response = await apiClient<organizationHistoryByIdResponseSuccess>({
    method: "GET",
    url: "/user/organization/get/" + id,
  });
  return response.data;
};

export type organizationHistoryIdResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: organizationHistoryByIdResponseSuccess["data"][];
};

export const getOrganizationHistory = async () => {
  const response = await apiClient<organizationHistoryIdResponseSuccess>({
    method: "GET",
    url: "/user/organization/get?limit=100",
  });
  return response.data;
};

export const postOrganizationHistory = async (
  payload: userOrganizationForm
) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "POST",
    url: "/user/organization/create",
    data: payload,
  });
  return response.data;
};

export const putOrganizationHistory = async (
  payload: userOrganizationForm,
  id: string
) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "PUT",
    url: "/user/organization/update/" + id,
    data: payload,
  });
  return response.data;
};

export const deleteOrganizationHistory = async (id: string) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "DELETE",
    url: "/user/organization/delete/" + id,
  });
  return response.data;
};

export type ExperienceHistoryByIdResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    user_id: number;
    title: string;
    possition: string;
    companyName: string;
    contractType: string;
    joinDate: string;
    leaveDate: string | null;
    desc: string;
    isCurrently: string;
    createdAt: string;
    updatedAt: string;
  };
};
export const getExperienceHistoryById = async (id: string) => {
  const response = await apiClient<ExperienceHistoryByIdResponseSuccess>({
    method: "GET",
    url: "/user/experience/get/" + id,
  });
  return response.data;
};
export type ExperienceHistoryResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: ExperienceHistoryByIdResponseSuccess["data"][];
};
export const getExperienceHistory = async () => {
  const response = await apiClient<ExperienceHistoryResponseSuccess>({
    method: "GET",
    url: "/user/experience/get",
  });
  return response.data;
};
export const postExperienceHistory = async (payload: userExperienceForm) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "POST",
    url: "/user/experience/create",
    data: payload,
  });
  return response.data;
};

export const putExperienceHistory = async (
  payload: userExperienceForm,
  id: string
) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "PUT",
    url: "/user/experience/update/" + id,
    data: payload,
  });
  return response.data;
};

export const deleteExperienceHistory = async (id: string) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "DELETE",
    url: "/user/experience/delete/" + id,
  });
  return response.data;
};

export type SkillsResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    UserSkill: {
      user_id: number;
      skill_id: number;
      createdAt: string;
      updatedAt: string;
    };
  }[];
};
export const getSkills = async () => {
  const response = await apiClient<SkillsResponseSuccess>({
    method: "GET",
    url: "/user/skill/get",
  });
  return response.data;
};
export const postUserSkills = async (payload: { skills: number[] }) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "POST",
    url: "/user/skill/create",
    data: payload,
  });
  return response.data;
};
