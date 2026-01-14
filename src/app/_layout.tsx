import { Stack } from "expo-router";
import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from "react-native-toast-message";

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      className="border-l-4 border-green-500 bg-white dark:bg-zinc-900"
      contentContainerClassName="px-4"
      text1ClassName="text-green-600 font-bold text-sm"
      text2ClassName="text-zinc-500 text-xs"
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      className="border-l-4 border-red-500 bg-white dark:bg-zinc-900"
      contentContainerClassName="px-4"
      text1ClassName="text-red-600 font-bold text-sm"
      text2ClassName="text-zinc-500 text-xs"
    />
  ),
  info: (props: any) => (
    <InfoToast
      {...props}
      className="border-l-4 border-orange-500 bg-white dark:bg-zinc-900"
      contentContainerClassName="px-4"
      text1ClassName="text-orange-500 font-bold text-sm"
      text2ClassName="text-zinc-500 text-xs"
    />
  ),
};

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/login/index" />
        <Stack.Screen name="(onboard)" />
      </Stack>

      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}
