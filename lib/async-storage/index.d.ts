import { PostLoginResponseSuccess } from "@/api/index.d";

export type StorageData = {
  accesstoken: string;
  profile: PostLoginResponseSuccess["data"];
};
