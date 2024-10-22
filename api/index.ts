import { API_URL } from "@/constants";
import apiClient from "@/lib/fatcher";
import { getAccessToken } from "@/store/userStore";
import {
  PostLoginPayload,
  PostRegisterPayload,
  userAboutForm,
  userExperienceForm,
  userLinkForm,
  userOrganizationForm,
} from "@/validation";
import { HttpStatusCode } from "axios";

export * from "@/api/vacancy";
export * from "@/api/user";

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
      provinsi: string | null;
      kabupaten: string | null;
      kecamatan: string | null;
      kelurahan: string | null;
      loclocation: string | null;
      createdAt: string;
      updatedAt: string;
      location: string;
      kk: string | null;
      ktp: string | null;
    };
    UserOrganizations: organizationHistoryIdResponseSuccess["data"];
    Skills: SkillsResponseSuccess["data"];
    UserCertificates: SertificateResponseSuccess["data"];
    UserLinks: userLinkResponseSuccess["data"];
    UserExperiences: ExperienceHistoryResponseSuccess["data"];
    UserEducationHistories: educationHistoryResponseSuccess["data"];
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

export const putFotoProfile = async (payload: FormData, slug: string) => {
  const accessToken = getAccessToken();
  try {
    const response = await fetch(
      `${API_URL}/user/image-profile/update/${slug}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: payload,
      }
    );

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
  data: userLinkByIdResponseSuccess["data"][];
};

export const getUserLink = async () => {
  const response = await apiClient<userLinkResponseSuccess>({
    method: "GET",
    url: "/user/link/get",
  });
  return response.data;
};

export type userLinkByIdResponseSuccess = {
  status: 200;
  message: "Success Get User Profiles";
  data: {
    id: number;
    user_id: number;
    link: string;
    linkType: string;
    createdAt: string;
    updatedAt: string;
  };
};

export const getUserLinkById = async (id: string) => {
  const response = await apiClient<userLinkByIdResponseSuccess>({
    method: "GET",
    url: "/user/link/get/" + id,
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
export const putUserLink = async (payload: userLinkForm, id: string) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "PUT",
    url: "/user/link/update/" + id,
    data: payload,
  });
  return response.data;
};
export const deleteUserLink = async (id: string) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "DELETE",
    url: "/user/link/delete/" + id,
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

export const postSertificate = async (payload: FormData) => {
  const accessToken = getAccessToken();
  try {
    const response = await fetch(`${API_URL}/user/certificate/create`, {
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
      throw new Error(
        errorData.message || "Gagal Menambah Sertificate History."
      );
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
export const putSertificate = async (payload: FormData, id: string) => {
  const accessToken = getAccessToken();
  try {
    const response = await fetch(`${API_URL}/user/certificate/update/${id}`, {
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
      throw new Error(
        errorData.message || "Gagal Mengupdate Sertificate History."
      );
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

export const deleteSertificate = async (id: string) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "DELETE",
    url: "/user/certificate/delete/" + id,
  });
  return response.data;
};

export type SertificateResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: SertificateByIdResponseSuccess["data"][];
};
export const getSertificate = async () => {
  const response = await apiClient<SertificateResponseSuccess>({
    method: "GET",
    url: "/user/certificate/get",
  });
  return response.data;
};

export type SertificateByIdResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    user_id: number;
    name: string;
    organization: string;
    file: string | null;
    expiredDate: string;
    isNonExpire: null;
    desc: string;
    updatedAt: string;
    createdAt: string;
  };
};
export const getSertificateById = async (id: string) => {
  const response = await apiClient<SertificateByIdResponseSuccess>({
    method: "GET",
    url: "/user/certificate/get/" + id,
  });
  return response.data;
};

export const postUserApplyVacancy = async (payload: { vacancy_id: string }) => {
  const response = await apiClient<PostResponseSuccess>({
    method: "POST",
    url: "/application/create",
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
    };
  }[];
};
export const getUserHistoryApplication = async () => {
  const response = await apiClient<UserHistoryApplicationResponseSuccess>({
    method: "GET",
    url: "/user/application/get",
  });
  return response.data;
};

export type UserSavedVacancyResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    user_id: number;
    vacancy_id: number;
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
    };
  }[];
};
export const getUserSavedVacancy = async () => {
  const response = await apiClient<UserSavedVacancyResponseSuccess>({
    method: "GET",
    url: "/user/savedvacancy/get",
  });
  return response.data;
};

export const postUserSaveVacancy = async (payload: { vacancy_id: string }) => {
  const response = await apiClient<
    PostResponseSuccess & { data: { vacancy_id: number } }
  >({
    method: "POST",
    url: "/user/savevacancy",
    data: payload,
  });
  return response.data;
};
export const deleteUserSaveVacancy = async (payload: {
  vacancy_id: string;
}) => {
  const response = await apiClient<
    PostResponseSuccess & { data: { vacancy_id: number } }
  >({
    method: "DELETE",
    url: "/user/unsavevacancy",
    data: payload,
  });
  return response.data;
};

export type ArticleResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    title: string;
    slug: string;
    desc: string;
    image: string;
    kategori_id: number;
    createdAt: string;
    updatedAt: string;
    Kategoriartikel: {
      id: number;
      title: string;
    };
  }[];
};
export const getArticle = async (search: string) => {
  const response = await apiClient<ArticleResponseSuccess>({
    method: "GET",
    url: `/artikel/get?search=${search ?? ""}`,
  });
  return response.data;
};

export type ArticleBySlugResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    title: string;
    slug: string;
    desc: string;
    image: string;
    kategori_id: number;
    createdAt: string;
    updatedAt: string;
    Kategoriartikel: {
      id: number;
      title: string;
    };
  };
};
export const getArticleBySlug = async (slug: string) => {
  const response = await apiClient<ArticleBySlugResponseSuccess>({
    method: "GET",
    url: "/artikel/get/" + slug,
  });
  return response.data;
};

export type EventResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    title: string;
    slug: string;
    desc: string;
    category_id: string | null;
    image: string | null;
    startDate: string | null;
    endDate: string | null;
    regisLink: string | null;
    phoneNumber: string | null;
    time: string | null;
    location: string | null;
    VacancyCategory: string | null;
    createdAt: string;
    updatedAt: string;
  }[];
};
export const getEvent = async (search: string) => {
  const response = await apiClient<EventResponseSuccess>({
    method: "GET",
    url: `/event/get?search=${search ?? ""}`,
  });
  return response.data;
};

export type EventBySlugResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    title: string;
    slug: string;
    desc: string;
    category_id: string | null;
    image: string | null;
    startDate: string | null;
    endDate: string | null;
    regisLink: string | null;
    phoneNumber: string | null;
    time: string | null;
    location: string | null;
    VacancyCategory: string | null;
    createdAt: string;
    updatedAt: string;
  };
};
export const getEventBySlug = async (slug: string) => {
  const response = await apiClient<EventBySlugResponseSuccess>({
    method: "GET",
    url: "/event/get/" + slug,
  });
  return response.data;
};

export const putCvPortofolio = async (payload: FormData, slug: string) => {
  const accessToken = getAccessToken();
  try {
    const response = await fetch(
      `${API_URL}/user/cv-portfolio/upload/${slug}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: payload,
      }
    );

    // Periksa apakah respons sukses (status 2xx)
    if (!response.ok) {
      // Jika tidak sukses, ambil pesan error
      const errorData = await response.json();
      // Buat error baru dengan pesan dari respons
      throw new Error(errorData.message || "Gagal Mengupdate CV Portofolio.");
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

export type TrainingResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    company_id: number;
    category_id: number;
    title: string;
    desc: string;
    location: string;
    quota: number;
    startDate: string;
    endDate: string;
    time: string;
    linkModule: string;
    phoneNumber: string;
    level: string;
    regisLink: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    Company: {
      id: number;
      name: string;
    };
    VacancyCategory: {
      id: number;
      name: string;
    };
  }[];
};
export const getTraining = async (search: string) => {
  const response = await apiClient<TrainingResponseSuccess>({
    method: "GET",
    url: `/training/get?search=${search ?? ""}`,
  });
  return response.data;
};

