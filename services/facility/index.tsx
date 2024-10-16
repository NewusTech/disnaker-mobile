import { getFacility } from "@/api";
import { useAccessToken } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

export const useGetFacility = (query?: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetFacility", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getFacility(),
    enabled: !!accessToken,
  });
};
