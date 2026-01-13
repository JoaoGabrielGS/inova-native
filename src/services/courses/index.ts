import { favorite } from "./favorite";
import { favoritesIds } from "./favorites-ids";
import { getLearning } from "./get-learning";
import { getCoursesDetailsById } from "./get_by_id";
import { purchased } from "./purchased";
import { unfavorite } from "./unfavorite";

export const courseService = {
  purchased,
  getLearning,
  getCoursesDetailsById,
  favorite,
  favoritesIds,
  unfavorite,
};
