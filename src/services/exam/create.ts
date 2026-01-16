"use client";

import { api } from "@/src/lib/api-manager";

export interface CreateAnswer {
  questionId: number;
  alternativeId: number;
}

export interface ExamRequest {
  answers: CreateAnswer[];
  disciplineId: number | null;
  moduleId: number | null;
}

export const create = async (exam: ExamRequest) => {
  const response = await api.post("/exams", exam);
  return response;
};
