import { getTnc } from "@/api";
import { useAccessToken } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

export const useGetTnc = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetTnc", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getTnc(),
    enabled: !!accessToken,
  });
};
