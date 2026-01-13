import { api } from "@/src/lib/api-manager";

export const isSignedTerms = async (courseId: number): Promise<boolean> => {
  const response = await api.get(
    `/agreement-terms/is-signed-terms/${courseId}`,
  );
  return response.data;
};
