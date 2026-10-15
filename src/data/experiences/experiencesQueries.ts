import { queryOptions } from "@tanstack/react-query";

import { getAcademicExperiences } from "@/actions/experiences/getAcademicExperiences";
import { getProfessionalExperiences } from "@/actions/experiences/getProfessionalExperiences";

export const academicExperiencesQueryOptions = () =>
  queryOptions({
    queryKey: ["experiences", "academic"],
    queryFn: () => getAcademicExperiences(),
  });

export const professionalExperiencesQueryOptions = () =>
  queryOptions({
    queryKey: ["experiences", "professional"],
    queryFn: () => getProfessionalExperiences(),
  });
