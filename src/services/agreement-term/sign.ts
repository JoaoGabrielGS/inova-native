import { api } from "@/src/lib/api-manager";

export const sign = async (courseId: number) => {
  const response = await api.post(`/agreement-terms`, { courseId });
  return response.data;
};
