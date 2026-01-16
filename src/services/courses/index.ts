import { canGenerate } from "./canGenerate";
import { consumption } from "./consumption";
import { favorite } from "./favorite";
import { favoritesIds } from "./favorites-ids";
import { getCourseAndDiscipline } from "./get-course-and-discipline";
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
  consumption,
  canGenerate,
  getCourseAndDiscipline,
};
