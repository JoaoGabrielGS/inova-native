import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import google from "@/assets/icons/google.png";
import { useLogin } from "@/src/_hooks/useLogin";
import { Button } from "@/src/components/ui/button";
import woman from "@/assets/images/woman.png";
import { useRouter, useSegments } from "expo-router";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function LoginScreen() {
  const { control, handleSubmit, errors, isLoading } = useLogin();
  const router = useRouter();
  const segments = useSegments();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;

    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("@inova:accessToken");
      if (token) {
        router.replace("/(onboard)/home");
      }
    };

    checkAuth();
  }, [segments]);

  return (
    <View className="flex-1 bg-brand-grey-10 items-center justify-center">
      <View className="w-full flex-1 items-center justify-center">
        <Image source={woman} resizeMode="cover" className="mt-10" />

        <View className="pb-10 px-4 w-96">
          <Text className="text-center font-bold text-3xl text-brand-primary-10 mb-4">
            Já sou usuário Inova
          </Text>

          <View className="flex gap-4">
            <View>
              <Controller
                control={control}
                name="identifier"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className={`border w-full h-14 px-4 py-2 rounded-lg ${errors.identifier ? "border-red-500" : "border-white"}`}
                    placeholder="e-mail ou RA"
                    placeholderTextColor="#FFFFFF"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.identifier && (
                <Text className="text-red-500 text-sm">
                  {errors.identifier.message}
                </Text>
              )}
            </View>

            <View>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className={`border w-full h-14 px-4 py-2 rounded-lg ${errors.password ? "border-red-500" : "border-white"}`}
                    placeholder="senha"
                    placeholderTextColor="#FFFFFF"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                    secureTextEntry
                  />
                )}
              />
              {errors.password && (
                <Text className="text-red-500 text-sm">
                  {errors.password.message}
                </Text>
              )}
            </View>
          </View>

          <Text className="underline text-brand-primary-8 text-center mt-4 mb-6">
            Esqueceu sua senha? Recupere aqui
          </Text>

          <Button
            onPress={handleSubmit}
            text={isLoading ? "Carregando..." : "Entrar"}
            variant="primary"
            disabled={isLoading}
          />

          <View className="w-full border-[0.5px] border-white my-8" />
          <Button icon={google} text="Entrar com Google" variant="social" />

          <Text className="text-center mt-6 text-white">
            Não tem conta?
            <Text
              className="underline text-brand-primary-8"
              onPress={() => router.navigate("/(auth)/register")}
            >
              {" "}
              Cadastre-se
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: { color: "white" },
});
