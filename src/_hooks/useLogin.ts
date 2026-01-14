import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "@/src/lib/api-manager";
import { loginSchema, LoginType } from "@/src/lib/zod/login";
import { loginMoodleUser } from "@/src/services/register/moodle/registerMoodle";

export const useLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginType) => {
    setIsLoading(true);

    try {
      const identifierAsNumber = Number(data.identifier);
      const isRa = !isNaN(identifierAsNumber) && data.identifier.trim() !== "";
      if (isRa) {
        const moodleResult = await loginMoodleUser(
          data.identifier,
          data.password,
        );
        if (moodleResult !== "Login Moodle bem-sucedido.") {
          throw new Error(moodleResult || "Erro na validação do Moodle");
        }
      }

      const loginPayload = isRa
        ? { ra: data.identifier, password: data.password }
        : { email: data.identifier, password: data.password };

      const response = await api.post(
        `${process.env.EXPO_PUBLIC_API_URL_JAVA}auth/login`,
        loginPayload,
      );

      if (response.data?.accessToken) {
        await AsyncStorage.setItem(
          "@inova:accessToken",
          response.data.accessToken,
        );

        if (response.data.refreshToken) {
          await AsyncStorage.setItem(
            "@inova:refreshToken",
            response.data.refreshToken,
          );
        }

        router.replace("/home");
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Falha ao realizar login";

      Alert.alert("Erro de Acesso", message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    control,
    errors,
    isLoading,
    handleSubmit: hookFormSubmit(onSubmit),
  };
};