export type TrainingByIdResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    company_id: number;
    category_id: number;
    title: string;
    desc: string;
    location: string;
    quota: number;
    startDate: string;
    endDate: string;
    time: string;
    linkModule: string;
    phoneNumber: string;
    level: string;
    regisLink: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    Company: {
      id: number;
      name: string;
    };
    VacancyCategory: {
      id: number;
      name: string;
    };
  };
};
export const getTrainingById = async (id: string) => {
  const response = await apiClient<TrainingByIdResponseSuccess>({
    method: "GET",
    url: "/training/get/" + id,
  });
  return response.data;
};

export type CertificationResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    company_id: number;
    category_id: number;
    title: string;
    desc: string;
    location: string;
    quota: number;
    startDate: string;
    endDate: string;
    time: string;
    linkModule: string;
    phoneNumber: string;
    level: string;
    regisLink: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    Company: {
      id: number;
      name: string;
    };
    VacancyCategory: {
      id: number;
      name: string;
    };
  }[];
};
export const getCertification = async (search: string) => {
  const response = await apiClient<CertificationResponseSuccess>({
    method: "GET",
    url: `/certification/get?search=${search ?? ""}`,
  });
  return response.data;
};

export type CertificationByIdResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    company_id: number;
    category_id: number;
    title: string;
    desc: string;
    location: string;
    quota: number;
    startDate: string;
    endDate: string;
    time: string;
    linkModule: string;
    phoneNumber: string;
    level: string;
    regisLink: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    Company: {
      id: number;
      name: string;
    };
    VacancyCategory: {
      id: number;
      name: string;
    };
  };
};
export const getCertificationById = async (id: string) => {
  const response = await apiClient<CertificationByIdResponseSuccess>({
    method: "GET",
    url: "/certification/get/" + id,
  });
  return response.data;
};

