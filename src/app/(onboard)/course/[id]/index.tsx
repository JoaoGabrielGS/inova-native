import { Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCourseDetails } from "../../../../_hooks/useCourseDetails";
import { FavoriteButton } from "../../../../components/course/favorite-button";
import { ArrowLeft } from "lucide-react-native";
import { FeedbackDialog } from "../../../../components/course/feedback-dialog";
import { useCourseFeedBack } from "@/src/_hooks/useCourseFeedback";
import { useState } from "react";
import { CourseDetailCard } from "@/src/components/course/course-detail-card";
import Splash from "@/src/components/splash";
import DocumentationCard from "@/src/components/course/documentation-card";
import TermsAndContractsDialog from "@/src/components/course/terms-and-contracts-dialog";
import { AgreementUserTermsResponseDTO } from "@/src/services/agreement-term/user-terms";

export default function CourseDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { courseDetail, isLoadingCourseDetail, terms } = useCourseDetails(
    Number(id),
  );
  const router = useRouter();
  const [rating] = useState(0);
  const { feedbackstars } = useCourseFeedBack(rating, Number(id));

  const isDisciplineEvaluation =
    courseDetail?.course?.type?.name === "PROFISSIONALIZANTE" ||
    courseDetail?.course?.type?.name === "PÓS-GRADUAÇÃO";

  if (isLoadingCourseDetail) {
    return <Splash />;
  }

  return (
    <ScrollView className="flex-1 bg-brand-grey-10 p-4">
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

      <View className="mt-6">
        {courseDetail && <CourseDetailCard courseDetail={courseDetail} />}
      </View>

      {/* {courseDetail?.course?.type?.name === "PÓS-GRADUAÇÃO" && (
        <DocumentationCard course={courseDetail.course} />
      )} */}

      <DocumentationCard />

      {isDisciplineEvaluation && courseDetail.enrollment?.id && (
        <View className="mb-10 mt-6 overflow-hidden lg:hidden">
          <TermsAndContractsDialog
            terms={terms?.userAgreementTerms as AgreementUserTermsResponseDTO}
          />
        </View>
      )}
    </ScrollView>
  );
}
