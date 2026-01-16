import { useCourseDetails } from "@/src/_hooks/useCourseDetails";
import { useExam } from "@/src/_hooks/useExam";
import Splash from "@/src/components/splash";
import { Button } from "@/src/components/ui/button";
import Separator from "@/src/components/ui/separator";
import { ExamRequest } from "@/src/services/exam/create";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  ListOrdered,
  Pencil,
  X,
} from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHTML from "react-native-render-html";

const Prova = () => {
  const { id, enrollmentId, module, discipline } = useLocalSearchParams();
  const {
    states: { questions, isLoading, isLoadingSave },
    actions: { finishEvaluation },
  } = useExam(
    Number(enrollmentId),
    Number(discipline) ?? 0,
    Number(module) ?? 0,
  );

  const { courseDetail } = useCourseDetails(Number(id));
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { width } = useWindowDimensions();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [exam, setExam] = useState<ExamRequest>({
    answers: [],
    disciplineId: null,
    moduleId: null,
  });

  const questionsSize = questions?.length || 0;
  const [confirmFinish, setConfirmFinish] = useState(false);

  const storageKey = `exam-${courseDetail?.enrollment?.id}-${discipline || module}`;

  useEffect(() => {
    const loadStoredExam = async () => {
      const stored = await AsyncStorage.getItem(storageKey);

      const baseExam = {
        disciplineId: discipline ? Number(discipline) : null,
        moduleId: module ? Number(module) : null,
        answers: [],
      };

      if (stored) {
        const jsonExam = JSON.parse(stored);
        if (jsonExam?.answers?.length > 0 && questions?.length > 0) {
          const validAnswers = jsonExam.answers.filter((ans: any) =>
            questions.some((q) => q.id === ans.questionId),
          );

          setExam({ ...baseExam, answers: validAnswers });
          return;
        }
      }

      setExam(baseExam);
    };

    loadStoredExam();
  }, [questions, discipline, module]);

  useEffect(() => {
    const saveExam = async () => {
      await AsyncStorage.setItem(storageKey, JSON.stringify(exam));
    };
    if (exam.answers.length > 0) saveExam();

    setDisabled(
      !(exam.answers.length === questionsSize && questionsSize !== 0),
    );
  }, [exam, questionsSize]);

  const handleOptionChange = useCallback(
    (alternativeId: number) => {
      const questionId = questions[currentQuestionIndex]?.id;
      if (!questionId) return;

      setExam((prev) => {
        const existingIndex = prev.answers.findIndex(
          (a) => a.questionId === questionId,
        );
        let newAnswers = [...prev.answers];

        if (existingIndex > -1) {
          newAnswers[existingIndex] = {
            ...newAnswers[existingIndex],
            alternativeId,
          };
        } else {
          newAnswers.push({ questionId, alternativeId });
        }
        return { ...prev, answers: newAnswers };
      });
    },
    [currentQuestionIndex, questions],
  );

  const isSelected = (altId: number) => {
    return exam.answers.some(
      (a) =>
        a.questionId === questions[currentQuestionIndex]?.id &&
        a.alternativeId === altId,
    );
  };

  if (isLoading) return <Splash />;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ScrollView className="flex-1 bg-brand-grey-10 py-4">
      <View>
        <View className="w-full">
          <Text className="font-bold uppercase text-white text-2xl text-center">
            Atividade Avaliativa
          </Text>
          <Text className="text-white text-lg text-center">
            Curso: {courseDetail?.course?.title}
          </Text>

          <Separator />

          <View className="flex-row gap-2 w-full justify-between px-2 items-center">
            <Text className="text-white font-bold text-xl">
              Questionário Objetivo
            </Text>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="border border-white rounded-full p-2"
            >
              <ListOrdered color="white" size={28} />
            </TouchableOpacity>
          </View>

          <View className="px-2">
            <Text className="text-white">
              Questões Respondidas {exam.answers.length} / 10
            </Text>
            <Separator />
          </View>

          <ScrollView className="flex-1">
            <View className="p-4">
              {currentQuestion?.imageUrl && (
                <Image
                  source={{ uri: currentQuestion.imageUrl }}
                  className="h-64 w-full rounded-lg border border-gray-300"
                  resizeMode="contain"
                />
              )}

              <View className="my-4">
                <RenderHTML
                  contentWidth={width - 32}
                  source={{ html: currentQuestion?.description || "" }}
                  baseStyle={{
                    fontSize: 16,
                    color: "#FFF",
                    textAlign: "justify",
                  }}
                />
              </View>

              <View className="mt-4 gap-y-3">
                {currentQuestion?.alternatives?.map((alt, index) => {
                  const active = isSelected(alt.id);
                  return (
                    <TouchableOpacity
                      key={alt.id}
                      onPress={() => handleOptionChange(alt.id)}
                      className={`flex-col rounded-lg border p-4 ${active ? "border-white bg-brand-primary-9" : "border-white"}`}
                    >
                      <View className="flex-row items-center">
                        <View
                          className={`h-5 w-5 rounded-full border-2 items-center justify-center ${active ? "border-white bg-white" : "border-white"}`}
                        >
                          {active && (
                            <View className="h-2.5 w-2.5 rounded-full " />
                          )}
                        </View>

                        <Text
                          className={`ml-3 font-bold ${active ? "text-white" : "text-white"}`}
                        >
                          {String.fromCharCode(65 + index)})
                        </Text>
                      </View>

                      {alt.imageUrl && (
                        <Image
                          source={{ uri: alt.imageUrl }}
                          className="h-40 w-full mt-2 rounded"
                          resizeMode="contain"
                        />
                      )}

                      <RenderHTML
                        contentWidth={width - 80}
                        source={{ html: alt.description }}
                        baseStyle={{
                          fontSize: 14,
                          marginTop: 8,
                          color: "#FFF",
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View className="flex-row justify-between p-4 border-t border-gray-100 mt-4">
              <TouchableOpacity
                disabled={currentQuestionIndex === 0}
                onPress={() => setCurrentQuestionIndex((v) => v - 1)}
                className={`flex-row items-center px-6 py-3 rounded-md border ${currentQuestionIndex === 0 ? "opacity-30" : "border-white"}`}
              >
                <ChevronLeft size={20} color="white" />
                <Text className="ml-2 text-white">Anterior</Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={currentQuestionIndex === questionsSize - 1}
                onPress={() => setCurrentQuestionIndex((v) => v + 1)}
                className={`flex-row items-center px-6 py-3 rounded-md border ${currentQuestionIndex === questionsSize - 1 ? "opacity-30" : "border-white"}`}
              >
                <Text className="mr-2 text-white">Próxima</Text>
                <ChevronRight size={20} color="white" />
              </TouchableOpacity>
            </View>

            {currentQuestionIndex === questionsSize - 1 && (
              <View className="p-4">
                <TouchableOpacity
                  disabled={disabled}
                  onPress={() => setConfirmFinish(true)}
                  className={`h-14 items-center justify-center rounded-lg ${disabled ? "bg-gray-400" : "bg-green-600"}`}
                >
                  <Text className="text-white font-bold text-lg">
                    Finalizar Questionário
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 flex-row">
          <Pressable
            className="w-[10%] h-full bg-black/50"
            onPress={() => setModalVisible(false)}
          />
          <ScrollView className="bg-brand-grey-10 w-[90%] h-full p-6 shadow-xl border-r border-white/10">
            <View className="flex-row justify-between items-center mt-6">
              <Text className="text-white font-bold text-xl">
                Atividade Avaliativa
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X color="white" size={28} />
              </TouchableOpacity>
            </View>

            <View className="mt-2">
              <Text className="text-white">
                10 Questões Objetiva de Múltipla Escolha
              </Text>
            </View>

            <Separator />

            {questions.map((content, index) => {
              return (
                <TouchableOpacity key={index}>
                  <View className="flex w-full flex-col gap-2 p-2">
                    <View className="flex w-full flex-row items-center gap-2">
                      <View className="flex flex-1 flex-row items-center gap-2">
                        <Text className={`text-xl font-bold text-white`}>
                          Questão {index + 1}
                        </Text>
                      </View>
                      <Text className={`font-bold text-xl text-white`}>
                        1 Ponto
                      </Text>
                    </View>

                    <View className="flex flex-row items-center">
                      <Text numberOfLines={4} className="text-lg text-white">
                        {content.description.replace(/<[^>]*>?/gm, "")}
                      </Text>
                    </View>

                    <Separator className="my-2" />
                  </View>
                </TouchableOpacity>
              );
            })}

            <Button
              text="FINALIZAR QUESTIONÁRIO"
              className="mb-8"
              disabled={true}
            />
          </ScrollView>
        </View>
      </Modal>

      <Modal
        visible={confirmFinish}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmFinish(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/60 px-4">
          <View className="w-full max-w-lg rounded-3xl bg-brand-grey-9 shadow-xl overflow-hidden">
            <View className="p-6 items-center">
              <Text className="text-center text-2xl font-bold text-white lg:text-3xl">
                Você está prestes a{" "}
                <Text className="text-brand-primary-9">
                  finalizar a avaliação
                </Text>
              </Text>

              <View className="mt-6 w-full space-y-5">
                <Text className="text-base text-white leading-6 mb-6 text-center">
                  Ao clicar em{" "}
                  <Text className="font-bold text-brand-primary-9">
                    "Finalizar Avaliação"
                  </Text>
                  , sua prova será enviada para correção{" "}
                  <Text className="font-bold">imediatamente</Text>.
                </Text>

                <View className="rounded-2xl border border-brand-primary-9 bg-brand-primary-9/10 p-5 mb-4">
                  <Text className="mb-3 text-base font-bold text-brand-primary-9 uppercase tracking-wider">
                    ATENÇÃO – AÇÃO IRREVERSÍVEL
                  </Text>

                  <View className="space-y-3">
                    <View className="flex-row items-start">
                      <Text className="mr-2 text-brand-primary-9">•</Text>
                      <Text className="text-base text-brand-primary-9 flex-1">
                        Você{" "}
                        <Text className="font-bold">não poderá voltar</Text>{" "}
                        para alterar ou revisar respostas
                      </Text>
                    </View>
                    <View className="flex-row items-start">
                      <Text className="mr-2 text-brand-primary-9">•</Text>
                      <Text className="text-base text-brand-primary-9 flex-1">
                        A nota será calculada com base nas respostas enviadas
                        neste momento
                      </Text>
                    </View>
                  </View>
                </View>

                <Text className="text-center text-base font-medium text-white">
                  Recomendamos revisar todas as questões antes de confirmar.
                </Text>
              </View>

              <View className="mt-8 w-full flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                <TouchableOpacity
                  onPress={() => setConfirmFinish(false)}
                  className="flex-row items-center mb-4 justify-center rounded-xl border border-gray-300 py-4 px-6"
                >
                  <Text className="text-white font-semibold">
                    Voltar e revisar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={isSubmitting}
                  onPress={async () => {
                    if (isSubmitting) return;

                    setIsSubmitting(true);
                    try {
                      finishEvaluation(exam);

                      await AsyncStorage.removeItem(storageKey);
                    } catch (error) {
                      console.error("Erro ao finalizar:", error);
                    } finally {
                      setIsSubmitting(false);
                      setConfirmFinish(false);
                    }
                  }}
                  className={`flex-row items-center justify-center rounded-xl py-4 px-6 bg-brand-primary-9`}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#FFF" className="mr-2" />
                  ) : (
                    <Text className="text-white font-bold text-center">
                      Finalizar Avaliação
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={isLoadingSave} transparent animationType="slide">
        <View className="flex-1 items-center justify-center bg-black/30 px-6">
          <View className="w-full rounded-3xl bg-brand-grey-9 p-8 shadow-xl">
            <View className="flex-row items-center justify-center mb-4">
              <Pencil size={24} color="#10b981" />
              <Text className="ml-3 text-xl font-bold text-green-600">
                Corrigindo sua Avaliação
              </Text>
            </View>

            <Text className="text-center  text-white leading-5">
              Aguarde um momento, estamos corrigindo sua avaliação, você será
              encaminhado para o gabarito
            </Text>

            <View className="mt-8 py-4">
              <ActivityIndicator color="#ef4444" size={28} className="mr-2" />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Prova;
