import { AxiosError } from "axios";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteEducationHistory,
  deleteExperienceHistory,
  deleteOrganizationHistory,
  deleteSertificate,
  deleteUserLink,
  getEducationHistoryById,
  getEducationLevel,
  getExperienceHistoryById,
  getOrganizationHistory,
  getOrganizationHistoryById,
  getSertificateById,
  getSkills,
  getUserLinkById,
  getUserProfile,
  postEducationHistory,
  postExperienceHistory,
  postLogin,
  postOrganizationHistory,
  postRegister,
  postSertificate,
  postUserLink,
  postUserSkills,
  putAbout,
  putEditProfile,
  putEducationHistory,
  putExperienceHistory,
  putOrganizationHistory,
  putSertificate,
  putUserLink,
  ResponseError,
} from "@/api";
import {
  PostLoginPayload,
  PostRegisterPayload,
  userAboutForm,
  userExperienceForm,
  userLinkForm,
  userOrganizationForm,
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

export const useGetUserLinkById = (id: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetUserLinkById", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getUserLinkById(id),
    enabled: !!accessToken,
  });
};

export const usePostLiks = () => {
  return useMutation({
    mutationFn: (payload: userLinkForm) => postUserLink(payload),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};
export const useUpdateLiks = () => {
  return useMutation({
    mutationFn: (payload: { data: userLinkForm; id: string }) =>
      putUserLink(payload.data, payload.id),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};
export const useDeleteLiks = () => {
  return useMutation({
    mutationFn: (payload: string) => deleteUserLink(payload),
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

export const useDeleteEducationHistory = () => {
  return useMutation({
    mutationFn: (payload: string) => deleteEducationHistory(payload),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useGetOrganizationById = (id: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetOrganizationById", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getOrganizationHistoryById(id),
    enabled: !!accessToken,
  });
};

export const useGetOrganization = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetOrganizationById", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getOrganizationHistory(),
    enabled: !!accessToken,
  });
};

export const useCreateOrganizationHistory = () => {
  return useMutation({
    mutationFn: (payload: userOrganizationForm) =>
      postOrganizationHistory(payload),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useUpdateOrganizationHistory = () => {
  return useMutation({
    mutationFn: (payload: { data: userOrganizationForm; id: string }) =>
      putOrganizationHistory(payload.data, payload.id),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useDeleteOrganizationHistory = () => {
  return useMutation({
    mutationFn: (payload: string) => deleteOrganizationHistory(payload),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useGetExperienceById = (id: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetExperienceById", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getExperienceHistoryById(id),
    enabled: !!accessToken,
  });
};

export const useCreateExperienceHistory = () => {
  return useMutation({
    mutationFn: (payload: userExperienceForm) => postExperienceHistory(payload),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useUpdateExperienceHistory = () => {
  return useMutation({
    mutationFn: (payload: { data: userExperienceForm; id: string }) =>
      putExperienceHistory(payload.data, payload.id),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useDeleteExperienceHistory = () => {
  return useMutation({
    mutationFn: (payload: string) => deleteExperienceHistory(payload),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useGetSkills = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetSkills", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getSkills(),
    enabled: !!accessToken,
  });
};
export const useCreateUserSkill = () => {
  return useMutation({
    mutationFn: (payload: { skills: number[] }) => postUserSkills(payload),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useCreateSetificate = () => {
  return useMutation({
    mutationFn: (payload: FormData) => postSertificate(payload),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useUpdateSetificate = () => {
  return useMutation({
    mutationFn: (payload: { data: FormData; id: string }) =>
      putSertificate(payload.data, payload.id),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useDeleteSetificate = () => {
  return useMutation({
    mutationFn: (payload: string) => deleteSertificate(payload),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useGetSertificateById = (id: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetSertificateById", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getSertificateById(id),
    enabled: !!accessToken,
  });
};
