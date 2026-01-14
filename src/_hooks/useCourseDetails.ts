import { QUERIES } from "@/src/constants/queries";
import { agreementTermService } from "@/src/services/agreement-term";
import { courseService } from "@/src/services/courses";
import { lessonService } from "@/src/services/lesson";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const getLearning = async (courseId: number) => {
  const response = await courseService.getLearning(courseId);
  return response;
};

const getLessonsLearning = async (disciplineId: number) => {
  const response = await lessonService.getLearning(disciplineId);
  return response;
};

export function useCourseDetails(courseId: number, show?: boolean) {
  const router = useRouter();
  const [disciplineSelected, setDisciplineSelected] = useState<number>(0);
  const queries = useQueries({
    queries: [
      {
        queryKey: [QUERIES.COURSE.LEARNING, courseId],
        queryFn: () => getLearning(courseId),
        enabled: !!courseId,
      },
      {
        queryKey: [QUERIES.LESSON.LEARNING, disciplineSelected],
        queryFn: () => getLessonsLearning(disciplineSelected),
        enabled: !!disciplineSelected && disciplineSelected !== 0,
      },
      {
        queryKey: [QUERIES.COURSE.GET_COURSES_DETAILS_BY_ID, courseId],
        queryFn: () => courseService.getCoursesDetailsById(courseId),
        enabled: !!courseId,
        retry: false,
      },
    ],
  });

  const [learningQuery, lessonsLearningQuery, courseDetailQuery] = queries;

  useEffect(() => {
    if (courseDetailQuery.isError && !courseDetailQuery.isLoading) {
      console.error(
        "Erro ao buscar detalhes do curso:",
        courseDetailQuery.error,
      );
      router.replace("/(onboard)/home");
    }
  }, [courseDetailQuery.isError, courseDetailQuery.isLoading, router]);

  const {
    data: isSignedData,
    isFetched: isSignedFetched,
    isLoading: isSignedLoading,
  } = useQuery({
    queryKey: [QUERIES.AGREEMENT_TERM.IS_SIGNED, courseId],
    queryFn: () => agreementTermService.isSignedTerms(courseId as number),
    enabled:
      !!courseDetailQuery.data?.course?.id &&
      !!courseDetailQuery.data.enrollment?.id,
    retry: false,
  });

  const { data: agreementTerms } = useQuery({
    queryKey: [QUERIES.AGREEMENT_TERM.GET],
    queryFn: () =>
      agreementTermService.get(
        courseDetailQuery?.data?.enrollment?.id as number,
      ),
    enabled: !isSignedData && !!courseDetailQuery?.data?.enrollment?.id,
    retry: false,
  });

  const { data: terms } = useQuery({
    queryKey: [QUERIES.AGREEMENT_TERM.USER_TERMS],
    queryFn: () =>
      agreementTermService.userTerms(
        courseDetailQuery?.data?.enrollment?.id as number,
      ),
    enabled:
      !!courseId &&
      !!courseDetailQuery?.data?.enrollment?.id &&
      show &&
      (courseDetailQuery.data.course?.type?.name === "PROFISSIONALIZANTE" ||
        courseDetailQuery.data.course?.type?.name === "PÓS-GRADUAÇÃO"),
    retry: false,
  });

  return {
    disciplineSelected,
    setDisciplineSelected,
    courseDetail: courseDetailQuery.data,
    agreementTerms,
    terms,
    isSigned: isSignedData,
    isSignedFetched,
    isSignedLoading,
    isLoadingCourseDetail: courseDetailQuery.isLoading,
    isLoadingLessons: lessonsLearningQuery.isLoading,
    lessonsLearning: lessonsLearningQuery.data,
    learning: learningQuery.data,
    learningLoading: learningQuery.isLoading,
  };
}
