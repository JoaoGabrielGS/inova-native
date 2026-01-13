import { api } from "@/src/lib/api-manager";

export const unfavorite = async (courseId: number) => {
  const response = await api.post(`/courses/unfavorite/${courseId}`);
  return response.data;
};
