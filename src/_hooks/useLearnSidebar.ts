import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  CourseConsumptionDiscipline,
  CourseConsumptionLesson,
  CourseConsumptionResponse,
} from "../services/courses/consumption";
import { courseService } from "../services/courses";
import { QUERIES } from "../constants/queries";
import ToastUtils from "../utils/toastUtils";
import { agreementTermService } from "../services/agreement-term";

export const selectedLessonAtom = atom<CourseConsumptionLesson | null>(null);

export const selectedDisciplineAtom = atom<CourseConsumptionDiscipline | null>(
  null,
);

export const openModuleIdAtom = atom<string | undefined>(undefined);

export const openDisciplineIdAtom = atom<string | undefined>(undefined);

export const selectedDisciplineNameAtom = atom((get) => {
  return get(selectedDisciplineAtom)?.name ?? "";
});

export const progressPercentageAtom = atom<number>(0);

export interface CourseLessonIndexes {
  moduleIndex: number;
  disciplineIndex: number;
  lessonIndex: number;
}

export const selectedLessonIndexesAtom = atom<CourseLessonIndexes | null>(null);

export const useLearnSidebar = (
  enrollment: CourseConsumptionResponse,
  show: boolean,
  enrollmentId: number,
) => {
  const queryClient = useQueryClient();
  const [, setSelectedDisciplineAtom] = useAtom(selectedDisciplineAtom);
  const [, setProgressPercentageAtom] = useAtom(progressPercentageAtom);
  const [selectedLesson, setSelectedLesson] = useAtom(selectedLessonAtom);
  const [selectedLessonIndexes, setSelectedLessonIndexes] = useAtom(
    selectedLessonIndexesAtom,
  );
  const [openModuleId, setOpenModuleId] = useAtom(openModuleIdAtom);
  const [openDisciplineId, setOpenDisciplineId] = useAtom(openDisciplineIdAtom);
  const course = enrollment?.course;
  const progress = enrollment?.progress;

  if (progress?.progressPercentage !== undefined) {
    setProgressPercentageAtom(progress.progressPercentage);
  }

  const courseTypePattern = (typeName: string) => {
    if (typeName === "POS_GRADUACAO") {
      return "PÓS-GRADUAÇÃO";
    }
    if (typeName === "RAPIDO") {
      return "RÁPIDO";
    }

    return typeName;
  };

  const formattedCourseType = courseTypePattern(course?.type?.name);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [, setSelectedDiscipline] = useState<number | null>(null);

  const updateSelectedDiscipline = (
    discipline: CourseConsumptionDiscipline,
  ) => {
    setSelectedDiscipline(discipline.id);
    setSelectedDisciplineAtom(discipline);
  };
  const [posModalOpen, setPosModalOpen] = useState(false);
  const [professionalModalOpen, setProfessionalModalOpen] = useState(false);

  const [disciplineAttempt, setDisciplineAttempt] =
    useState<CourseConsumptionDiscipline | null>();

  const isDisciplineEvaluation =
    formattedCourseType === "PROFISSIONALIZANTE" ||
    formattedCourseType === "PÓS-GRADUAÇÃO";

  const isModuleEvaluation =
    formattedCourseType === "RÁPIDO" || formattedCourseType === "EVENTO";

  const [
    { data: canGenerate, isLoading: isLoadingCanGenerate },
    // { data: terms, isLoading: isLoadingAgreementTerms },
  ] = useQueries({
    queries: [
      {
        queryKey: [QUERIES.COURSE.CAN_GENERATE, course?.id],
        queryFn: () => courseService.canGenerate(course?.id),
        enabled: !!course?.id && show,
        retry: false,
      },
      {
        queryKey: [QUERIES.AGREEMENT_TERM.USER_TERMS],
        queryFn: () => agreementTermService.userTerms(enrollmentId),
        enabled:
          !!course?.id && !!enrollmentId && show && isDisciplineEvaluation,
        retry: false,
      },
    ],
  });

  // const { mutateAsync: watchLesson } = useMutation({
  //   mutationFn: async ({
  //     lessonId,
  //   }: {
  //     lessonId: number;
  //     lessonIndex: number;
  //     disciplineIndex: number;
  //     moduleIndex: number;
  //   }) => {
  //     return await progressService.create(lessonId, enrollmentId);
  //   },
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   onSuccess: (_, { lessonIndex, disciplineIndex, moduleIndex }) => {
  //     course.modules[moduleIndex].disciplines[disciplineIndex].lessons[
  //       lessonIndex
  //     ].watched = true;
  //     progress.progressPercentage = Math.min(
  //       progress.progressPercentage + progress.itemPercentage,
  //       100,
  //     );
  //     setProgressPercentageAtom(progress.progressPercentage);
  //     queryClient.invalidateQueries({
  //       queryKey: [QUERIES.COURSE.GET_BY_ENROLLMENT_ID, enrollmentId],
  //     });
  //   },
  // });

  // const mutationCertificate = useMutation({
  //   mutationFn: (courseId: number) => certificateService.generate(courseId),
  //   onSuccess(data) {
  //     return data;
  //   },
  //   onError: () => {
  //     ToastUtils.showError(
  //       "Não foi possível gerar o certificado, tente novamente.",
  //     );
  //   },
  // });

  // const generateCertificate = async (courseId: number): Promise<string> => {
  //   const result = await mutationCertificate.mutateAsync(courseId);

  //   if (result.toLowerCase().endsWith(".pdf")) {
  //     const a = document.createElement("a");
  //     a.href = result;
  //     a.download = "certificado.pdf";
  //     a.target = "_blank";
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   }

  //   queryClient.invalidateQueries({
  //     queryKey: [QUERIES.COURSE.CAN_GENERATE, courseId],
  //     exact: false,
  //   });

  //   return result;
  // };

  // const handleCompleteLesson = async () => {
  //   if (!selectedLessonIndexes || !selectedLesson) return;

  //   const { moduleIndex, disciplineIndex, lessonIndex } = selectedLessonIndexes;
  //   const lesson = selectedLesson;

  //   if (lesson.watched) return;

  //   try {
  //     await watchLesson({
  //       lessonId: lesson.id,
  //       disciplineIndex,
  //       moduleIndex,
  //       lessonIndex,
  //     });
  //     lesson.watched = true;
  //     setSelectedLesson({ ...lesson });
  //   } catch (error) {
  //     ToastUtils.showError("Não foi possível concluir a aula.");
  //   }
  // };

  const handleSelectLesson = ({
    lesson,
    discipline,
    indexs,
  }: {
    lesson: CourseConsumptionLesson;
    discipline: CourseConsumptionDiscipline;
    indexs: CourseLessonIndexes;
  }) => {
    setSelectedLesson({ ...lesson });
    setSelectedLessonIndexes(indexs);
    setSelectedDisciplineAtom(discipline);
    setIsOpen(false);
  };

  const verifyAttempts = (discipline: CourseConsumptionDiscipline) => {
    setDisciplineAttempt(discipline);
    setPosModalOpen(true);
  };

  const professionalModalAttemptOpen = (
    discipline: CourseConsumptionDiscipline,
  ) => {
    setDisciplineAttempt(discipline);
    setProfessionalModalOpen(true);
  };

  const getTotalWatchedByLessons = (lessons: CourseConsumptionLesson[]) => {
    return lessons.reduce((total, lesson) => {
      return total + (lesson.watched ? 1 : 0);
    }, 0);
  };

  const navigateLesson = (direction: "next" | "prev") => {
    if (!selectedLessonIndexes) return;

    const { moduleIndex, disciplineIndex, lessonIndex } = selectedLessonIndexes;
    const currentModule = course?.modules[moduleIndex];
    const currentDiscipline = currentModule.disciplines[disciplineIndex];

    let nextModuleIndex = moduleIndex;
    let nextDisciplineIndex = disciplineIndex;
    let nextLessonIndex = lessonIndex;

    if (direction === "next") {
      nextLessonIndex++;
      const totalLessons = currentDiscipline.lessons.length;

      if (nextLessonIndex >= totalLessons) {
        nextDisciplineIndex++;
        nextLessonIndex = 0;
        const totalDisciplines = currentModule.disciplines.length;

        if (nextDisciplineIndex >= totalDisciplines) {
          nextModuleIndex++;
          nextDisciplineIndex = 0;
          const totalModules = course?.modules.length;

          if (nextModuleIndex >= totalModules) {
            return;
          }
        }
      }
    } else {
      nextLessonIndex--;

      if (nextLessonIndex < 0) {
        nextDisciplineIndex--;

        if (nextDisciplineIndex < 0) {
          nextModuleIndex--;

          if (nextModuleIndex < 0) {
            return;
          }

          const prevModule = course?.modules[nextModuleIndex];
          nextDisciplineIndex = prevModule.disciplines.length - 1;
        }

        const prevDiscipline =
          course.modules[nextModuleIndex].disciplines[nextDisciplineIndex];
        nextLessonIndex = prevDiscipline.lessons.length - 1;
      }
    }

    const newModule = course?.modules[nextModuleIndex];
    const newDiscipline = newModule.disciplines[nextDisciplineIndex];
    const newLesson = newDiscipline.lessons[nextLessonIndex];

    if (newLesson) {
      handleSelectLesson({
        lesson: newLesson,
        discipline: newDiscipline,
        indexs: {
          moduleIndex: nextModuleIndex,
          disciplineIndex: nextDisciplineIndex,
          lessonIndex: nextLessonIndex,
        },
      });
    }
  };

  const handleNextLesson = () => navigateLesson("next");
  const handlePrevLesson = () => navigateLesson("prev");

  const isFirstLesson =
    selectedLessonIndexes?.moduleIndex === 0 &&
    selectedLessonIndexes?.disciplineIndex === 0 &&
    selectedLessonIndexes?.lessonIndex === 0;

  const isLastLesson = (() => {
    if (!selectedLessonIndexes) return false;

    const totalModules = course?.modules?.length;
    const lastModuleIndex = totalModules - 1;
    const lastModule = course?.modules[lastModuleIndex];

    if (selectedLessonIndexes.moduleIndex !== lastModuleIndex) return false;

    const totalDisciplines = lastModule?.disciplines.length;
    const lastDisciplineIndex = totalDisciplines - 1;
    const lastDiscipline = lastModule.disciplines[lastDisciplineIndex];

    if (selectedLessonIndexes.disciplineIndex !== lastDisciplineIndex)
      return false;

    const totalLessons = lastDiscipline.lessons.length;
    const lastLessonIndex = totalLessons - 1;

    return selectedLessonIndexes.lessonIndex === lastLessonIndex;
  })();

  const isNextDisciplineLiberated = (() => {
    if (!selectedLessonIndexes) return true;

    const { moduleIndex, disciplineIndex, lessonIndex } = selectedLessonIndexes;
    const currentModule = course?.modules[moduleIndex];
    const currentDiscipline = currentModule?.disciplines[disciplineIndex];

    let nextModuleIndex = moduleIndex;
    let nextDisciplineIndex = disciplineIndex;
    let nextLessonIndex = lessonIndex + 1;

    if (nextLessonIndex >= currentDiscipline?.lessons.length) {
      nextDisciplineIndex++;
      nextLessonIndex = 0;

      if (nextDisciplineIndex >= currentModule?.disciplines.length) {
        nextModuleIndex++;
        nextDisciplineIndex = 0;

        if (nextModuleIndex >= course?.modules.length) {
          return true;
        }
      }
    }

    const newModule = course?.modules[nextModuleIndex];
    const newDiscipline = newModule?.disciplines[nextDisciplineIndex];

    if (newDiscipline) {
      return newDiscipline.liberated;
    }

    return true;
  })();

  useEffect(() => {
    if (!course?.modules?.length || selectedLesson) return;
    let lastWatchedLessonInfo: {
      lesson: CourseConsumptionLesson;
      discipline: CourseConsumptionDiscipline;
      indexs: CourseLessonIndexes;
    } | null = null;
    for (let mIdx = course.modules.length - 1; mIdx >= 0; mIdx--) {
      const courseModule = course.modules[mIdx];
      for (let dIdx = courseModule.disciplines.length - 1; dIdx >= 0; dIdx--) {
        const discipline = courseModule.disciplines[dIdx];
        if (discipline.liberated) {
          for (let lIdx = discipline.lessons.length - 1; lIdx >= 0; lIdx--) {
            const lesson = discipline.lessons[lIdx];
            if (lesson.watched) {
              lastWatchedLessonInfo = {
                lesson,
                discipline,
                indexs: {
                  moduleIndex: mIdx,
                  disciplineIndex: dIdx,
                  lessonIndex: lIdx,
                },
              };
              break;
            }
          }
        }
        if (lastWatchedLessonInfo) break;
      }
      if (lastWatchedLessonInfo) break;
    }
    if (lastWatchedLessonInfo) {
      setOpenModuleId(lastWatchedLessonInfo.indexs.moduleIndex.toString());
      setOpenDisciplineId(lastWatchedLessonInfo.discipline.id.toString());
      handleSelectLesson(lastWatchedLessonInfo);
      return;
    }
    let firstAvailableLessonInfo: {
      lesson: CourseConsumptionLesson;
      discipline: CourseConsumptionDiscipline;
      indexs: CourseLessonIndexes;
    } | null = null;
    for (let mIdx = 0; mIdx < course.modules.length; mIdx++) {
      const courseModule = course.modules[mIdx];
      for (let dIdx = 0; dIdx < courseModule.disciplines.length; dIdx++) {
        const discipline = courseModule.disciplines[dIdx];
        if (!discipline.liberated) continue;
        const firstUnwatchedLesson = discipline.lessons.find((l) => !l.watched);
        if (firstUnwatchedLesson) {
          const lIdx = discipline.lessons.indexOf(firstUnwatchedLesson);
          firstAvailableLessonInfo = {
            lesson: firstUnwatchedLesson,
            discipline,
            indexs: {
              moduleIndex: mIdx,
              disciplineIndex: dIdx,
              lessonIndex: lIdx,
            },
          };
          break;
        }
      }
      if (firstAvailableLessonInfo) break;
    }
    if (firstAvailableLessonInfo) {
      setOpenModuleId(firstAvailableLessonInfo.indexs.moduleIndex.toString());
      setOpenDisciplineId(firstAvailableLessonInfo.discipline.id.toString());
      handleSelectLesson(firstAvailableLessonInfo);
      return;
    }
    if (course.modules.length > 0) {
      let lastLiberatedDiscipline: {
        discipline: CourseConsumptionDiscipline;
        mIdx: number;
        dIdx: number;
      } | null = null;
      for (let mIdx = course.modules.length - 1; mIdx >= 0; mIdx--) {
        const currentModule = course.modules[mIdx];
        for (
          let dIdx = currentModule.disciplines.length - 1;
          dIdx >= 0;
          dIdx--
        ) {
          const discipline = currentModule.disciplines[dIdx];
          if (discipline.liberated) {
            lastLiberatedDiscipline = { discipline, mIdx, dIdx };
            break;
          }
        }
        if (lastLiberatedDiscipline) break;
      }
      if (lastLiberatedDiscipline) {
        const { discipline, mIdx, dIdx } = lastLiberatedDiscipline;
        const lastLessonIndex = discipline.lessons.length - 1;
        const lastLesson = discipline.lessons[lastLessonIndex];
        setOpenModuleId(mIdx.toString());
        setOpenDisciplineId(discipline.id.toString());
        handleSelectLesson({
          lesson: lastLesson,
          discipline,
          indexs: {
            moduleIndex: mIdx,
            disciplineIndex: dIdx,
            lessonIndex: lastLessonIndex,
          },
        });
      }
    }
  }, [
    course?.modules,
    selectedLesson,
    handleSelectLesson,
    setSelectedDiscipline,
    setOpenModuleId,
    setOpenDisciplineId,
  ]);

  return {
    states: {
      // terms,
      // isLoadingAgreementTerms,
      course,
      progress,
      canGenerate,
      isLoadingCanGenerate,
      dropdownOpen,
      isOpen,

      isModuleEvaluation,
      isDisciplineEvaluation,
      posModalOpen,
      professionalModalOpen,
      disciplineAttempt,
      isFirstLesson,
      isLastLesson,
      isNextDisciplineLiberated,
      openModuleId,
      openDisciplineId,
    },
    actions: {
      setDropdownOpen,
      setIsOpen,
      handleSelectLesson,
      setSelectedDiscipline: updateSelectedDiscipline,
      verifyAttempts,
      professionalModalAttemptOpen,
      // generateCertificate,
      setPosModalOpen,
      setProfessionalModalOpen,
      getTotalWatchedByLessons,
      handleNextLesson,
      handlePrevLesson,
      // handleCompleteLesson,
      setOpenModuleId,
      setOpenDisciplineId,
    },
  };
};
