import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
import Separator from "@/src/components/ui/separator";
import { Accordion } from "@/src/components/ui/accordion";

export default function CourseDetailsScreen() {
  const { id } = useLocalSearchParams();
  const {
    courseDetail,
    isLoadingCourseDetail,
    terms,
    setDisciplineSelected,
    learning,
    isLoadingLessons,
    lessonsLearning,
    learningLoading,
  } = useCourseDetails(Number(id));
  const router = useRouter();
  const [rating] = useState(0);
  const { feedbackstars } = useCourseFeedBack(rating, Number(id));

  const isDisciplineEvaluation =
    courseDetail?.course?.type?.name === "PROFISSIONALIZANTE" ||
    courseDetail?.course?.type?.name === "PÓS-GRADUAÇÃO";

  const categoryName = courseDetail?.course?.category?.name;

  const categorySlug = categoryName
    ? categoryName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace("ç", "c")
        .toLowerCase()
        .trim()
    : "";

  const colors = {
    tecnologia: "#3b82f6",
    saude: "#e11d48",
    negocio: "#22c55e",
    educacao: "#f97316",
    gastronomia: "#eab308",
    criativ: "#ec4899",
    default: "#ffffff",
  };

  const getActiveColor = () => {
    if (categorySlug.includes("tecnologia")) return colors.tecnologia;
    if (categorySlug.includes("saude")) return colors.saude;
    if (categorySlug.includes("negocio")) return colors.negocio;
    if (categorySlug.includes("educacao")) return colors.educacao;
    if (categorySlug.includes("gastronomia")) return colors.gastronomia;
    if (categorySlug.includes("criativ")) return colors.criativ;
    return colors.default;
  };

  const activeColor = getActiveColor();

  if (isLoadingCourseDetail || learningLoading) {
    return <Splash />;
  }

  return (
    <ScrollView className="flex-1 bg-brand-grey-10 p-4 ">
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

      {courseDetail?.course?.type?.name === "PÓS-GRADUAÇÃO" && (
        <DocumentationCard course={courseDetail.course} />
      )}

      {isDisciplineEvaluation && courseDetail.enrollment?.id && (
        <View className="mb-10 mt-6 overflow-hidden lg:hidden">
          <TermsAndContractsDialog
            terms={terms?.userAgreementTerms as AgreementUserTermsResponseDTO}
          />
        </View>
      )}

      <Text className="font-bold text-xl text-white">
        {courseDetail?.course?.title}
      </Text>

      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.badge, { borderColor: activeColor }]}
        >
          <Text style={[styles.badgeText, { color: activeColor }]}>
            {categoryName}
          </Text>
        </TouchableOpacity>

        <Text className="font-bold text-white mt-4">
          CURSO {courseDetail?.course?.type?.name?.toUpperCase()}
        </Text>
      </View>

      <View className="flex-row items-center gap-4">
        <View className="h-12 w-2 bg-red-600" />
        <Text className="text-lg font-bold text-red-600">
          O que eu vou aprender neste curso?
        </Text>
      </View>

      <Separator />

      {courseDetail?.course?.description && (
        <View className="mb-6 px-2">
          <Text className="text-base text-white">
            {courseDetail.course.description.replace(/<[^>]*>?/gm, "")}
          </Text>
        </View>
      )}

      <View className="mt-6 flex-row items-center gap-4">
        <View className="h-12 w-2 bg-red-600" />
        <Text className="text-lg font-bold text-red-600">
          Quem é meu Professor?
        </Text>
      </View>

      <Separator />

      <View className="flex-row items-center gap-4 px-2">
        <Image
          source={{ uri: courseDetail?.instructor?.avatarUrl }}
          className="h-14 w-14 rounded-full bg-gray-300"
          resizeMode="cover"
        />
        <View className="flex-1">
          {courseDetail?.instructor?.bio ? (
            <Text className="text-base leading-5 text-white">
              {courseDetail.instructor.bio}
            </Text>
          ) : (
            <Text className="text-base text-white">
              Informações do instrutor{" "}
              <Text className="font-bold">
                {courseDetail?.instructor?.name}
              </Text>{" "}
              não disponíveis
            </Text>
          )}
        </View>
      </View>

      <View className="mt-8 flex-row items-center gap-4">
        <View className="h-12 w-2 bg-red-600" />
        <Text className="text-lg font-bold text-red-600">
          Conteúdo do Curso
        </Text>
      </View>

      <Separator />

      <Accordion className="mb-6">
        {learning &&
          learning.map((discipline, index) => (
            <Accordion.Item value={`item-${index}`} key={`discipline-${index}`}>
              <Accordion.Trigger
                value={`item-${index}`}
                onPress={() => {
                  setDisciplineSelected(discipline.id);
                }}
                className="border px-2 rounded-md border-white mb-2"
              >
                {index + 1} - {discipline.name}
              </Accordion.Trigger>

              <Accordion.Content
                value={`item-${index}`}
                className="bg-brand-grey-9 rounded-md pr-5"
              >
                {isLoadingLessons ? (
                  <View className="flex-row justify-center items-center w-full">
                    <ActivityIndicator size="small" color="#EF6C00" />
                  </View>
                ) : (
                  <View className="flex-col w-full">
                    {lessonsLearning?.map((lesson, lessonIndex) => (
                      <View
                        key={`lesson-${lessonIndex}`}
                        className="p-4 bg-brand-grey-7 m-2 rounded-md w-full"
                      >
                        <Text className="text-white">
                          {lessonIndex + 1} - {lesson}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </Accordion.Content>
            </Accordion.Item>
          ))}
      </Accordion>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  badge: {
    borderWidth: 2,
    backgroundColor: "transparent",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
