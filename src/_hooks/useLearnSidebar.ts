// import { Atom } from "lucide-react-native";
// import {
//   CourseConsumptionDiscipline,
//   CourseConsumptionLesson,
// } from "../services/courses/consumption";

// export const selectedLessonAtom = Atom<CourseConsumptionLesson | null>(null);
// export const selectedDisciplineAtom = Atom<CourseConsumptionDiscipline | null>(
//   null,
// );
// export const openModuleIdAtom = Atom<string | undefined>(undefined);
// export const openDisciplineIdAtom = Atom<string | undefined>(undefined);
// export const selectedDisciplineNameAtom = Atom((get) => {
//   return get(selectedDisciplineAtom)?.name ?? "";
// });
// export const progressPercentageAtom = Atom<number>(0);

// export interface CourseLessonIndexes {
//   moduleIndex: number;
//   disciplineIndex: number;
//   lessonIndex: number;
// }

// export const selectedLessonIndexesAtom = Atom<CourseLessonIndexes | null>(null);

// const useLearnSidebar = () => {
//   return {};
// };

// export default useLearnSidebar;
