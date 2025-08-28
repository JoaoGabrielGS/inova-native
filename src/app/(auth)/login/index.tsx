import { Image, ImageBackground, Text, TextInput, View } from 'react-native'
import google from '@/assets/icons/google.png'
import logo from '@/assets/icons/logo.png'
import image from '@/assets/images/bg.png'
import { useLogin } from '@/src/app/(auth)/login/useLogin'
import { Button } from '@/src/components/ui/button'

export default function LoginScreen() {
  const login = useLogin()

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      className="flex-1 bg-brand-primary-2 items-center justify-center"
    >
      <View className="w-full flex-1 items-center justify-center">
        <Image source={logo} resizeMode="cover" className="mb-10" />
        <View className="bg-white py-10 px-4 w-96 rounded-xl">
          <View className="flex gap-2 mb-4">
            <Text className="text-center font-bold text-lg text-brand-primary-1">
              Acesse sua conta!
            </Text>
            <Text className="text-center text-brand-gray-1">
              Seu app de leitura para criar hábito e muitas conquistas
            </Text>
          </View>

          <View className="flex justify-between gap-4">
            <TextInput
              className="border border-brand-gray-1 w-full h-14 px-4 py-2 rounded-lg"
              placeholder="e-mail"
            />
            <TextInput
              className="border border-brand-gray-1 w-full h-14 px-4 py-2 rounded-lg"
              placeholder="senha"
            />
          </View>

          <Text className="text-center text-brand-secondary-2 my-4">
            Esqueci minha senha
          </Text>

          <Button text="Entrar" variant="primary" />

          <View className="w-full border border-brand-gray-2 my-6" />

          <Button icon={google} text="Entrar com Google" variant="social" />
        </View>
      </View>
    </ImageBackground>
  )
}
