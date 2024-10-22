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
export const useGetkecamatan = (kabupaten_id: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetkecamatan", kabupaten_id, accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getKecamatan(kabupaten_id),
    enabled: !!accessToken,
  });
};
export const useGetkelurahan = (kecamatan_id: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetkelurahan", kecamatan_id, accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getKelurahan(kecamatan_id),
    enabled: !!accessToken,
  });
};
