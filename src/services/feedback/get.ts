import { api } from "@/src/lib/api-manager";

export interface CourseConsumptionFeedback {
  rating?: number;
  comment?: string;
}

export const getFeedback = async (
  courseId: number,
): Promise<CourseConsumptionFeedback> => {
  const response = await api.get(`/courses/feedback/${courseId}`);
  return response.data;
};
