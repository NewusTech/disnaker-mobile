import { getVacancy, getVacancyCategory } from "@/api";
import { useAccessToken } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

export const useGetVacancy = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetVacancy", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getVacancy(),
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
