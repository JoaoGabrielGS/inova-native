import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "../constants/queries";
import { courseService } from "../services/courses";
import { useState } from "react";

const useCourseConsumption = (enrollmentId: number) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const course = enrollment?.course;
  const courseId = enrollment?.course.id;

  return {
    states: {
      enrollment,
      course,
      courseId,
      isLoadingEnrollment,
      isErrorEnrollment,
      isOpen,
    },
    actions: { setIsOpen },
  };
};

export default useCourseConsumption;
