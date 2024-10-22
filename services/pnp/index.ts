import { getPnp } from "@/api";
import { useAccessToken } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

export const useGetPnp = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetPnp", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getPnp(),
  });
};
