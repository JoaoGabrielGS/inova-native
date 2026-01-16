import { api } from "@/src/lib/api-manager";

export const getCourseAndDiscipline = async (
  courseId: number,
  disciplineId: number,
) => {
  const response = await api.get(`/courses/${courseId}/${disciplineId}`);
  return response;
};
