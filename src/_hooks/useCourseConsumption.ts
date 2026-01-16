import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERIES } from "../constants/queries";
import { courseService } from "../services/courses";
import { useEffect, useState } from "react";
import { agreementTermService } from "../services/agreement-term";
import { is } from "zod/v4/locales";
import { selectedLessonAtom } from "./useLearnSidebar";
import { CourseConsumptionLesson } from "../services/courses/consumption";
import { useAtom } from "jotai";

const useCourseConsumption = (enrollmentId: number) => {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [selectedClass, setSelectedClass] =
    useAtom<CourseConsumptionLesson | null>(selectedLessonAtom);

  useEffect(() => {
    if (selectedClass) {
      const initialRating = selectedClass.feedback?.rating ?? 0;
      setRating(initialRating);
    }
  }, [selectedClass]);

  const {
    data: enrollment,
    isLoading: isLoadingEnrollment,
    isError: isErrorEnrollment,
  } = useQuery({
    queryKey: [QUERIES.COURSE.GET_BY_ENROLLMENT_ID, enrollmentId],
    enabled: !!enrollmentId && enrollmentId > 0,
    queryFn: () => courseService.consumption(enrollmentId.toString()),
    retry: false,
  });

  const [isOpen, setIsOpen] = useState(false);

  const course = enrollment?.course;
  const courseId = enrollment?.course.id;
  const {
    data: isSignedData,
    isFetched: isSignedFetched,
    isLoading: isSignedLoading,
  } = useQuery({
    queryKey: [QUERIES.AGREEMENT_TERM.IS_SIGNED, courseId],
    queryFn: () => agreementTermService.isSignedTerms(courseId as number),
    retry: false,
    enabled:
      course?.type.id !== 1 &&
      !!courseId &&
      courseId > 0 &&
      !!enrollmentId &&
      enrollmentId > 0,
  });

  const agreementTermQuery = useQuery({
    queryKey: [QUERIES.AGREEMENT_TERM.GET, courseId],
    queryFn: () => agreementTermService.get(enrollmentId as number),
    enabled:
      !!courseId &&
      courseId > 0 &&
      !!enrollmentId &&
      enrollmentId > 0 &&
      isSignedFetched &&
      !isSignedData,
    retry: false,
  });

  const { mutate: ratingLessonMutate, isPending } = useMutation({
    mutationFn: (newRating: number) =>
      courseService.ratingLesson(
        enrollmentId,
        selectedClass?.id ?? 0,
        newRating,
      ),
    onMutate: async (newRating: number) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERIES.COURSE.GET_BY_ENROLLMENT_ID, enrollmentId],
      });

      setRating(newRating);

      if (selectedClass) {
        setSelectedClass({
          ...selectedClass,
          feedback: { rating: newRating },
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES.COURSE.GET_BY_ENROLLMENT_ID, enrollmentId],
      });
    },
    onError: (error) => {
      console.error("Erro ao avaliar a aula:", error);
    },
  });
  const handleRatingSubmit = (newRating: number) => {
    ratingLessonMutate(newRating);
  };

  return {
    states: {
      enrollment,
      course,
      courseId,
      isLoadingEnrollment,
      isErrorEnrollment,
      isOpen,
      isSigned: isSignedData,
      isSignedFetched,
      isSignedLoading,
      terms: agreementTermQuery.data,
      isLoadingTerms: agreementTermQuery.isLoading,
      isErrorTerms: agreementTermQuery.isError,
      rating,
      isRatingLoading: isPending,
    },
    actions: { setIsOpen, handleRatingSubmit },
  };
};

export default useCourseConsumption;
