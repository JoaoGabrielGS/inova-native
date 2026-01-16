import React, { useEffect, useRef } from "react";
import { Modal, View, Text, TouchableOpacity, Animated } from "react-native";
import { atom, useAtom } from "jotai";
import { AlertTriangle } from "lucide-react-native";

export const isErrorAtom = atom<{
  isShow: boolean;
  title: string;
  message: string;
  delay?: number;
  autoclose?: boolean;
}>({
  isShow: false,
  title: "",
  message: "",
  delay: 2000,
});

const ErrorDialog = () => {
  const [isError, setError] = useAtom(isErrorAtom);
  const progressAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (isError.isShow && isError.autoclose) {
      const delay = isError?.delay ?? 2000;

      progressAnim.setValue(100);
      Animated.timing(progressAnim, {
        toValue: 0,
        duration: delay,
        useNativeDriver: false,
      }).start();

      const timeout = setTimeout(() => {
        handleClose();
      }, delay);

      return () => {
        clearTimeout(timeout);
        progressAnim.stopAnimation();
      };
    }
  }, [isError.isShow]);

  const handleClose = () => {
    setError({ ...isError, isShow: false });
  };

  if (!isError.isShow) return null;

  return (
    <Modal
      transparent
      visible={isError.isShow}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View className="flex-1 justify-center items-center bg-black/60 px-6">
        <View className="bg-white w-full rounded-3xl p-6 items-center shadow-2xl overflow-hidden">
          <AlertTriangle size={48} color="#EF4444" />

          <Text className="text-xl font-bold text-red-600 mt-4 text-center">
            {isError.title}
          </Text>

          <Text className="text-base text-gray-600 mt-2 text-center leading-6">
            {isError.message}
          </Text>

          <TouchableOpacity
            onPress={handleClose}
            className="mt-6 bg-gray-100 px-8 py-3 rounded-full"
          >
            <Text className="text-gray-800 font-semibold">Fechar</Text>
          </TouchableOpacity>

          {isError.autoclose && (
            <View className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-100">
              <Animated.View
                style={{
                  height: "100%",
                  backgroundColor: "#EF4444",
                  width: progressAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ["0%", "100%"],
                  }),
                }}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ErrorDialog;
