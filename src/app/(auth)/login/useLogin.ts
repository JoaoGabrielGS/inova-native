import { useRouter } from 'expo-router'

export function useLogin() {
  const router = useRouter()

  const handleGoToHome = () => {
    router.navigate('/(onboard)/home')
  }

  return {
    actions: {
      handleGoToHome
    }
  }
}
