import { useForm } from "react-hook-form";
import useProfile from "./useProfile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // Importação corrigida
import { QUERIES } from "../constants/queries";
import { feedbackService } from "../services/feedback";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackSchema, FeedbackType } from "../lib/zod/feedback";
import { useEffect } from "react";

export const useCourseFeedBack = (
  rating: number,
  courseId: number,
  enrollmentId?: number,
) => {
  const { profileData } = useProfile();

  const queryClient = useQueryClient();

  const {
    setValue,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FeedbackType>({
    resolver: zodResolver(feedbackSchema) as any,
    defaultValues: {
      comment: "",
      rating: rating,
    } as any,
  });

  const { data: feedbackstars } = useQuery({
    queryFn: () => feedbackService.getFeedback(courseId),
    queryKey: [QUERIES.FEEDBACK.GET, courseId],
    enabled: courseId > 0 && !!profileData && !!enrollmentId,
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: (data: FeedbackType) => {
      return feedbackService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES.FEEDBACK.GET, courseId],
      });
    },
  });

  const handleSubmitFeedback = hookFormSubmit((data) => {
    const feedbackWithRating = {
      ...data,
      rating,
      courseId,
    };
    mutation.mutate(feedbackWithRating);
  });

  useEffect(() => {
    setValue("rating", rating);
  }, [rating, setValue]);

  return {
    setValue,
    errors,
    handleSubmitFeedback,
    feedbackstars,
    isLoadingSave: mutation.isPending,
    successResult: mutation.isSuccess ? "Avaliação enviada com sucesso!" : "",
    errorResult: mutation.isError ? "Não foi possível avaliar esse curso" : "",
  };
};
