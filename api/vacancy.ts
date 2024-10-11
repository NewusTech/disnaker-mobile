import { HttpStatusCode } from "axios";
import { apiClient } from ".";

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
    VacancySkills: {
      id: number;
      vacancy_id: number;
      skill_id: number;
      Skill: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
      };
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

export const getVacancy = async () => {
  const response = await apiClient<vacancyResponseSuccess>({
    method: "GET",
    url: "/vacancy/get",
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
