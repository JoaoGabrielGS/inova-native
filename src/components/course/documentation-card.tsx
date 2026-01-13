import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import {
  Bell,
  CheckCircle2,
  Paperclip,
  XCircle,
  ClipboardList,
} from "lucide-react-native";
import { GetCourseDetailsCourseResponse } from "@/src/services/courses/get_by_id";
import { useDocumentationCard } from "@/src/_hooks/useDocumentationCard";

interface DocumentationCardProps {
  course: GetCourseDetailsCourseResponse;
}

const DocumentationCard = ({ course }: DocumentationCardProps) => {
  const {
    states: { userStatus, isLoading },
  } = useDocumentationCard(course.id as number);

  const statusConfig = {
    APROVADO: {
      label: "Documentação aprovada",
      icon: CheckCircle2,
      color: "bg-brand-primary-10",
    },
    REPROVADO: {
      label: "Documentação reprovada",
      icon: XCircle,
      color: "bg-brand-primary-10",
    },
    PENDENTE: {
      label: "Anexar Documentação",
      icon: Paperclip,
      color: "bg-brand-primary-10",
    },
    ANALISE: {
      label: "Documentação em análise",
      icon: ClipboardList,
      color: "bg-brand-primary-10",
    },
  };

  const currentStatus = statusConfig[userStatus as keyof typeof statusConfig];

  if (isLoading) {
    return (
      <View className="w-full p-6 items-center justify-center">
        <ActivityIndicator color="#EF6C00" />
      </View>
    );
  }

  return (
    <View className="w-full rounded-2xl bg-brand-grey-9 p-4 mb-4 shadow-sm">
      <View className="flex-row items-center mb-3">
        <View className="h-10 w-10 rounded-full bg-brand-yellow-8 items-center justify-center mr-3">
          <Bell size={20} strokeWidth={2.5} />
        </View>
        <Text className="flex-1 text-[15px] font-bold text-brand-yellow-8 leading-5">
          É necessário o envio de documentação para emitir certificação deste
          curso!
        </Text>
      </View>

      <View className="mb-5">
        <Text className="text-[13px] text-white leading-5">
          Para emitir certificação em cursos de pós-graduação, é necessário
          enviar alguns documentos que comprovem sua identidade e formação.
        </Text>

        <View className="mt-3">
          <Text className="text-[12px] text-brand-primary-2 font-medium leading-4">
            Somente após a aprovação de toda a documentação enviada, será
            disponibilizada uma opção para solicitação de sua certificação.
          </Text>
        </View>
      </View>

      {currentStatus && (
        <TouchableOpacity
          activeOpacity={0.8}
          className={`w-full h-14 rounded-xl flex-row items-center justify-center px-4 ${currentStatus.color}`}
        >
          <currentStatus.icon
            size={20}
            color="white"
            className="mr-2"
            strokeWidth={2.5}
          />
          <Text className="text-white font-bold text-base ml-2">
            {currentStatus.label}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DocumentationCard;