export type TncResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    desc: string;
    createdAt: string;
    updatedAt: string;
  };
};
export const getTnc = async () => {
  const response = await apiClient<TncResponseSuccess>({
    method: "GET",
    url: "/snk/get",
  });
  return response.data;
};

export type PnpResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    desc: string;
    createdAt: string;
    updatedAt: string;
  };
};
export const getPnp = async () => {
  const response = await apiClient<PnpResponseSuccess>({
    method: "GET",
    url: "/pnp/get",
  });
  return response.data;
};

export type ConsultationResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    company_id: number;
    category_id: number;
    title: string;
    desc: string;
    location: string;
    quota: number;
    startDate: string;
    endDate: string;
    time: string;
    phoneNumber: string;
    regisLink: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    Company: {
      id: number;
      name: string;
    };
    VacancyCategory: {
      id: number;
      name: string;
    };
  }[];
};
export const getConsultation = async (search: string) => {
  const response = await apiClient<ConsultationResponseSuccess>({
    method: "GET",
    url: `/consultation/get?search=${search ?? ""}`,
  });
  return response.data;
};

export type ConsultationByIdResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    company_id: number;
    category_id: number;
    title: string;
    desc: string;
    location: string;
    quota: number;
    startDate: string;
    endDate: string;
    time: string;
    phoneNumber: string;
    regisLink: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    Company: {
      id: number;
      name: string;
    };
    VacancyCategory: {
      id: number;
      name: string;
    };
  };
};
export const getConsultationById = async (id: string) => {
  const response = await apiClient<ConsultationByIdResponseSuccess>({
    method: "GET",
    url: "/consultation/get/" + id,
  });
  return response.data;
};

export type UserNotificationResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    user_id: number;
    vacancy_id: number;
    createdAt: string;
    status: string;
    isReading: string;
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
    };
  }[];
};
export const getUserNotification = async () => {
  const response = await apiClient<UserNotificationResponseSuccess>({
    method: "GET",
    url: "/user/invitation/get",
  });
  return response.data;
};

export type UserNotificationByIdResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    user_id: number;
    vacancy_id: number;
    createdAt: string;
    status: string;
    isReading: string;
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
    };
  };
};
export const getUserNotificationById = async () => {
  const response = await apiClient<UserNotificationByIdResponseSuccess>({
    method: "GET",
    url: "/user/invitation/get",
  });
  return response.data;
};

export type InformationResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    desc: string;
    createdAt: string;
    updatedAt: string;
  }[];
};
export const getInformation = async (search: string) => {
  const response = await apiClient<InformationResponseSuccess>({
    method: "GET",
    url: `/information/get?search=${search ?? ""}`,
  });
  return response.data;
};

export type InformationByIdResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    desc: string;
    createdAt: string;
    updatedAt: string;
  };
};
export const getInformationById = async (id: string) => {
  const response = await apiClient<InformationByIdResponseSuccess>({
    method: "GET",
    url: "/information/get/" + id,
  });
  return response.data;
};

export type FacilityResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    title: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  }[];
};
export const getFacility = async () => {
  const response = await apiClient<FacilityResponseSuccess>({
    method: "GET",
    url: "/facility/get",
  });
  return response.data;
};

export type provinsiResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    name: string;
  }[];
};

export const getProvinsi = async () => {
  const response = await apiClient<provinsiResponseSuccess>({
    method: "GET",
    url: "/region/provinsi/get",
  });
  return response.data;
};
export type kabupatenResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    provinsi_id: number;
    name: string;
  }[];
};

export const getKabupaten = async () => {
  const response = await apiClient<kabupatenResponseSuccess>({
    method: "GET",
    url: "/region/kabupaten/get?limit=1000",
  });
  return response.data;
};
export type kecamatanResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    kabupaten_id: number;
    name: string;
  }[];
};

export const getKecamatan = async () => {
  const response = await apiClient<kecamatanResponseSuccess>({
    method: "GET",
    url: "region/kecamatan/get?limit=1000",
  });
  return response.data;
};

export type kelurahanResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    kabupaten_id: number;
    name: string;
  }[];
};

export const getKelurahan = async () => {
  const response = await apiClient<kelurahanResponseSuccess>({
    method: "GET",
    url: "region/kelurahan/get?limit=1000",
  });
  return response.data;
};
