import { View } from "react-native";

const Separator = ({ className = "" }) => {
  return <View className={`h-[1px] w-full bg-gray-200 my-4 ${className}`} />;
};

export default Separator;
