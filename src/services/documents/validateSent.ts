import { api } from "@/src/lib/api-manager";

const validateSent = async (userId: number, courseId: number) => {
  const response = await api.get(`/user-document/${userId}/${courseId}`);
  return response.data;
};

export { validateSent };
