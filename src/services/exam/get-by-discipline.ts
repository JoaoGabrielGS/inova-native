import { api } from "@/src/lib/api-manager";

export const getByDiscipline = async (
  courseId: number,
  disciplineId: number,
) => {
  const response = api.get(
    `/exams/course/${courseId}/discipline/${disciplineId}`,
  );
  return response;
};
