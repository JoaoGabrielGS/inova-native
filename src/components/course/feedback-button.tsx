import React from "react";
import { TouchableOpacity, View, ViewProps } from "react-native";
import StarRating from "./star-rating";

interface FeedbackButtonProps extends ViewProps {
  rating: number;
  onPress?: () => void;
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  rating,
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex-row w-full h-12 mt-4 items-center justify-center border border-gray-200 rounded-lg bg-transparent px-4"
      {...props}
    >
      <View pointerEvents="none">
        <StarRating rating={rating} onRatingChange={() => {}} />
      </View>
    </TouchableOpacity>
  );
};

export { FeedbackButton };
