import useCourseConsumption from "@/src/_hooks/useCourseConsumption";
import StudentProgress from "@/src/components/course/student-progress";
import { useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

const CourseConsumptionScreen = () => {
  const { enrollmentId } = useLocalSearchParams();
  const enrollment = enrollmentId;
  const {
    states: { course, isOpen },
    actions: { setIsOpen },
  } = useCourseConsumption(Number(enrollmentId));

  return (
    <ScrollView className="flex-1 bg-brand-grey-10">
      <View className="flex-1 px-4 py-4">
        <Text
          numberOfLines={3}
          className="font-sans text-lg font-bold text-white lg:text-2xl mb-2"
        >
          {course?.title}
        </Text>
        <StudentProgress progress={100} />
        <View className="items-center justify-center">
          {/* Botão Flutuante (Trigger) */}
          <TouchableOpacity
            onPress={() => setIsOpen(true)}
            className="absolute right-4 top-40 h-10 w-10 items-center justify-center rounded bg-slate-800"
          >
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>

          {/* Sheet Content (Modal) */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => setIsOpen(false)}
          >
            <View className="flex-1 flex-row justify-end bg-black/50">
              {/* Área para fechar ao clicar fora */}
              <TouchableOpacity
                className="flex-1"
                onPress={() => setIsOpen(false)}
              />

              {/* O "Sheet" propriamente dito */}
              <View className="h-full w-[85%] bg-brand-grey-10 p-4 shadow-lg">
                <View className="mb-4 flex-row items-center justify-between">
                  <Text className="text-lg font-bold text-gray-400">
                    Conteúdo do Curso
                  </Text>
                  <TouchableOpacity onPress={() => setIsOpen(false)}>
                    <Text className="text-white">Fechar</Text>
                  </TouchableOpacity>
                </View>

                {/* <ScrollView showsVerticalScrollIndicator={false}>
                  {course && (
                    <LearnSidebar
                      enrollment={enrollment}
                      show={(course?.type.id === 1 || isSigned) ?? false}
                    />
                  )}
                </ScrollView> */}
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

export default CourseConsumptionScreen;
