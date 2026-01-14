import { useState } from "react";
import useProfile from "./useProfile";
import { courseService } from "../services/courses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERIES } from "../constants/queries";
import { FavoritedCourse } from "../services/courses/favorites-ids";

export const useFavorites = () => {
  const { profileData } = useProfile();
  const [retry, setRetry] = useState<boolean>();
  const queryClient = useQueryClient();

  const fetchFavorites = async (): Promise<FavoritedCourse[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = courseService.favoritesIds();
        setRetry(false);
        resolve(response);
      }, 2000);
    });
  };

  const addFavoriteMutation = useMutation({
    mutationFn: (data: number) => courseService.favorite(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES.COURSE.FAVORITES, QUERIES.COURSE.FAVORITES_IDS],
      });
      setRetry(true);
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: (data: number) => courseService.unfavorite(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES.COURSE.FAVORITES, QUERIES.COURSE.FAVORITES_IDS],
      });
      setRetry(true);
    },
  });

  const { data: favorites } = useQuery<FavoritedCourse[]>({
    queryFn: fetchFavorites,
    queryKey: [QUERIES.COURSE.FAVORITES_IDS],
    enabled: !!profileData && retry,
  });

  return {
    favorites: favorites ?? [],
    isLoading:
      addFavoriteMutation.isPending || removeFavoriteMutation.isPending,
    addFavoriteMutation,
    removeFavoriteMutation,
  };
};
