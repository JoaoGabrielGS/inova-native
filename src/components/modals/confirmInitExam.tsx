import React from "react";
import { Modal, View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Button } from "../ui/button";
import Separator from "../ui/separator";
interface ConfirmInitExamProps {
  enrollmentId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  module?: { id: number } | null;
}

const ConfirmInitExamDialog: React.FC<ConfirmInitExamProps> = ({
  enrollmentId,
  isOpen,
  onOpenChange,
  module,
}) => {
  const router = useRouter();

  // const handleStartActivity = () => {
  //   onOpenChange(false);
  //   router.push({
  //     pathname: "/course/[id]/consumption/[enrollmentId]/prova",
  //     params: { enrollmentId, moduleId: module?.id },
  //   });
  // };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <View className="flex-1 items-center justify-center bg-black/50 px-4">
        <View className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="w-full text-center text-xl font-bold">
              Você está iniciando uma atividade...
            </Text>

            <Separator className="my-4" />

            <View className="gap-y-6">
              <View className="flex-row">
                <Text className="mr-2 font-bold">1.</Text>
                <Text className="flex-1 text-base">
                  Para realizar esta atividade avaliativa você deve responder a{" "}
                  <Text className="font-bold text-brand-primary-9">
                    10 questões objetivas
                  </Text>{" "}
                  sorteadas aleatoriamente pelo sistema
                </Text>
              </View>

              <View className="flex-row">
                <Text className="mr-2 font-bold">2.</Text>
                <Text className="flex-1 text-base">
                  Antes de iniciar, certifique-se de ter acesso a uma{" "}
                  <Text className="font-bold text-brand-primary-9">
                    conexão de internet estável
                  </Text>
                  . Caso você{" "}
                  <Text className="font-bold text-brand-primary-9">
                    {" "}
                    perca o acesso
                  </Text>{" "}
                  ou{" "}
                  <Text className="font-bold text-brand-primary-9">
                    finaliza a sessão
                  </Text>{" "}
                  a atividade será reiniciada e você perderá todo o progresso
                </Text>
              </View>

              <View className="flex-row">
                <Text className="mr-2 font-bold">3.</Text>
                <Text className="flex-1 text-base">
                  Após a conclusão, o sistema deverá corrigir e exibir o{" "}
                  <Text className="font-bold text-brand-primary-9">
                    gabarito com as respostas
                  </Text>
                </Text>
              </View>

              <View className="flex-row">
                <Text className="mr-2 font-bold">4.</Text>
                <Text className="flex-1 text-base">
                  Caso{" "}
                  <Text className="font-bold text-brand-primary-9">
                    reprove
                  </Text>
                  , você poderá realizar a atividade novamente.{" "}
                  <Text className="font-bold">
                    Não há limite de tentativas!
                  </Text>
                </Text>
              </View>
            </View>

            <View className="mt-8 flex-col gap-3">
              <Button
                className="h-14 w-full flex-row items-center justify-center"
                // onPress={handleStartActivity}
                text="Iniciar Atividade Avaliativa"
                icon={<ChevronRight color="white" size={20} />}
              />

              <Button
                variant="outline"
                className="h-14 w-full"
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

export default ConfirmInitExamDialog;
