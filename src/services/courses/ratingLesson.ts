import { api } from "@/src/lib/api-manager";

export const ratingLesson = async (
  enrollmentId: number,
  lessonId: number,
  rating: number,
) => {
  const response = await api.post(
    `/lesson-feedback/enrollment/${enrollmentId}/lesson/${lessonId}/rating/${rating}`,
  );
  return response.data;
};
