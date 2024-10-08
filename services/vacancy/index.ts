import { getVacancy } from "@/api";
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
