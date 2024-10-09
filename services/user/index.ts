import { AxiosError } from "axios";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getEducationHistoryById,
  getEducationLevel,
  getUserProfile,
  postEducationHistory,
  postLogin,
  postRegister,
  postUserLink,
  putAbout,
  putEditProfile,
  putEducationHistory,
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

export const useCreateEducationHistory = () => {
  return useMutation({
    mutationFn: (payload: FormData) => postEducationHistory(payload),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useGetEducationById = (id: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetEducationById", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getEducationHistoryById(id),
    enabled: !!accessToken,
  });
};

export const useGetEducationLevel = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetEducationLevel", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getEducationLevel(),
    enabled: !!accessToken,
  });
};

export const useUpdateEducationHistory = () => {
  return useMutation({
    mutationFn: (payload: { data: FormData; id: number }) =>
      putEducationHistory(payload.data, payload.id),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};
