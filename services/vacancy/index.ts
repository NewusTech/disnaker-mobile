import { getVacancy, getVacancyBySlug, getVacancyCategory } from "@/api";
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
