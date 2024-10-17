import { getKabupaten, getKecamatan, getKelurahan, getProvinsi } from "@/api";
import { useAccessToken } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

export const useGetProvinsi = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetProvinsi", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getProvinsi(),
    enabled: !!accessToken,
  });
};
export const useGetKabupaten = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetKabupaten", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getKabupaten(),
    enabled: !!accessToken,
  });
};
export const useGetkecamatan = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetkecamatan", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getKecamatan(),
    enabled: !!accessToken,
  });
};
export const useGetkelurahan = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetkelurahan", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getKelurahan(),
    enabled: !!accessToken,
  });
};
