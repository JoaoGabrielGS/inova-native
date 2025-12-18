import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import google from "@/assets/icons/google.png";
import { useLogin } from "@/src/app/(auth)/login/useLogin";
import { Button } from "@/src/components/ui/button";
import woman from "@/assets/images/woman.png";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const { actions } = useLogin();
  const router = useRouter();

  return (
    <View className="flex-1 bg-brand-grey-10 items-center justify-center">
      <View className="w-full flex-1 items-center justify-center">
        <Image source={woman} resizeMode="cover" className="mt-10" />
        <View className="pb-10 px-4 w-96">
          <View className="flex gap-2 mb-4">
            <Text className="text-center font-bold text-3xl text-brand-primary-10">
              Já sou usuário Inova
            </Text>
          </View>

          <View className="flex justify-between gap-4">
            <TextInput
              className="border border-white w-full h-14 px-4 py-2 rounded-lg"
              placeholder="e-mail"
              placeholderTextColor="#FFFFFF"
              style={styles.input}
            />
            <TextInput
              className="border border-white w-full h-14 px-4 py-2 rounded-lg"
              placeholder="senha"
              placeholderTextColor="#FFFFFF"
              style={styles.input}
            />
          </View>

          <Text className="underline text-brand-primary-8 text-center text-brand-secondary-2 mt-4 mb-6">
            Esqueceu sua senha? Recupere aqui
          </Text>

          <Button
            onPress={actions.handleGoToHome}
            text="Entrar"
            variant="primary"
          />
          <View className="w-full border-[0.5px] border-white my-8" />
          <Button icon={google} text="Entrar com Google" variant="social" />

          <Text className="text-center mt-6 text-white">
            Não tem conta?
            <Text
              className="underline text-brand-primary-8"
              onPress={() => router.navigate("/(auth)/register")}
            >
              {' '}Cadastre-se
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    color: "white",
  },
});
