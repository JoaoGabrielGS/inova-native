import { api } from "@/src/lib/api-manager";

export interface AlternativeDTO {
  id: number;
  description: string;
  isCorrect: boolean | null;
  justification: string | "Carregando...";
  justificationImageUrl?: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string | null;
  isSelected: boolean | null;
}

export interface QuestionDTO {
  id: number;
  image_url: string;
  imageUrl?: string;
  description: string;
  course: { id: number };
  module: { id: number };
  discipline: { id: number };
  createdAt: string;
  updatedAt: string;
  alternatives: AlternativeDTO[];
}

export interface AnswerDTO {
  question: QuestionDTO;
  alternatives: AlternativeDTO[];
}

export interface ExamAttemptDTO {
  id: number;
  attempt: number | 3;
  score: number;
  isApproved: boolean;
  answers: AnswerDTO[];
  createdAt: string;
  updatedAt: string;
}

export const getByModule = async (courseId: number, moduleId: number) => {
  const response = api.get(`/exams/course/${courseId}/module/${moduleId}`);
  return response;
};
