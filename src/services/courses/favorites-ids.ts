import { api } from "@/src/lib/api-manager";

export interface BaseEnumDTO {
  id: number;
  name: string;
}

export interface FavoritedCourse {
  id: number;
  course: {
    id: number;
    title: string;
  };
  user: BaseEnumDTO;
  createdAt: Date;
  updatedAt: Date;
}

export const favoritesIds = async () => {
  const response = await api.get(`/courses/favorites/ids`);
  return response.data;
};
