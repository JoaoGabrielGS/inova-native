import { api } from "@/src/lib/api-manager";

export const getLearning = async (
  courseId: number,
): Promise<{ id: number; name: string }[]> => {
  const response = await api.get(`/courses/learning/${courseId}`);
  return response.data;
};
