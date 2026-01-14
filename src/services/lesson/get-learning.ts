import { api } from "@/src/lib/api-manager";

export const getLearning = async (disciplineId: number): Promise<string[]> => {
  const response = await api.get(`/courses/learning/lessons/${disciplineId}`);
  console.log(`/courses/learning/lessons/${disciplineId}`);
  return response.data;
};
