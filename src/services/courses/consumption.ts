"use client";

import { api } from "@/src/lib/api-manager";

export interface CourseConsumptionFeedbackLesson {
  id?: number;
  rating?: number;
}

export interface CourseConsumptionLesson {
  id: number;
  title: string;
  content: string;
  description: string;
  watched: boolean;
  feedback: CourseConsumptionFeedbackLesson;
}

export interface CourseConsumptionDiscipline {
  id: number;
  name: string;
  position: number;
  liberated: boolean;
  liberationDate: string;
  lessons: CourseConsumptionLesson[];
  professor: string;
  isApproved: boolean;
}

export interface CourseConsumptionModule {
  id: number;
  name: string;
  position: number;
  hasExam: boolean;
  daysToLiberate: number;
  disciplines: CourseConsumptionDiscipline[];
  isApproved: boolean;
}

export interface CourseConsumptionFeedback {
  rating?: number;
  comment?: string;
}

export interface CourseConsumptionCourse {
  id: number;
  title: string;
  slug: string;
  duration: number;
  category: string;
  type: { id: number; name: string };
  bannerUrl: string | undefined;
  feedback: CourseConsumptionFeedback;
  modules: CourseConsumptionModule[];
}

export interface CourseConsumptionProgress {
  progressPercentage: number;
  itemPercentage: number;
}

export interface CourseConsumptionCertificate {
  id: number;
  certificateUrl: string;
  hash: string;
  diplomaRegisterNumber: number;
  startDate: string;
  endDate: string;
}

export interface CourseConsumptionResponse {
  id: number;
  course: CourseConsumptionCourse;
  progress: CourseConsumptionProgress;
  certificate: CourseConsumptionCertificate;
}

export const consumption = async (enrollmentId: string) => {
  const { data } = await api.get<CourseConsumptionResponse>(
    `/course-consumption/${enrollmentId}`,
  );
  return data;
};
