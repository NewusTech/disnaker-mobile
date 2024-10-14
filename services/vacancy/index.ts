import {
  getMasterSkills,
  getVacancy,
  getVacancyBySlug,
  getVacancyCategory,
  getVacancyRecomendation,
  getVacancyUrgent,
} from "@/api";
import { useAccessToken } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

export const useGetVacancy = (query?: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetVacancy", query, accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getVacancy(query),
    enabled: !!accessToken,
  });
};

export const useGetVacancyCategory = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetVacancyCategory", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getVacancyCategory(),
    enabled: !!accessToken,
  });
};

export const useGetVacancyBySlug = (slug: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetVacancyBySlug", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getVacancyBySlug(slug),
    enabled: !!accessToken,
  });
};

export const useGetVacancyUrgent = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetVacancyUrgent", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getVacancyUrgent(),
    enabled: !!accessToken,
  });
};

export const useGetVacancyRecomend = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetVacancyRecomend", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getVacancyRecomendation(),
    enabled: !!accessToken,
  });
};

export const useGetMasterSkills = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useMasterSkills", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getMasterSkills(),
    enabled: !!accessToken,
  });
};
