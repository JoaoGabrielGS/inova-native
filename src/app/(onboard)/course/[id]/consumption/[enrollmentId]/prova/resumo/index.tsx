import { useState } from "react"; // 1. Importar useState
import { useCourseDetails } from "@/src/_hooks/useCourseDetails";
import Separator from "@/src/components/ui/separator";
import { useLocalSearchParams } from "expo-router";
import {
  CheckCircle2,
  Circle,
  CircleCheckBig,
  CircleDot,
  CircleX,
  ListOrdered,
  ThumbsDown,
  ThumbsUp,
  X,
  XCircle,
} from "lucide-react-native";
import {
  ScrollView,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import { useExamResume } from "@/src/_hooks/useExamResume";
import RenderHtml from "react-native-render-html";
import Splash from "@/src/components/splash";

const ResumoProva = () => {
  const { id } = useLocalSearchParams();
  const { courseDetail } = useCourseDetails(Number(id));
  const {
    states: { evaluation, isLoading },
  } = useExamResume(106658, 1572, 1572);

  const [modalVisible, setModalVisible] = useState(false);

  const ResultBlock = () => {
    if (!evaluation) return null;

    const score = evaluation.score ?? 0;
    const isApproved = score >= 6.0;

    const formattedScore = String(score).padStart(2, "0");

    return (
      <View
        className={`mt-6 rounded-3xl border p-6 items-center shadow-xl ${
          isApproved
            ? "border-green-500/50 bg-green-900/20"
            : "border-red-500/50 bg-red-900/20"
        }`}
        style={{ elevation: 10 }}
      >
        <View className="mb-4">
          {isApproved ? (
            <CircleCheckBig size={56} color="#22c55e" strokeWidth={2.5} />
          ) : (
            <CircleX size={56} color="#ef4444" strokeWidth={2.5} />
          )}
        </View>

        <Text className="mb-1 text-center text-2xl font-bold text-white md:text-xl lg:text-2xl">
          {isApproved
            ? "Parabéns! Você foi APROVADO"
            : "Que pena! Você foi REPROVADO"}
        </Text>

        <Text className="mt-4 text-center text-lg text-white">
          {isApproved
            ? "Você atingiu ou superou a nota mínima (6) e concluiu esta avaliação com sucesso!"
            : "Você precisava de pelo menos 6,0 para ser aprovado. Não desanime — estude mais e arrase na próxima oportunidade!"}
        </Text>

        <View className="mt-5">
          <Text className="text-4xl font-black text-white md:text-4xl">
            {formattedScore} / 10
          </Text>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return <Splash />;
  }

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
              Revisão da Avaliação
            </Text>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="border border-white rounded-full p-2"
            >
              <ListOrdered color="white" size={28} />
            </TouchableOpacity>
          </View>

          <View className="px-2">
            <Separator />
          </View>

          {evaluation?.answers.map((content, index) => {
            const sectionId = `question-${index}`;
            return (
              <View key={sectionId} className="mb-10 overflow-hidden px-2">
                <View className="flex-row items-center gap-2 mb-4">
                  <View className="border border-white rounded-full px-3 py-1">
                    <Text className="text-lg font-semibold text-white">
                      Questão {index + 1}
                    </Text>
                  </View>
                </View>

                <View>
                  {content.question.imageUrl && (
                    <Image
                      source={{ uri: content.question.imageUrl }}
                      className="mb-4 h-64 w-full rounded-lg border border-gray-300 shadow-sm"
                      resizeMode="contain"
                    />
                  )}

                  <RenderHtml
                    source={{ html: content.question.description.toString() }}
                    baseStyle={{
                      textAlign: "justify",
                      fontSize: 16,
                      color: "#FFF",
                    }}
                  />
                </View>

                <View className="mt-6 flex flex-col gap-3">
                  {content?.alternatives.map(
                    (alternative, alternativeIndex) => {
                      const userSelected = alternative.isSelected;
                      const isCorrect = alternative.isCorrect;

                      const textColor =
                        isCorrect && userSelected
                          ? "text-green-600"
                          : !isCorrect && userSelected
                            ? "text-red-600"
                            : "text-white";

                      const separatorColor = isCorrect
                        ? "bg-green-500"
                        : !isCorrect && userSelected
                          ? "bg-red-500"
                          : "bg-white";

                      return (
                        <View
                          key={alternative.id}
                          className="w-full flex-col gap-2 p-2"
                        >
                          <View className="flex-row items-center gap-3">
                            <View className="flex-row items-center gap-2 mt-1">
                              <Text
                                className={`text-lg font-bold ${textColor}`}
                              >
                                {String.fromCharCode(65 + alternativeIndex)}
                              </Text>
                              {userSelected ? (
                                <CircleDot
                                  size={18}
                                  color={isCorrect ? "#16a34a" : "#dc2626"}
                                />
                              ) : (
                                <Circle size={18} color="#9ca3af" />
                              )}
                            </View>

                            <View className="flex-1 flex-col gap-2">
                              {alternative.imageUrl && (
                                <Image
                                  source={{ uri: alternative.imageUrl }}
                                  className="h-40 w-full rounded-lg border border-gray-200"
                                  resizeMode="contain"
                                />
                              )}

                              <View className="flex-row items-center justify-between">
                                <Text
                                  className={`flex-1 text-lg text-justify font-semibold ${textColor}`}
                                >
                                  {alternative.description.replace(
                                    /<[^>]*>?/gm,
                                    "",
                                  )}
                                </Text>

                                {isCorrect && userSelected && (
                                  <CheckCircle2
                                    size={20}
                                    color="#16a34a"
                                    className="ml-2"
                                  />
                                )}
                                {!isCorrect && userSelected && (
                                  <XCircle
                                    size={20}
                                    color="#dc2626"
                                    className="ml-2"
                                  />
                                )}
                              </View>
                            </View>
                          </View>

                          {alternative.justification && (
                            <View className="mt-2 bg-slate-50 p-3 rounded-lg border-l-4 border-slate-300">
                              <Text className="text-sm">
                                <Text className="font-bold">
                                  Justificativa{" "}
                                </Text>
                                {alternative.justification}
                              </Text>
                            </View>
                          )}

                          <View
                            className={`h-[1px] w-full mt-2 ${separatorColor}`}
                          />
                        </View>
                      );
                    },
                  )}
                </View>
              </View>
            );
          })}
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
            <ResultBlock />

            <View className="flex-row justify-between items-center my-6">
              <Text className="text-white font-bold text-xl">
                Menu de Questões
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X color="white" size={28} />
              </TouchableOpacity>
            </View>

            {evaluation?.answers.map((content, index) => {
              const someCorrect = content.alternatives.some(
                (alternative) => alternative.isCorrect === true,
              );

              return (
                <TouchableOpacity key={index}>
                  <View className="flex w-full flex-col gap-2 p-2">
                    <View className="flex w-full flex-row items-center gap-2">
                      <View className="flex flex-1 flex-row items-center gap-2">
                        {someCorrect ? (
                          <ThumbsUp size={28} color="#16a34a" />
                        ) : (
                          <ThumbsDown size={28} color="#ef4444" />
                        )}
                        <Text
                          className={`text-xl font-bold ${someCorrect ? "text-green-600" : "text-brand-red-7"}`}
                        >
                          Questão {index + 1}
                        </Text>
                      </View>
                      <Text
                        className={`font-bold text-xl ${someCorrect ? "text-green-600" : "text-brand-red-7"}`}
                      >
                        1 Ponto
                      </Text>
                    </View>

                    <View className="flex flex-row items-center">
                      <Text numberOfLines={4} className="text-lg text-white">
                        {content.question.description.replace(/<[^>]*>?/gm, "")}
                      </Text>
                    </View>

                    <Separator className="my-2" />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ResumoProva;
