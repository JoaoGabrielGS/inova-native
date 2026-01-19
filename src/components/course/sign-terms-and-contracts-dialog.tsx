import { MUTATION } from "@/src/constants/mutations";
import { QUERIES } from "@/src/constants/queries";
import { agreementTermService } from "@/src/services/agreement-term";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { FontAwesome6 } from "@expo/vector-icons"; // Adicionado para ícones consistentes
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
      html: `<body style="background-color: #f8fafc; padding: 20px; font-family: sans-serif; font-size: 32px; color: #1e293b;">${terms?.terms || ""}</body>`,
    };
  };

  return (
    <Modal visible={isOpen} animationType="slide" transparent={true}>
      <View className="flex-1 bg-black/70 justify-end">
        <View className="bg-brand-grey-10 h-[92%] rounded-t-3xl p-6 shadow-2xl">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-white">
              Contrato de Termos
            </Text>
            {hasAddressed && (
              <TouchableOpacity
                onPress={() => router.navigate("/profile")}
                className="bg-brand-primary-9 px-4 py-2 rounded-lg"
              >
                <Text className="text-white text-xs font-bold uppercase">
                  Ir para Perfil
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="flex-1 border border-white/10 rounded-2xl overflow-hidden bg-white mb-6">
            <WebView
              originWhitelist={["*"]}
              source={getWebViewSource()}
              startInLoadingState={true}
              renderLoading={() => (
                <View className="absolute inset-0 items-center justify-center bg-white">
                  <ActivityIndicator size="large" color="#000" />
                </View>
              )}
            />
          </View>

          <TouchableOpacity
            onPress={() => setIsAccepted(!isAccepted)}
            className="flex-row items-center mb-6"
            activeOpacity={0.8}
          >
            <View
              className={`w-7 h-7 border-2 rounded-md mr-3 items-center justify-center ${
                isAccepted
                  ? "bg-brand-primary-9 border-brand-primary-9"
                  : "border-slate-500"
              }`}
            >
              {isAccepted && (
                <FontAwesome6 name="check" size={14} color="white" />
              )}
            </View>
            <Text className="flex-1 text-slate-200 text-sm leading-5">
              Li e concordo com todos os termos e condições do contrato de
              prestação de serviços.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!isAccepted || isLoading || isPending}
            onPress={handleAccept}
            className={`w-full py-4 rounded-xl items-center justify-center ${
              !isAccepted || isLoading || isPending
                ? "bg-slate-700 opacity-50"
                : "bg-brand-primary-9"
            }`}
          >
            {isPendingSign ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text className="text-white text-base font-bold uppercase tracking-wider">
                Confirmar e Continuar
              </Text>
            )}
          </TouchableOpacity>

          <View className="h-4" />
        </View>
      </View>
    </Modal>
  );
};

export default TermsAndContractsRequestDialog;
