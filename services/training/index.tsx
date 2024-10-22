import { getTraining, getTrainingById } from "@/api";
import { useAccessToken } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

export const useGetTraining = (search: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetTraining", search, accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getTraining(search),
    enabled: !!accessToken,
  });
};

export const useGetTrainingById = (id: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetTrainingById", id, accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getTrainingById(id),
    enabled: !!accessToken,
  });
};
