import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";
import { FontAwesome6 } from "@expo/vector-icons";
import { AgreementUserTermsResponseDTO } from "@/src/services/agreement-term/user-terms";
import HelpersUtils from "@/src/utils/helpers.utils";
import { useTermsAndContracts } from "@/src/_hooks/useTermsAndContracts";

const TermsAndContractsDialog = ({
  terms,
}: {
  terms: AgreementUserTermsResponseDTO;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Pegando o user do seu hook que usa React Query
  const {
    states: { user },
  } = useTermsAndContracts();

  return (
    <>
      {/* Botão Gatilho (Trigger) */}
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className="flex-row items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-3"
      >
        <FontAwesome6 name="file-contract" size={14} color="#334155" />
        <Text className="text-center text-[10px] font-bold uppercase text-slate-700">
          Ver Contrato de Prestação de Serviços Educacionais
        </Text>
      </TouchableOpacity>

      {/* Modal Nativo */}
      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsOpen(false)}
      >
        <View className="flex-1 bg-black/60 justify-end">
          <View className="bg-white h-[90%] rounded-t-3xl p-6">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-slate-900 flex-1">
                Termos de Contrato
              </Text>
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                className="p-2"
              >
                <FontAwesome6 name="xmark" size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
              {/* Renderização do PDF via WebView */}
              {terms?.documentUrl && (
                <View className="h-96 w-full rounded-lg overflow-hidden border border-slate-200 mb-4">
                  <WebView
                    source={{ uri: terms.documentUrl }}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                  />
                </View>
              )}

              {/* Informações de Assinatura Digital */}
              <View className="bg-slate-50 p-4 rounded-xl gap-y-2 border border-slate-100 mb-6">
                <Text className="text-sm">
                  <Text className="font-bold">Nome:</Text> {user?.name || "---"}
                </Text>
                <Text className="text-sm">
                  <Text className="font-bold">CPF:</Text>{" "}
                  {HelpersUtils.formatCpf(user?.cpf ?? "") ?? "---"}
                </Text>
                <Text className="text-sm">
                  <Text className="font-bold">IP:</Text>{" "}
                  {terms?.userIp ?? "---"}
                </Text>
                {terms?.hash && (
                  <Text className="text-xs text-slate-500 mt-2 italic">
                    <Text className="font-bold not-italic">Hash:</Text>{" "}
                    {terms.hash}
                  </Text>
                )}
              </View>
            </ScrollView>

            {/* Botão Voltar (Footer) */}
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              className="mt-4 bg-slate-900 py-4 rounded-xl"
            >
              <Text className="text-center text-white font-bold text-base">
                Voltar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TermsAndContractsDialog;
