import { AxiosError } from "axios";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteEducationHistory,
  deleteExperienceHistory,
  deleteOrganizationHistory,
  deleteSertificate,
  deleteUserLink,
  deleteUserSaveVacancy,
  getEducationHistoryById,
  getEducationLevel,
  getExperienceHistoryById,
  getOrganizationHistory,
  getOrganizationHistoryById,
  getSertificateById,
  getSkills,
  getUserComplaint,
  getUserComplaintById,
  getUserHistoryApplication,
  getUserLinkById,
  getUserNotification,
  getUserNotificationById,
  getUserProfile,
  getUserSavedVacancy,
  getUserTransmigration,
  getUserTransmigrationById,
  getUserYellowCard,
  getUserYellowCardById,
  postEducationHistory,
  postExperienceHistory,
  postLogin,
  postOrganizationHistory,
  postRegister,
  postSertificate,
  postUserApplyVacancy,
  postUserComplaint,
  postUserLink,
  postUserRegisterYellowCard,
  postUserSaveVacancy,
  postUserSkills,
  postUserTransmigration,
  postUserUpdatePassword,
  putAbout,
  putCvPortofolio,
  putEditProfile,
  putEducationHistory,
  putExperienceHistory,
  putFotoProfile,
  putOrganizationHistory,
  putSertificate,
  putUserInvitation,
  putUserLink,
  putUserNotification,
  ResponseError,
} from "@/api";
import {
  PostLoginPayload,
  PostRegisterPayload,
  userAboutForm,
  userExperienceForm,
  userLinkForm,
  userOrganizationForm,
  userRegisterYellowCardForm,
  userUpdatePasswordForm,
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
    refetchOnWindowFocus: true,
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

export const useUploadFotoProfile = () => {
  return useMutation({
    mutationFn: (payload: { data: FormData; slug: string }) =>
      putFotoProfile(payload.data, payload.slug),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useApplyVacancy = () => {
  return useMutation({
    mutationFn: (payload: { vacancy_id: string }) =>
      postUserApplyVacancy(payload),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useUserHistoryApplication = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useUserHistoryApplication", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getUserHistoryApplication(),
    enabled: !!accessToken,
  });
};

export const useGetUserSavedVacancy = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetUserSavedVacancy", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getUserSavedVacancy(),
    enabled: !!accessToken,
  });
};

export const useUserSaveVacancy = () => {
  return useMutation({
    mutationFn: (payload: { vacancy_id: string }) =>
      postUserSaveVacancy(payload),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useUserDeleteVacancy = () => {
  return useMutation({
    mutationFn: (payload: { vacancy_id: string }) =>
      deleteUserSaveVacancy(payload),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useUploadCvPortofolio = () => {
  return useMutation({
    mutationFn: (payload: { data: FormData; slug: string }) =>
      putCvPortofolio(payload.data, payload.slug),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useGetUserNotification = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetUserNotification", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getUserNotification(),
    enabled: !!accessToken,
  });
};

export const useGetUserNotificationById = (id: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetUserNotificationById", id, accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getUserNotificationById(id),
    enabled: !!accessToken,
  });
};

export const useUserPutInvitation = () => {
  return useMutation({
    mutationFn: (payload: {
      data: {
        status: string;
      };
      id: string;
    }) => putUserInvitation(payload.data, payload.id),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const usePutNotificationIsReading = () => {
  return useMutation({
    mutationFn: (payload: { id: string }) => putUserNotification(payload.id),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useUserComplaint = () => {
  return useMutation({
    mutationFn: (payload: FormData) => postUserComplaint(payload),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useGetUserComplaint = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetUserComplaint", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getUserComplaint(),
    enabled: !!accessToken,
  });
};
export const useGetUserComplaintById = (id: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetUserComplaintById", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getUserComplaintById(id),
    enabled: !!accessToken,
  });
};

export const useUserRegisterYellowCard = () => {
  return useMutation({
    mutationFn: (payload: userRegisterYellowCardForm) =>
      postUserRegisterYellowCard(payload),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useGetUserYellowCard = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetUserYellowCard", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getUserYellowCard(),
    enabled: !!accessToken,
  });
};

export const useGetUserYellowCardById = (id: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetUserYellowCardById", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getUserYellowCardById(id),
    enabled: !!accessToken,
  });
};

export const useUserTransmigration = () => {
  return useMutation({
    mutationFn: (payload: any) => postUserTransmigration(payload),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};

export const useGetUserTransmigration = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetUserTransmigration", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getUserTransmigration(),
    enabled: !!accessToken,
  });
};

export const useGetUserTransmigrationById = (id: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetUserTransmigrationById", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getUserTransmigrationById(id),
    enabled: !!accessToken,
  });
};

export const useUserUpdatePassword = () => {
  return useMutation({
    mutationFn: (payload: {
      data: userUpdatePasswordForm;
      user_slug: string;
    }) => postUserUpdatePassword(payload.data, payload.user_slug),
    onError: (error: AxiosError<ResponseError>) => error,
  });
};
