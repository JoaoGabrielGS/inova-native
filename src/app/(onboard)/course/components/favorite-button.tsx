import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  ViewProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useProfile from "@/src/_hooks/useProfile";
import { useFavorites } from "@/src/_hooks/useFavorite";

export interface FavoriteButtonProps extends ViewProps {
  courseId: number;
  srOnly?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  courseId,
  srOnly = true,
  style,
  ...props
}) => {
  const [favorite, setFavorite] = useState(false);
  const { profileData } = useProfile();
  const { addFavoriteMutation, removeFavoriteMutation, isLoading, favorites } =
    useFavorites();

  const handleFavorite = async () => {
    try {
      if (favorite) {
        await removeFavoriteMutation.mutateAsync(courseId);
      } else {
        await addFavoriteMutation.mutateAsync(courseId);
      }
      setFavorite(!favorite);
    } catch (error) {
      console.error("Erro ao favoritar:", error);
    }
  };

  useEffect(() => {
    if (favorites && favorites.length > 0) {
      setFavorite(favorites.some((item) => item.course.id === courseId));
    }
  }, [favorites, courseId]);

  if (!profileData) return null;

  return (
    <TouchableOpacity
      onPress={handleFavorite}
      disabled={isLoading}
      activeOpacity={0.7}
      className={`flex-row items-center py-2 justify-center rounded-md border border-white`}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={"#E65100"} className="h-5 w-5" />
      ) : (
        <View className="flex-row items-center">
          {favorite ? (
            <Ionicons name="heart" size={20} color="#EF4444" />
          ) : (
            <Ionicons name="heart-outline" size={20} color="#6B7280" />
          )}

          {!srOnly && (
            <Text className={`ml-2 font-medium text-white`}>Favorito</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export { FavoriteButton };
