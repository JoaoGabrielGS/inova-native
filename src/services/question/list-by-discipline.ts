import { api } from "@/src/lib/api-manager";

export const listByDiscipline = async (
  courseId: number,
  disciplineId: number,
) => {
  const response = await api.get(
    `/courses/${courseId}/questions?discipline.id=${disciplineId}`,
  );
  return response;
};
