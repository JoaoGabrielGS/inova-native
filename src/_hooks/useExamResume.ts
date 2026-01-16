import { useQueries, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { examService } from "../services/exam";
import { ExamAttemptDTO } from "../services/exam/get-by-module";
import { courseService } from "../services/courses";
import { QUERIES } from "../constants/queries";

const fetchEvaluation = async (
  courseId: number,
  disciplineId: number,
  moduleId: number,
): Promise<ExamAttemptDTO> => {
  let response;
  if (disciplineId) {
    response = await examService.getByDiscipline(courseId, disciplineId);
  } else {
    response = await examService.getByModule(courseId, moduleId);
  }
  return response.data;
};

const fetchCourseAndDiscipline = async (
  courseId: number,
  disciplineId: number,
) => {
  const response = await courseService.getCourseAndDiscipline(
    courseId,
    disciplineId,
  );
  return response.data;
};

export const useExamResume = (
  enrollmentId: number,
  disciplineId: number,
  moduleId: number,
) => {
  const [posModalOpen, setPosModalOpen] = useState(false);

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

  const queries = useQueries({
    queries: [
      {
        queryKey: [QUERIES.EXAM.GET, course?.id],
        queryFn: () => fetchEvaluation(course?.id ?? 0, disciplineId, moduleId),
        enabled: !!course && !!course?.id && (!!disciplineId || !!moduleId),
      },
      {
        queryKey: [QUERIES.COURSE.GET, course?.id],
        queryFn: () => fetchCourseAndDiscipline(course?.id ?? 0, disciplineId),
        enabled: !!course && !!course?.id && !!disciplineId && posModalOpen,
      },
    ],
  });

  const [evaluationQuery, courseQuery] = queries;

  return {
    states: {
      posModalOpen,
      evaluation: evaluationQuery.data,
      postgrad: courseQuery.data,
      isLoading: isLoadingEnrollment || evaluationQuery.isLoading,
      isError: isErrorEnrollment || evaluationQuery.isError,
      enrollment,
    },
    actions: {
      setPosModalOpen,
    },
  };
};
