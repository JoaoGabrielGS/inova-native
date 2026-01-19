import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CheckCircle2, PlaySquare } from "lucide-react-native"; // PlaySquare substitui FaYoutube
import { cn } from "@/src/lib/utils";

interface ClassGridProps {
  children: React.ReactNode;
  className?: string;
}

const ClassGrid = ({ children, className }: ClassGridProps) => {
  return (
    <View className={cn("flex-col gap-2 mt-2 w-[96%]", className)}>
      {children}
    </View>
  );
};

interface ClassItemProps {
  completed?: boolean;
  actived?: boolean;
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

const ClassItem = ({
  completed = false,
  actived = false,
  className,
  children,
  onPress,
  ...props
}: ClassItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={cn(
        "w-full p-3 rounded-lg flex-row items-center justify-between",
        actived ? "bg-zinc-800" : "bg-transparent",
        className,
      )}
      {...props}
    >
      <View className="flex-row items-center flex-1 mr-2">
        <CheckCircle2 size={18} color={completed ? "#10b981" : "#3f3f46"} />

        <Text
          numberOfLines={1}
          className={cn(
            "ml-3 text-sm flex-1",
            actived ? "text-gray-400 font-bold" : "text-white",
          )}
        >
          {children}
        </Text>
      </View>

      <View className="w-7 items-end">
        <PlaySquare size={18} color={actived ? "#71717a" : "white"} />
      </View>
    </TouchableOpacity>
  );
};

export { ClassGrid, ClassItem };
