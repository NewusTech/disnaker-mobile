import { getEvent, getEventBySlug } from "@/api";
import { useAccessToken } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";

export const useGetEvent = (query?: string) => {
    const accessToken = useAccessToken();
  
    return useQuery({
      queryKey: ["useGetEvent", accessToken],
      // TODO replace with actual get Profile API
      queryFn: () => getEvent(),
      enabled: !!accessToken,
    });
  };
  
  export const useGetEventBySlug = (slug: string) => {
    const accessToken = useAccessToken();
  
    return useQuery({
      queryKey: ["useGetEventBySlug", slug, accessToken],
      // TODO replace with actual get Profile API
      queryFn: () => getEventBySlug(slug),
      enabled: !!accessToken,
    });
  };