import { View } from "react-native";

export const Separator = ({ className = "" }: { className?: string }) => (
  <View className={`h-[1px] w-full bg-white/10 ${className}`} />
);
