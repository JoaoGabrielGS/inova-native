import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Info } from "lucide-react-native"; // Substituindo AiOutlineExclamationCircle
import { ProgressStudentBar } from "../ui/progress-student";

// Assumindo que Col e Row foram convertidos para View com flexbox
const StudentProgress = ({ progress }: { progress: number }) => {
  const displayProgress =
    progress != null && !isNaN(progress) ? Math.min(progress, 100) : 0;
  const progressText = `${displayProgress.toFixed(2)}% das aulas concluídas`;

  const showInfo = () => {
    Alert.alert(
      "Evolução no Curso",
      "Não esqueça de concluir as aulas assistidas para progredir na evolução do curso",
    );
  };

  return (
    <View className="w-full">
      {/* Container Row - No mobile geralmente é melhor empilhar (flex-col) */}
      <View className="w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
        <ProgressStudentBar
          value={displayProgress}
          className="w-full sm:w-48"
        />

        <View className="flex-row items-center gap-1">
          <Text className="italic text-green-500 text-sm">{progressText}</Text>

          <TouchableOpacity onPress={showInfo} activeOpacity={0.7}>
            <Info size={20} color="#10b981" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StudentProgress;
