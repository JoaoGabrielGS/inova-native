import useProfile from "@/src/_hooks/useProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";

const useHeader = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);

    try {
      await AsyncStorage.multiRemove([
        "@inova:accessToken",
        "@inova:refreshToken",
      ]);

      router.replace("/login");
    } catch (error) {
      console.error("Erro inesperado durante logout:", error);
      alert("Erro");

      await AsyncStorage.multiRemove([
        "@inova:accessToken",
        "@inova:refreshToken",
      ]);
      router.replace("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logout,
    isLoading,
  };
};

export default useHeader;
