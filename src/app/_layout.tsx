import { Stack } from 'expo-router'
import '../../global.css'

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)/login/index" />
      <Stack.Screen name="(onboard)" />
    </Stack>
  )
}
