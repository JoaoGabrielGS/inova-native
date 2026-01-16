import React from "react";
import { View } from "react-native";
import { Star } from "lucide-react-native";
import { Button } from "./button";

interface StarRatingProps {
  rating: number;
  onRatingSubmit: (rating: number) => void;
  hasRating?: boolean;
}

const StarRatingConsumption: React.FC<StarRatingProps> = ({
  rating,
  onRatingSubmit,
  hasRating = false,
}) => {
  const handleClick = (star: number) => {
    onRatingSubmit(star);
  };

  return (
    <View className="flex-row items-center justify-center space-x-1">
      {Array.from({ length: 5 }, (_, index) => index + 1).map((star) => (
        <Button
          key={star}
          variant="outline"
          onPress={() => handleClick(star)}
          disabled={hasRating}
          className="p-1"
          icon={
            star <= rating ? (
              <Star size={24} color="#EAB308" fill="#EAB308" />
            ) : (
              <Star size={24} color="#EAB308" />
            )
          }
        />
      ))}
    </View>
  );
};

export default StarRatingConsumption;
