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

  const {
    states: { user },
  } = useTermsAndContracts();

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className="flex-row items-center justify-center gap-2 rounded-md border border-white bg-transparent px-4 py-3"
      >
        <FontAwesome6 name="file-contract" size={16} color="#FFF" />
        <Text className="text-center text-xs font-bold uppercase text-white">
          Ver Contrato de Prestação de Serviços Educacionais
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsOpen(false)}
      >
        <View className="flex-1 bg-black/60 justify-end">
          <View className="bg-brand-grey-10 h-[90%] rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-white flex-1">
                Termos de Contrato
              </Text>
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                className="p-2"
              >
                <FontAwesome6 name="xmark" size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            <ScrollView
              className="flex-1 flex flex-col"
              showsVerticalScrollIndicator={false}
            >
              {terms?.documentUrl && (
                <View className="h-[420px] w-full rounded-lg overflow-hidden border border-slate-200 mb-4">
                  <WebView
                    source={{
                      uri: `https://docs.google.com/gview?embedded=true&url=${terms.documentUrl}`,
                    }}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                  />
                </View>
              )}

              <View className="gap-y-2 mb-6">
                <Text className="text-base text-white">
                  <Text className="font-bold">Nome:</Text> {user?.name || "---"}
                </Text>
                <Text className="text-base text-white">
                  <Text className="font-bold">CPF:</Text>{" "}
                  {HelpersUtils.formatCpf(user?.cpf ?? "") ?? "---"}
                </Text>
                <Text className="text-base text-white">
                  <Text className="font-bold">IP:</Text>{" "}
                  {terms?.userIp ?? "---"}
                </Text>
                {terms?.hash && (
                  <Text className="text-base text-white mt-2 italic">
                    <Text className="font-bold not-italic">Hash:</Text>{" "}
                    {terms.hash}
                  </Text>
                )}
              </View>
            </ScrollView>

            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              className="mt-4 bg-brand-primary-9 py-4 rounded-xl"
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
