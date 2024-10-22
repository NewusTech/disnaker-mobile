import { getConsultation, getConsultationById } from "@/api";
import { useAccessToken } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

export const useGetConsultation = (search: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetConsultation", search, accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getConsultation(search),
    enabled: !!accessToken,
  });
};

export const useGetConsultationById = (id: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetConsultationById", id, accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getConsultationById(id),
    enabled: !!accessToken,
  });
};
