import apiClient from "@/lib/fatcher";
import { HttpStatusCode } from "axios";

export type vacancyByIdResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    title: string;
    slug: string;
    workLocation: string;
    jobType: string;
    desc: string;
    applicationDeadline: string;
    isPublished: string;
    category_id: number;
    company_id: number;
    responsibility: string;
    requirement: string;
    location: string | null;
    gender: string;
    minExperience: number;
    maxAge: number;
    workingDay: string;
    workingHour: string;
    salary: string;
    createdAt: string;
    updatedAt: string;
    Company: {
      id: number;
      name: string;
      imageLogo: string;
      imageBanner: string;
      desc: string;
      address: string;
      numberEmployee: number;
      website: string;
      instagram: string;
    };
    VacancyCategory: {
      id: number;
      name: string;
    };
    EducationLevels: {
      id: number;
      level: string;
      createdAt: string;
      updatedAt: string;
      VacancyEducationLevel: {
        vacancy_id: 4;
        educationLevel_id: 6;
        createdAt: string;
        updatedAt: string;
      };
    }[];
    Skills: {
      id: number;
      name: string;
      createdAt: string;
      updatedAt: string;
    }[];
  };
};

export const getVacancyBySlug = async (slug: string) => {
  const response = await apiClient<vacancyByIdResponseSuccess>({
    method: "GET",
    url: "/vacancy/get/" + slug,
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
    salary: string;
    location: null;
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
    EducationLevels: {
      id: number;
      level: string;
      createdAt: string;
      updatedAt: string;
      VacancyEducationLevel: {
        vacancy_id: 4;
        educationLevel_id: 6;
        createdAt: string;
        updatedAt: string;
      };
    }[];
  }[];
};

export const getVacancy = async (query?: string) => {
  const response = await apiClient<vacancyResponseSuccess>({
    method: "GET",
    url: `/vacancy/get?${query ?? ""}`,
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

export const getVacancyUrgent = async () => {
  const response = await apiClient<vacancyResponseSuccess>({
    method: "GET",
    url: `/user/vacancy/urgent`,
  });
  return response.data;
};

export const getVacancyRecomendation = async () => {
  const response = await apiClient<vacancyResponseSuccess>({
    method: "GET",
    url: `user/vacancy/recomendation`,
  });
  return response.data;
};

export type MasterSkillsResponseSuccess = {
  status: HttpStatusCode;
  message: string;
  data: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  }[];
};
export const getMasterSkills = async () => {
  const response = await apiClient<MasterSkillsResponseSuccess>({
    method: "GET",
    url: "/skill/get",
  });
  return response.data;
};
