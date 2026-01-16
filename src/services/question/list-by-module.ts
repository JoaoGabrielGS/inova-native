import { api } from "@/src/lib/api-manager";

export const listByModule = async (courseId: number, moduleId: number) => {
  const response = await api.get(
    `/courses/${courseId}/questions?module.id=${moduleId}`,
  );
  return response;
};
