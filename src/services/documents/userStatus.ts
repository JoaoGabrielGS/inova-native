import { api } from "@/src/lib/api-manager";

export const userStatus = async (courseId: number) => {
  const response = await api.get(`/user-document/user-status/${courseId}`);
  return response.data;
};
