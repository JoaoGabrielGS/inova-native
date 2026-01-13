"use client";
import { Pressable, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCourseDetails } from "./useCourseDetails";
import { FavoriteButton } from "./components/favorite-button";
import { ArrowLeft } from "lucide-react-native";
import { FeedbackDialog } from "./components/feedback-dialog";
import { useCourseFeedBack } from "@/src/_hooks/useCourseFeedback";
import { useState } from "react";

export default function CourseDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { courseDetail, isLoadingCourseDetail } = useCourseDetails(Number(id));
  const router = useRouter();
  const [rating] = useState(0);
  const { feedbackstars } = useCourseFeedBack(rating, Number(id));

  return (
    <View className="flex-1 bg-brand-grey-10 p-4">
      <View className="flex-row justify-between items-center">
        <Pressable
          className="p-2 border border-white rounded-md"
          onPress={() => router.back()}
        >
          <ArrowLeft color={"#FFF"} />
        </Pressable>
        <View className="w-36">
          <FavoriteButton courseId={Number(id)} srOnly={false} />
        </View>
      </View>

      {courseDetail?.course?.id && courseDetail?.enrollment && (
        <FeedbackDialog
          courseId={courseDetail?.course?.id}
          feedback={
            feedbackstars?.rating
              ? feedbackstars
              : courseDetail?.enrollment?.feedback
          }
          enrollmentId={courseDetail?.enrollment?.id}
          isLoading={isLoadingCourseDetail}
        />
      )}

      <Text className="text-white text-lg mt-2">
        ID do Curso: {courseDetail?.course?.title}
      </Text>
    </View>
  );
}
