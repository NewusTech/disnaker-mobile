import { AxiosError } from "axios";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserProfile,
  postLogin,
  postRegister,
  putEditProfile,
  ResponseError,
} from "@/api";
import {
  PostLoginPayload,
  PostRegisterPayload,
  profileForm,
} from "@/validation";
import { useAccessToken } from "@/store/userStore";

export const useAuthLogin = () => {
  return useMutation({
    mutationFn: (payload: PostLoginPayload) => postLogin(payload),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useAuthRegister = () => {
  return useMutation({
    mutationFn: (payload: PostRegisterPayload) => postRegister(payload),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useGetProfile = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetProfile", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getUserProfile(),
    enabled: !!accessToken,
  });
};

export const useUpdatePrfoile = () => {
  return useMutation({
    mutationFn: (payload: { data: profileForm; slug: string }) =>
      putEditProfile(payload.data, payload.slug),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const usePostLiks = () => {
  return useMutation({
    mutationFn: (payload: { data: profileForm; slug: string }) =>
      putEditProfile(payload.data, payload.slug),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};
