import { useRouter } from "expo-router";
import {
  Apple,
  ArrowRight,
  Eye,
  EyeOff,
  Facebook,
  LockKeyhole,
  Mail,
  Phone,
  User,
} from "lucide-react-native";
import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const limited = cleaned.slice(0, 11);
    let masked = limited;
    if (limited.length > 2)
      masked = `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    if (limited.length > 7)
      masked = `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
    setPhone(masked);
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-grey-10">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-10/12">
            <Text className="font-bold text-brand-primary-10 text-4xl">
              Bem-Vindo(a) ao {"\n"}Inova Carreira
            </Text>
            <Text className="text-white mt-4">
              Preencha o formulário com seus dados cadastrais
            </Text>
          </View>
          <View className="w-10/12 mt-8 space-y-4">
            <View className="flex-row items-center border border-white rounded-md px-3 h-14 mb-5">
              <View className="rounded-full border border-white w-8 h-8 items-center justify-center">
                <User color="#FFFFFF" size={16} />
              </View>
              <TextInput
                className="flex-1 ml-3 text-white h-full"
                placeholder="Nome"
                placeholderTextColor="#FFFFFF"
              />
            </View>
            <View className="flex-row items-center border border-white rounded-md px-3 h-14 mb-5">
              <View className="rounded-full border border-white w-8 h-8 items-center justify-center">
                <Mail color="#FFFFFF" size={16} />
              </View>
              <TextInput
                className="flex-1 ml-3 text-white h-full"
                placeholder="E-mail"
                placeholderTextColor="#FFFFFF"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View className="flex-row items-center border border-white rounded-md px-3 h-14 mb-5">
              <View className="rounded-full border border-white w-8 h-8 items-center justify-center">
                <Phone color="#FFFFFF" size={16} />
              </View>
              <TextInput
                className="flex-1 ml-3 text-white h-full"
                placeholder="Telefone"
                placeholderTextColor="#FFFFFF"
                keyboardType="numeric"
                value={phone}
                onChangeText={handlePhoneChange}
              />
            </View>
            <View className="flex-row items-center border border-white rounded-md px-3 h-14 mb-5">
              <View className="rounded-full border border-white w-8 h-8 items-center justify-center">
                <LockKeyhole color="#FFFFFF" size={16} />
              </View>
              <TextInput
                className="flex-1 ml-3 text-white h-full"
                placeholder="Senha"
                placeholderTextColor="#FFFFFF"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff color="#FFFFFF" size={20} />
                ) : (
                  <Eye color="#FFFFFF" size={20} />
                )}
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center border border-white rounded-md px-3 h-14 mb-5">
              <View className="rounded-full border border-white w-8 h-8 items-center justify-center">
                <LockKeyhole color="#FFFFFF" size={16} />
              </View>
              <TextInput
                className="flex-1 ml-3 text-white h-full"
                placeholder="Confirma senha"
                placeholderTextColor="#FFFFFF"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff color="#FFFFFF" size={20} />
                ) : (
                  <Eye color="#FFFFFF" size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity className="flex-row items-center justify-center bg-brand-primary-10 rounded-md h-14 w-10/12 mt-2">
            <Text className="text-white font-bold text-lg mr-2">
              Salvar e Entrar
            </Text>
            <ArrowRight color="#FFFFFF" size={20} />
          </TouchableOpacity>
          <View className="items-center mt-8 w-10/12">
            <Text className="text-white mb-5">Ou entre com:</Text>
            <View className="flex-row justify-between w-full">
              <TouchableOpacity className="border border-white rounded-md w-[30%] h-14 items-center justify-center">
                <Text className="text-white text-3xl font-bold">G</Text>
              </TouchableOpacity>
              <TouchableOpacity className="border border-white rounded-md w-[30%] h-14 items-center justify-center">
                <Facebook color="#FFFFFF" size={28} fill="white" />
              </TouchableOpacity>
              <TouchableOpacity className="border border-white rounded-md w-[30%] h-14 items-center justify-center">
                <Apple color="#FFFFFF" size={28} fill="white" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => router.navigate("/login")}
            className="mt-8 mb-5"
          >
            <Text className="text-brand-primary-9">Voltar para Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
