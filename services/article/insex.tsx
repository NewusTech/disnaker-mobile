import { getArticle, getArticleBySlug } from "@/api";
import { useAccessToken } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

export const useGetArticle = (query?: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetArticle", accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getArticle(),
    enabled: !!accessToken,
  });
};

export const useGetArticleBySlug = (slug: string) => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["useGetArticleBySlug", slug, accessToken],
    // TODO replace with actual get Profile API
    queryFn: () => getArticleBySlug(slug),
    enabled: !!accessToken,
  });
};
