import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSegments } from "expo-router";
import { useEffect } from "react";
import { Image, ScrollView } from "react-native";
import { Text, View } from "react-native";
import PROFILE_IMAGE from "@/assets/images/profile.png";
import useProfile from "@/src/_hooks/useProfile";

export default function ProfileScreen() {
  const segments = useSegments();
  const { isLoading, profileData } = useProfile();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("@inova:refreshToken");
      console.log(token);
      console.log("2", segments);
    };

    checkAuth();
  }, [segments]);
  return (
    <ScrollView className="flex-1 bg-brand-grey-10 py-20 p-2">
      <View>
        {profileData?.avatarUrl && (
          <Image
            source={{ uri: profileData.avatarUrl }}
            className="w-40 h-40 rounded-full border-2 border-white mx-auto"
          />
        )}

        <Text className="mt-4 text-white font-bold text-2xl text-center">
          {profileData?.name}
        </Text>

        <View className="mt-4">
          <Text className="uppercase font-bold text-brand-grey-5">
            Dados pessoais
          </Text>
        </View>

        <View className="my-4 ">
          <Text className="text-left mb-2 text-white ">Nome Completo</Text>
          <View className="bg-brand-grey-8 w-full p-4 rounded-md">
            <Text className="text-white ">{profileData?.name}</Text>
          </View>
        </View>

        <View className="my-4 ">
          <Text className="text-left mb-2 text-white ">E-mail</Text>
          <View className="bg-brand-grey-8 w-full p-4 rounded-md">
            <Text className="text-white ">{profileData?.email}</Text>
          </View>
        </View>

        <View className="my-4 ">
          <Text className="text-left mb-2 text-white ">Telefone</Text>
          <View className="bg-brand-grey-8 w-full p-4 rounded-md">
            <Text className="text-white ">{profileData?.phone}</Text>
          </View>
        </View>

        <View className="my-4 ">
          <Text className="text-left mb-2 text-white ">CEP</Text>
          <View className="bg-brand-grey-8 w-full p-4 rounded-md">
            <Text className="text-white ">{profileData?.address.cep}</Text>
          </View>
        </View>

        <View className="my-4 ">
          <Text className="text-left mb-2 text-white ">RG</Text>
          <View className="bg-brand-grey-8 w-full p-4 rounded-md">
            <Text className="text-white ">{profileData?.rg}</Text>
          </View>
        </View>

        <View className="my-4 ">
          <Text className="text-left mb-2 text-white ">Orgão Emissor</Text>
          <View className="bg-brand-grey-8 w-full p-4 rounded-md">
            <Text className="text-white ">{profileData?.rgIssuer}</Text>
          </View>
        </View>

        <View className="my-4 ">
          <Text className="text-left mb-2 text-white ">Gênero</Text>
          <View className="bg-brand-grey-8 w-full p-4 rounded-md">
            <Text className="text-white ">{profileData?.gender.name}</Text>
          </View>
        </View>

        <View className="my-4 ">
          <Text className="text-left mb-2 text-white ">Raça</Text>
          <View className="bg-brand-grey-8 w-full p-4 rounded-md">
            <Text className="text-white ">{profileData?.race.name}</Text>
          </View>
        </View>

        <View className="my-4 ">
          <Text className="text-left mb-2 text-white ">PCD</Text>
          <View className="bg-brand-grey-8 w-full p-4 rounded-md">
            <Text className="text-white ">{profileData?.hasDisabilities}</Text>
          </View>
        </View>

        <View className="mt-4">
          <Text className="uppercase font-bold text-brand-grey-5">
            Dados de Endereço
          </Text>
        </View>

        <View className="my-4 ">
          <Text className="text-left mb-2 text-white ">CEP</Text>
          <View className="bg-brand-grey-8 w-full p-4 rounded-md">
            <Text className="text-white ">{profileData?.address.cep}</Text>
          </View>
        </View>

        <View className="my-4 ">
          <Text className="text-left mb-2 text-white ">Endereço</Text>
          <View className="bg-brand-grey-8 w-full p-4 rounded-md">
            <Text className="text-white ">{profileData?.address.street}</Text>
          </View>
        </View>

        <View className="my-4 ">
          <Text className="text-left mb-2 text-white ">Número</Text>
          <View className="bg-brand-grey-8 w-full p-4 rounded-md">
            <Text className="text-white ">{profileData?.address.number}</Text>
          </View>
        </View>

        <View className="my-4 ">
          <Text className="text-left mb-2 text-white ">Bairro</Text>
          <View className="bg-brand-grey-8 w-full p-4 rounded-md">
            <Text className="text-white ">
              {profileData?.address.neighborhood}
            </Text>
          </View>
        </View>

        <View className="my-4 ">
          <Text className="text-left mb-2 text-white ">Cidade</Text>
          <View className="bg-brand-grey-8 w-full p-4 rounded-md">
            <Text className="text-white ">{profileData?.address.city}</Text>
          </View>
        </View>

        <View className="my-4 ">
          <Text className="text-left mb-2 text-white ">Estado</Text>
          <View className="bg-brand-grey-8 w-full p-4 rounded-md">
            <Text className="text-white ">{profileData?.address.state}</Text>
          </View>
        </View>

        <View className="mb-20 mt-4">
          <Text className="text-left mb-2 text-white ">Complemento</Text>
          <View className="bg-brand-grey-8 w-full p-4 rounded-md">
            <Text className="text-white ">{profileData?.address.state}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
