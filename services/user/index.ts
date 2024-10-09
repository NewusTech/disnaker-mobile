import { AxiosError } from "axios";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserProfile,
  postLogin,
  postRegister,
  postUserLink,
  putAbout,
  putEditProfile,
  ResponseError,
} from "@/api";
import {
  PostLoginPayload,
  PostRegisterPayload,
  profileForm,
  userAboutForm,
  userLinkForm,
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
    mutationFn: (payload: { data: FormData; slug: string }) =>
      putEditProfile(payload.data, payload.slug),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const usePostLiks = () => {
  return useMutation({
    mutationFn: (payload: userLinkForm) => postUserLink(payload),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useUpdateAbout = () => {
  return useMutation({
    mutationFn: (payload: { data: userAboutForm; slug: string }) =>
      putAbout(payload.data, payload.slug),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};
