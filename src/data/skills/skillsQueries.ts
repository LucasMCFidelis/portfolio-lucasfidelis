import { queryOptions } from "@tanstack/react-query";

import { getHardSkills } from "@/actions/skills/getHardSkills";
import { getSoftSkills } from "@/actions/skills/getSoftSkills";

export const hardSkillsQueryOptions = () =>
  queryOptions({
    queryKey: ["skills", "hard"],
    queryFn: () => getHardSkills(),
  });

export const softSkillsQueryOptions = () =>
  queryOptions({
    queryKey: ["skills", "soft"],
    queryFn: () => getSoftSkills(),
  });
