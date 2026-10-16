"use client";

import { useQuery } from "@tanstack/react-query";

import {
  academicExperiencesQueryOptions,
  professionalExperiencesQueryOptions,
} from "./experiencesQueries";

export function useAcademicExperiences() {
  return useQuery(academicExperiencesQueryOptions());
}

export function useProfessionalExperiences() {
  return useQuery(professionalExperiencesQueryOptions());
}
