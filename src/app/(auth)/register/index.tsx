import { Button } from "@/src/components/ui/button";
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
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (value: any) => {
    const cleaned = value.replace(/\D/g, "");

    const limited = cleaned.slice(0, 11);
    let masked = limited;
    if (limited.length > 2) {
      masked = `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    }
    if (limited.length > 7) {
      masked = `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
    }
    setPhone(masked);
  };

  return (
    <View className="w-full bg-brand-grey-10 h-full flex-1 items-center pt-40">
      <View>
        <Text className="font-bold text-brand-primary-10 text-4xl">
          Bem-Vindo(a) ao {"\n"} Inova Carreira
        </Text>
      </View>
      <Text className="text-white pt-20">
        Preencha o formulário com seus dados cadastrais
      </Text>
      <View className="w-10/12 mt-5">
        <View className="flex-row items-center border border-white rounded-md px-3 h-14">
          <View className="rounded-full border border-white w-8 h-8 items-center justify-center">
            <User color="#FFFFFF" size={16} />
          </View>
          <TextInput
            className="flex-1 ml-3 text-white h-full"
            placeholder="Nome"
            placeholderTextColor="#FFFFFF"
          />
        </View>
      </View>
      <View className="w-10/12 mt-5">
        <View className="flex-row items-center border border-white rounded-md px-3 h-14">
          <View className="rounded-full border border-white w-8 h-8 items-center justify-center">
            <Mail color="#FFFFFF" size={16} />
          </View>
          <TextInput
            className="flex-1 ml-3 text-white h-full"
            placeholder="E-mail"
            placeholderTextColor="#FFFFFF"
          />
        </View>
      </View>
      <View className="w-10/12 mt-5">
        <View className="flex-row items-center border border-white rounded-md px-3 h-14">
          <View className="rounded-full border border-white w-8 h-8 items-center justify-center">
            <Phone color="#FFFFFF" size={16} />
          </View>
          <TextInput
            className="flex-1 ml-3 text-white h-full"
            placeholder="Telefone"
            placeholderTextColor="#FFFFFF"
            keyboardType="numeric" // Abre o teclado numérico
            value={phone}
            onChangeText={handlePhoneChange}
          />
        </View>
      </View>
      <View className="w-10/12 mt-5">
        <View className="flex-row items-center border border-white rounded-md px-3 h-14">
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
      </View>
      <View className="w-10/12 mt-5">
        <View className="flex-row items-center border border-white rounded-md px-3 h-14">
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
      <View className="w-10/12 mt-5">
        <TouchableOpacity className="flex-row items-center justify-center bg-brand-primary-10 rounded-md h-14">
          <Text className="text-white font-bold text-lg mr-2">
            Salvar e Entrar
          </Text>
          <ArrowRight color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>
      <View className="items-center mt-5 w-10/12">
        <Text className="text-white mb-5">Ou entre com:</Text>
        <View className="flex-row justify-between w-full">
          <TouchableOpacity className="bg-transparent border border-white rounded-md w-[30%] h-14 items-center justify-center">
            <Text className="text-white text-4xl font-bold">G</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-transparent border border-white rounded-md w-[30%] h-14 items-center justify-center">
            <Facebook color="#FFFFFF" size={28} fill="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-transparent border border-white rounded-md w-[30%] h-14 items-center justify-center"
            onPress={() => {
              router.navigate("/(onboard)/profile");
            }}
          >
            <Apple color="#FFFFFF" size={28} fill="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-10">
        <Text
          onPress={() => router.navigate("/login")}
          className="text-brand-primary-9"
        >
          Voltar para Login
        </Text>
      </View>
    </View>
  );
};

export default RegisterScreen;
