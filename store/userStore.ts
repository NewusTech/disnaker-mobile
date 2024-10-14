import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

import { ExtractState } from "@/lib/zustand";
import { userProfileResponseSuccess } from "@/api";

type AuthStore = {
  accessToken: string | null;
  profile: userProfileResponseSuccess["data"] | null;
  savedVacancy: {
    id: number;
  }[];

  actions: {
    setAccessToken: (accessToken: string | null) => void;
    setProfile: (data: userProfileResponseSuccess["data"]) => void;
    clearAuthSession: () => void;
    setSavedVacancy: (data: { id: number }[]) => void;
  };
};

const authStore = createStore<AuthStore>()((set, get) => ({
  accessToken: null,
  profile: null,
  savedVacancy: [],

  actions: {
    setAccessToken: (accessToken) => set({ accessToken }),
    setProfile: (profile) => set({ profile }),
    clearAuthSession: async () => {
      set({
        accessToken: null,
        profile: null,
      });
    },
    setSavedVacancy: (savedVacancy) => set({ savedVacancy }),
  },
}));

type Params<U> = Parameters<typeof useStore<typeof authStore, U>>;

// Selectors
const accessTokenSelector = (state: ExtractState<typeof authStore>) =>
  state.accessToken;
const profileSelector = (state: ExtractState<typeof authStore>) =>
  state.profile;
const actionsSelector = (state: ExtractState<typeof authStore>) =>
  state.actions;
const savedVacancySelector = (state: ExtractState<typeof authStore>) =>
  state.savedVacancy;

// getters
export const getAccessToken = () => accessTokenSelector(authStore.getState());
export const getProfile = () => profileSelector(authStore.getState());
export const getAuthActions = () => actionsSelector(authStore.getState());
export const getSavedVacancy = () => savedVacancySelector(authStore.getState());

function useAuthStore<U>(selector: Params<U>[1]) {
  return useStore(authStore, selector);
}

// Hooks
export const useAccessToken = () => useAuthStore(accessTokenSelector);
export const useAuthProfile = () => useAuthStore(profileSelector);
export const useAuthActions = () => useAuthStore(actionsSelector);
export const useSavedVacancy = () => useAuthStore(savedVacancySelector);
