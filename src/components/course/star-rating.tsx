"use client";

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Star } from "lucide-react-native";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  feedback?: any;
  hasRating?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  feedback,
  hasRating = false,
}) => {
  const handlePress = (star: number) => {
    if (!hasRating) {
      onRatingChange(star);
    }
  };

  return (
    <View className="flex-row w-full items-center justify-between">
      <Text className="font-bold text-white">
        {feedback ? "Minha avaliação:" : "Avalie seu curso"}
      </Text>

      <View className="flex-row space-x-2">
        {Array.from({ length: 5 }, (_, index) => index + 1).map((star) => (
          <TouchableOpacity
            key={star}
            activeOpacity={0.6}
            onPress={() => handlePress(star)}
            disabled={hasRating}
            className="p-1"
          >
            {star <= rating ? (
              <Star size={28} fill="#F97316" color="#F97316" />
            ) : (
              <Star size={28} color="#D1D5DB" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default StarRating;
