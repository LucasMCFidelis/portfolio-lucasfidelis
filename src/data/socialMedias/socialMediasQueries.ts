import { queryOptions } from "@tanstack/react-query";

import { getAllSocialMedias } from "@/actions/socialMedias/getAllSocialMedias";

export const socialMediasQueryOptions = () =>
  queryOptions({
    queryKey: ["social-medias"],
    queryFn: () => getAllSocialMedias(),
  });
