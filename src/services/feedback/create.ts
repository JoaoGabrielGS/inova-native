import { api } from "@/src/lib/api-manager";

interface RatingDTO {
  rating: number;
  comment: string | "";
}

export const create = async (rating: RatingDTO) => {
  const response = await api.post(`/courses/feedback`, rating);
  return response;
};
