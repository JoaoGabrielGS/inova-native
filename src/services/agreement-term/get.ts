import { api } from "@/src/lib/api-manager";

export const get = async (enrollmentId: number): Promise<boolean> => {
  const response = await api.get(`/agreement-terms/${enrollmentId}`);
  return response.data;
};
