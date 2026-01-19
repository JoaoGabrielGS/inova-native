import useCourseConsumption from "@/src/_hooks/useCourseConsumption";
import {
  progressPercentageAtom,
  selectedDisciplineNameAtom,
  selectedLessonAtom,
  useLearnSidebar,
} from "@/src/_hooks/useLearnSidebar";
import TermsAndContractsRequestDialog from "@/src/components/course/sign-terms-and-contracts-dialog";
import StudentProgress from "@/src/components/course/student-progress";
import LearnSidebar from "@/src/components/sidebars/learn-sidebar";
import Splash from "@/src/components/splash";
import { Button } from "@/src/components/ui/button";
import VideoAndPdfViewer from "@/src/components/ui/mediaViewer";
import Separator from "@/src/components/ui/separator";
import {
  CourseConsumptionLesson,
  CourseConsumptionResponse,
} from "@/src/services/courses/consumption";
import { useLocalSearchParams } from "expo-router";
import { useAtom } from "jotai";
import { List } from "lucide-react-native";
import { useEffect } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

const CourseConsumptionScreen = () => {
  const { enrollmentId } = useLocalSearchParams();
  const {
    states: {
      course,
      isOpen,
      enrollment,
      isSigned,
      isSignedFetched,
      isSignedLoading,
      terms,
      isLoadingEnrollment,
      rating,
      // isLoadingTerms,
      // isErrorTerms,
    },
    actions: { setIsOpen },
  } = useCourseConsumption(Number(enrollmentId));

  const {
    states: { isFirstLesson, isLastLesson, isNextDisciplineLiberated },
    actions: { handleNextLesson, handlePrevLesson, handleCompleteLesson },
  } = useLearnSidebar(
    enrollment as CourseConsumptionResponse,
    true,
    Number(enrollmentId),
  );

  const [disciplineName] = useAtom(selectedDisciplineNameAtom);
  const [selectedClass, setSelectedClass] =
    useAtom<CourseConsumptionLesson | null>(selectedLessonAtom);
  const [progressPercentage] = useAtom(progressPercentageAtom);

  useEffect(() => {
    setSelectedClass(null);
  }, [enrollmentId]);

  if (isLoadingEnrollment) {
    return <Splash />;
  }

  return (
    <View className="flex-1 bg-brand-grey-10">
      <ScrollView>
        <View className="px-4 py-4">
          <Text
            numberOfLines={3}
            className="font-sans text-lg font-bold text-white lg:text-2xl mb-2"
          >
            {course?.title}
          </Text>
          <StudentProgress progress={progressPercentage} />
          <View>
            <ScrollView className="p-4 bg-brand-grey-20 rounded-lg">
              {selectedClass && (
                <View className="lg:mr-20">
                  <View className="font-sans">
                    <Text className="text-sm font-bold text-gray-400">
                      DISCIPLINA:
                    </Text>
                    <Text className="text-sm font-bold text-gray-400">
                      {disciplineName}
                    </Text>
                    <Separator className="mt-2" />
                  </View>

                  <View className="pt-4">
                    <Text className="text-xs font-bold text-white uppercase">
                      Aula:
                    </Text>
                    <Text className="text-lg font-bold text-white md:text-xl">
                      {selectedClass.title}
                    </Text>
                    <Separator className="mt-2" />
                  </View>

                  <View className="pt-6">
                    <VideoAndPdfViewer
                      content={selectedClass.description || ""}
                    />
                  </View>

                  <View className="pt-10">
                    <VideoAndPdfViewer content={selectedClass.content || ""} />
                  </View>

                  <View className="pt-6">
                    <Button
                      className={`font-bold ${
                        selectedClass.watched
                          ? "bg-green-600 text-white"
                          : "border-gray-500 text-gray-400"
                      }`}
                      variant={selectedClass.watched ? "success" : "outline"}
                      onPress={handleCompleteLesson}
                      disabled={selectedClass.watched}
                      text="Concluir Aula"
                    />
                  </View>

                  <Separator className="my-4" />

                  <View className="mt-6 flex-row items-center justify-between w-full">
                    <View className="w-1/5">
                      {!isFirstLesson && (
                        <Button
                          variant="outline"
                          onPress={handlePrevLesson}
                          text="<"
                        />
                      )}
                    </View>

                    {/* <View className="flex-1 items-center">
                      <Text className="text-xs font-bold text-gray-400">
                        Avalie esta aula
                      </Text>
                      <StarRatingConsumption
                        rating={rating}
                        onRatingSubmit={handleRatingSubmit}
                        hasRating={!!selectedClass.feedback}
                      />
                    </View> */}

                    <View className="w-1/5 items-end">
                      {!isLastLesson && (
                        <Button
                          onPress={handleNextLesson}
                          disabled={!isNextDisciplineLiberated}
                          text=">"
                        />
                      )}
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className="absolute bottom-4 right-4 z-10 h-12 w-12 items-center justify-center rounded-full bg-brand-primary-9"
      >
        <List size={24} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <View className="flex-1 flex-row justify-end bg-black/50">
          <TouchableOpacity
            className="flex-1"
            onPress={() => setIsOpen(false)}
          />

          <View className="h-full w-[85%] bg-brand-grey-10 shadow-lg">
            <View className="mb-4 flex-row items-center p-3 justify-between">
              <Text className="text-lg font-bold text-gray-400">
                Conteúdo do Curso
              </Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Text className="text-white">Fechar</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {course && (
                <LearnSidebar
                  enrollment={enrollment as CourseConsumptionResponse}
                  show={(course?.type.id === 1 || isSigned) ?? false}
                />
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
      {terms && course?.id && course.type.id !== 1 && (
        <TermsAndContractsRequestDialog
          terms={terms}
          isOpen={!isSigned && isSignedFetched}
          isLoading={isSignedLoading}
          courseId={course.id}
        />
      )}
    </View>
  );
};

export default CourseConsumptionScreen;
