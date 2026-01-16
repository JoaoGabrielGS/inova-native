import { useState } from "react";
import { QuestionDTO } from "../services/exam/get-by-module";
import { CourseType } from "../enums/courseType";
import { useRouter } from "expo-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERIES } from "../constants/queries";
import { courseService } from "../services/courses";
import { examService } from "../services/exam";
import { questionService } from "../services/question";
import { alternativeService } from "../services/alternative";
import { ExamRequest } from "../services/exam/create";

const fetchEvaluation = async (
  courseId: number,
  courseTypeId: number,
  disciplineId: number,
  moduleId: number,
): Promise<QuestionDTO[]> => {
  let response;

  if (
    courseTypeId === CourseType.Graducao ||
    courseTypeId === CourseType.Proffisionalizante
  ) {
    response = await questionService.listByDiscipline(courseId, disciplineId);
  } else {
    response = await questionService.listByModule(courseId, moduleId);
  }
  if (response)
    for (const question of response.data) {
      const responseAnswer = await alternativeService.list({
        questionId: question.id,
        viewType: "STUDENT",
      });
      question.alternatives = responseAnswer.data;
    }
  return response.data;
};

const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const useExam = (
  enrollmentId: number,
  disciplineId: number,
  moduleId: number,
) => {
  const router = useRouter();
  const [sessionKey] = useState(() => generateUUID());

  const {
    data: enrollment,
    isLoading: isLoadingEnrollment,
    isError: isErrorEnrollment,
  } = useQuery({
    queryKey: [QUERIES.COURSE.GET_BY_ENROLLMENT_ID, enrollmentId],
    enabled: !!enrollmentId,
    queryFn: () => courseService.consumption(enrollmentId.toString()),
  });

  const course = enrollment?.course;

  const {
    data: evaluation,
    isLoading: isLoadingEvaluation,
    isError: isErrorEvaluation,
  } = useQuery({
    queryKey: [QUERIES.MODULE.LIST, enrollment?.course.id, sessionKey],
    queryFn: () =>
      fetchEvaluation(
        enrollment?.course.id ?? 0,
        course?.type.id ?? 0,
        disciplineId,
        moduleId,
      ),
    enabled: enrollment && !!enrollment?.course.id,
  });

  const {
    mutate: finishEvaluation,
    isPending: isLoadingSave,
    isError: isErrorSave,
  } = useMutation({
    mutationFn: (data: ExamRequest) => examService.create(data),
    onSuccess: () => {
      router.push(`/(onboard)/course/${116}/consumption/prova/resumo`);
    },
    onError: (err: any) => {
      setTimeout(() => {
        router.back();
      }, 5000);
    },
  });

  return {
    states: {
      questions: evaluation || [],
      course,
      isLoading: isLoadingEnrollment || isLoadingEvaluation,
      isError: isErrorEnrollment || isErrorEvaluation,
      isLoadingSave,
      isErrorSave,
    },
    actions: {
      finishEvaluation,
    },
  };
};
