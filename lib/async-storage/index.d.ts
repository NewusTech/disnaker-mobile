import { PostLoginResponseSuccess } from "@/api/types";

export type StorageData = {
  accesstoken: string;
  profile: PostLoginResponseSuccess["data"];
};
