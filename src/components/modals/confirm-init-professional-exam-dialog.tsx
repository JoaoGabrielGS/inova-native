import React from "react";
import { Modal, View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Button } from "../ui/button";
import Separator from "../ui/separator";

interface ConfirmInitProfessionalExamProps {
  enrollmentId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  discipline?: { id: number } | null;
  courseId?: number;
}

const ConfirmInitProfessionalExamDialog: React.FC<
  ConfirmInitProfessionalExamProps
> = ({ enrollmentId, isOpen, onOpenChange, discipline, courseId }) => {
  const router = useRouter();

  const handleStartActivity = () => {
    onOpenChange(false);
    router.push(
      `/course/${courseId}/consumption/${enrollmentId}/prova?discipline=${discipline?.id}`,
    );
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <View className="flex-1 items-center justify-center bg-black/30 px-4">
        <View className="w-full max-w-md rounded-2xl p-6 shadow-xl bg-brand-grey-9 max-h-[90%]">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="w-full text-center text-xl font-bold text-white">
              Você está iniciando uma atividade...
            </Text>

            <Separator className="my-4" />

            <View className="gap-y-6">
              <View className="flex-row">
                <Text className="mr-2 font-bold text-white">1.</Text>
                <Text className="flex-1 text-base text-white">
                  Para realizar esta atividade avaliativa você deve responder a{" "}
                  <Text className="font-bold text-brand-primary-9">
                    10 questões objetivas
                  </Text>{" "}
                  sorteadas aleatoriamente pelo sistema
                </Text>
              </View>

              <View className="flex-row">
                <Text className="mr-2 font-bold text-white">2.</Text>
                <Text className="flex-1 text-base text-white">
                  Antes de iniciar, certifique-se de ter acesso a uma{" "}
                  <Text className="font-bold text-brand-primary-9">
                    conexão de internet estável
                  </Text>
                  . Caso você{" "}
                  <Text className="font-bold text-brand-primary-9">
                    perca o acesso
                  </Text>{" "}
                  ou{" "}
                  <Text className="font-bold text-brand-primary-9">
                    finalize a sessão
                  </Text>{" "}
                  a atividade será reiniciada e você perderá todo o progresso
                </Text>
              </View>

              <View className="flex-row">
                <Text className="mr-2 font-bold text-white">3.</Text>
                <Text className="flex-1 text-base text-white">
                  Após a conclusão, o sistema deverá corrigir e exibir o{" "}
                  <Text className="font-bold text-brand-primary-9">
                    gabarito com as respostas
                  </Text>
                </Text>
              </View>

              <View className="flex-row">
                <Text className="mr-2 font-bold text-white">4.</Text>
                <Text className="flex-1 text-base text-white">
                  Caso{" "}
                  <Text className="font-bold text-brand-primary-9">
                    reprove
                  </Text>
                  , você poderá realizar atividade novamente até{" "}
                  <Text className="font-bold text-brand-primary-9">
                    3 vezes gratuitamente.
                  </Text>
                </Text>
              </View>
            </View>

            <View className="mt-8 gap-3">
              <Button
                className="h-14 w-full flex-row items-center justify-center bg-brand-primary-9"
                onPress={handleStartActivity}
                text="Iniciar Atividade Avaliativa"
                // icon={<ChevronRight color="white" size={20} />}
              />

              <Button
                variant="outline"
                className="h-14 w-full border-slate-300"
                onPress={() => onOpenChange(false)}
                text="Voltar"
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmInitProfessionalExamDialog;
