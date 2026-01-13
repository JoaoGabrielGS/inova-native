import { api } from "@/src/lib/api-manager";

export const favorite = async (courseId: number) => {
  const response = await api.post(`/courses/favorite/${courseId}`);
  return response.data;
};
