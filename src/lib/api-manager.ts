import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const router = useRouter();
const BASE_URL = process.env.EXPO_PUBLIC_API_URL_JAVA;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 1000000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("@inova:accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const refreshToken = async () => {
  const currentRefreshToken = await AsyncStorage.getItem("@inova:refreshToken");
  if (!currentRefreshToken) return null;

  const refreshApi = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
  });

  try {
    const response = await refreshApi.post("/auth/refresh-token", {
      refreshToken: currentRefreshToken,
    });

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

      return response.data.accessToken;
    }
  } catch (error) {
    console.error("Falha ao renovar token:", error);
  }

  return null;
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      const newAccessToken = await refreshToken();

      if (newAccessToken) {
        originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalConfig);
      }

      await AsyncStorage.multiRemove([
        "@inova:accessToken",
        "@inova:refreshToken",
      ]);

      router.navigate("/(auth)/login");
    }

    return Promise.reject(error);
  },
);
