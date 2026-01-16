import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "../constants/queries";
import { courseService } from "../services/courses";
import { useState } from "react";
import { agreementTermService } from "../services/agreement-term";
import { is } from "zod/v4/locales";

const useCourseConsumption = (enrollmentId: number) => {
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

  return {
    states: {
      enrollment,
      course,
      courseId,
      isLoadingEnrollment,
      isErrorEnrollment,
      isOpen,
      isSigned: isSignedData,
    },
    actions: { setIsOpen },
  };
};

export default useCourseConsumption;
