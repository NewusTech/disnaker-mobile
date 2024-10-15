import { getCertification, getCertificationById } from "@/api";
import { useAccessToken } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

export const useGetCertification = (query?: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetCertification", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getCertification(),
    enabled: !!accessToken,
  });
};

export const useGetCertificationgById = (id: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetCertificationgById", id, accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getCertificationById(id),
    enabled: !!accessToken,
  });
};
