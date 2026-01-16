import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useNavigation } from "@react-navigation/native";
import { agreementTermService } from "@/src/services/agreement-term";
import { MUTATION } from "@/src/constants/mutations";
import { QUERIES } from "@/src/constants/queries";
import { useRouter } from "expo-router";
import { isErrorAtom } from "../dialogs/error-dialog";

interface Props {
  courseId: number;
  terms: any;
  isOpen: boolean;
  isLoading: boolean;
}

const TermsAndContractsRequestDialog = ({
  courseId,
  terms,
  isOpen,
  isLoading,
}: Props) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [, setIsError] = useAtom(isErrorAtom);
  const [hasAddressed, setHasAddressed] = useState(false);
  const queryClient = useQueryClient();

  const router = useRouter();

  const { mutate, isPending: isPendingSign } = useMutation({
    mutationFn: () => agreementTermService.sign(courseId),
    mutationKey: [MUTATION.AGREEMENT_TERM.SIGN],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES.AGREEMENT_TERM.IS_SIGNED],
      });
    },
    onError: () => {
      setIsError({
        isShow: true,
        title: "Erro ao aceitar os termos",
        message:
          "Não foi possível aceitar os termos do contrato, pois é necessário preencher os dados de endereço no seu perfil.",
        delay: 20000,
      });
      setHasAddressed(true);
    },
  });

  useEffect(() => {
    if (isPendingSign) {
      setIsPending(true);
      return;
    }
    if (isLoading) return;
    const timer = setTimeout(() => setIsPending(false), 5000);
    return () => clearTimeout(timer);
  }, [isPendingSign, isLoading]);

  const handleAccept = () => {
    if (isAccepted && !isLoading && !isPending) {
      mutate();
    }
  };

  const getWebViewSource = () => {
    if (terms?.posTerm) {
      return { uri: `data:application/pdf;base64,${terms.posTerm}` };
    }
    return {
      html: `<div style="font-size: 40px; padding: 20px;">${terms?.terms || ""}</div>`,
    };
  };

  return (
    <Modal visible={isOpen} animationType="slide" transparent={true}>
      <View className="flex-1 justify-center items-center bg-black/50 p-4">
        <View className="bg-white w-full max-h-[90%] rounded-2xl p-6 shadow-xl">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="flex-1 text-center font-bold text-lg text-gray-800">
              Termos de Contrato
            </Text>
            {hasAddressed && (
              <TouchableOpacity
                onPress={() => router.navigate("/profile")}
                className="bg-blue-500 px-3 py-2 rounded-lg"
              >
                <Text className="text-white text-xs font-semibold">Perfil</Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="flex-1 min-h-[300px] border border-gray-200 rounded-md overflow-hidden bg-gray-50">
            <WebView
              originWhitelist={["*"]}
              source={getWebViewSource()}
              style={{ flex: 1, backgroundColor: "transparent" }}
            />
          </View>

          {/* Checkbox Customizado */}
          <TouchableOpacity
            onPress={() => setIsAccepted(!isAccepted)}
            className="flex-row items-center my-4"
            activeOpacity={0.7}
          >
            <View
              className={`w-6 h-6 border-2 rounded mr-3 items-center justify-center ${isAccepted ? "bg-blue-600 border-blue-600" : "border-gray-400"}`}
            >
              {isAccepted && <Text className="text-white font-bold">✓</Text>}
            </View>
            <Text className="text-base text-gray-700">
              Li e aceito os termos do contrato
            </Text>
          </TouchableOpacity>

          {/* Botão de Ação */}
          <TouchableOpacity
            disabled={!isAccepted || isLoading || isPending}
            onPress={handleAccept}
            className={`w-full py-4 rounded-xl items-center ${
              !isAccepted || isLoading || isPending
                ? "bg-gray-400"
                : "bg-blue-600"
            }`}
          >
            {isPendingSign ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text className="text-white text-lg font-bold">
                Visualizar Curso
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TermsAndContractsRequestDialog;
