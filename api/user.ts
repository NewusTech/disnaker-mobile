import { API_URL } from "@/constants";
import apiClient from "@/lib/fatcher";
import { getAccessToken } from "@/store/userStore";
import {
  userRegisterYellowCardForm,
  userUpdatePasswordForm,
} from "@/validation";
import { HttpStatusCode } from "axios";
import { PostResponseSuccess } from ".";

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
  status: HttpStatusCode;
  message: "Success Get User Profiles";
  data: userComplaintByIdResponseSuccess["data"][];
};

export const getUserComplaint = async () => {
  const response = await apiClient<userComplaintResponseSuccess>({
    method: "GET",
    url: "/complaint/get?limit=1000",
  });
  return response.data;
};

export const postUserRegisterYellowCard = async (
  payload: userRegisterYellowCardForm
) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "POST",
    url: "/yellowcard/create",
    data: payload,
  });

  return response.data;
};

export type userYellowCardResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    user_id: number;
    residance: string;
    submissionNumber: string;
    provinsi: string;
    kabupaten: string;
    kecamatan: string;
    kelurahan: string;
    educationLevel_id: number;
    job: string;
    skill: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    User: {
      id: number;
      UserProfile: {
        id: number;
        name: string;
        nik: string;
        birthDate: string;
        slug: string;
        department: string;
        gender: string;
        address: string;
        phoneNumber: string;
        about: string;
        cv: string;
        portfolio: string;
        birthPlace: string;
        religion: string;
        provinsi: string | null;
        kabupaten: string | null;
        kecamatan: string | null;
        kelurahan: string | null;
        location: string | null;
        profession: string;
        image: string | null;
        kk: string | null;
        ktp: string | null;
        employmentStatus: string;
        maritalStatus: string;
        citizenship: string;
      };
    };
  }[];
};

export const getUserYellowCard = async () => {
  const response = await apiClient<userYellowCardResponseSuccess>({
    method: "GET",
    url: "/yellowcard/get?limit=1000",
  });
  return response.data;
};

export type userYellowCardByIdResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    user_id: number;
    residance: string;
    submissionNumber: string;
    provinsi: string;
    kabupaten: string;
    kecamatan: string;
    kelurahan: string;
    educationLevel_id: number;
    job: string;
    skill: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    User: {
      id: number;
      UserProfile: {
        id: number;
        name: string;
        nik: string;
        birthDate: string;
        slug: string;
        department: string;
        gender: string;
        address: string;
        phoneNumber: string;
        about: string;
        cv: string;
        portfolio: string;
        birthPlace: string;
        religion: string;
        location: string | null;
        profession: string;
        image: string | null;
        kk: string | null;
        ktp: string | null;
        employmentStatus: string;
        maritalStatus: string;
        citizenship: string;
      };
    };
  };
};

export const getUserYellowCardById = async (id: string) => {
  const response = await apiClient<userYellowCardByIdResponseSuccess>({
    method: "GET",
    url: "/yellowcard/get/" + id,
  });
  return response.data;
};

export const postUserTransmigration = async (payload: any) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "POST",
    url: "/transmigration/create",
    data: payload,
  });

  return response.data;
};

export type userTransmigrationResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    user_id: number;
    submissionNumber: string;
    domicile: string;
    provinsi: string;
    kabupaten: string;
    kecamatan: string;
    kelurahan: string;
    status: string;
    kk: string;
    createdAt: string;
    updatedAt: string;
    User: {
      id: number;
      UserProfile: {
        id: number;
        name: string;
        nik: string;
        birthDate: string;
        slug: string;
        department: string;
        gender: string;
        address: string;
        phoneNumber: string;
        about: string;
        cv: string;
        portfolio: string;
        birthPlace: string;
        religion: string;
        provinsi: string | null;
        kabupaten: string | null;
        kecamatan: string | null;
        kelurahan: string | null;
        location: string | null;
        profession: string;
        image: string | null;
        kk: string | null;
        ktp: string | null;
        employmentStatus: string;
        maritalStatus: string;
        citizenship: string;
      };
    };
  }[];
};

export const getUserTransmigration = async () => {
  const response = await apiClient<userTransmigrationResponseSuccess>({
    method: "GET",
    url: "/transmigration/get?limit=1000",
  });
  return response.data;
};

export type userTransmigrationByIdResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    user_id: number;
    submissionNumber: string;
    domicile: string;
    provinsi: string;
    kabupaten: string;
    kecamatan: string;
    kelurahan: string;
    status: string;
    kk: string;
    createdAt: string;
    updatedAt: string;
    User: {
      id: number;
      UserProfile: {
        id: number;
        name: string;
        nik: string;
        birthDate: string;
        slug: string;
        department: string;
        gender: string;
        address: string;
        phoneNumber: string;
        about: string;
        cv: string;
        portfolio: string;
        birthPlace: string;
        religion: string;
        provinsi: string | null;
        kabupaten: string | null;
        kecamatan: string | null;
        kelurahan: string | null;
        location: string | null;
        profession: string;
        image: string | null;
        kk: string | null;
        ktp: string | null;
        employmentStatus: string;
        maritalStatus: string;
        citizenship: string;
      };
    };
    TransmigrationMembers: {
      id: number;
      transmigration_id: number;
      nik: string;
      name: string;
      gender: string;
      familyStatus: string;
      createdAt: string;
      updatedAt: string;
    }[];
  };
};

export const getUserTransmigrationById = async (id: string) => {
  const response = await apiClient<userTransmigrationByIdResponseSuccess>({
    method: "GET",
    url: "/transmigration/get/" + id,
  });
  return response.data;
};

export const postUserUpdatePassword = async (
  payload: userUpdatePasswordForm,
  slug: string
) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "POST",
    url: "/user/password/change/" + slug,
    data: payload,
  });

  return response.data;
};

export type UserHistoryApplicationResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    user_id: number;
    vacancy_id: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    Vacancy: {
      id: number;
      category_id: number;
      company_id: number;
      title: string;
      slug: string;
      desc: string;
      responsibility: string;
      requirement: string;
      location: string;
      gender: string;
      minExperience: number;
      maxAge: number;
      workingDay: string;
      workingHour: string;
      jobType: string;
      workLocation: string;
      isPublished: string;
      applicationDeadline: string;
      salary: string;
      createdAt: string;
      updatedAt: string;
      EducationLevels: {
        id: number;
        level: string;
        VacancyEducationLevel: {
          vacancy_id: number;
          educationLevel_id: number;
          createdAt: string;
          updatedAt: string;
        };
      }[];
      Company: {
        id: number;
        user_id: number;
        department: string;
        name: string;
        desc: string;
        address: string;
        numberEmployee: number;
        website: string;
        phone: string | null;
        linkedin: string | null;
        instagram: string;
        imageLogo: string;
        imageBanner: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  }[];
};
export const getUserHistoryApplication = async () => {
  const response = await apiClient<UserHistoryApplicationResponseSuccess>({
    method: "GET",
    url: "/user/application/get?limit=1000",
  });
  return response.data;
};

export const putUserInvitation = async (
  payload: {
    status: string;
  },
  id: string
) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "PUT",
    url: `/user/invitation/update/${id}`,
    data: payload,
  });

  return response.data;
};

export const putUserNotification = async (id: string) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "PUT",
    url: `/user/notification/update/${id}`,
  });

  return response.data;
};

export const postUserSkm = async (payload: any) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "POST",
    url: "/skm/create",
    data: payload,
  });

  return response.data;
};
