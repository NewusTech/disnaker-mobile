import { getInformation, getInformationById } from "@/api";
import { useAccessToken } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

export const useGetInformation = (query?: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetInformation", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getInformation(),
    enabled: !!accessToken,
  });
};

export const useGetInformationBySlug = (slug: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetInformationBySlug", slug, accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getInformationById(slug),
    enabled: !!accessToken,
  });
};
