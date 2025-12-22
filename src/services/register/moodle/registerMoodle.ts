import { api } from "@/src/lib/api-manager";
import { AxiosError } from "axios";

export function handleApiError(error: unknown) {
  if (error instanceof AxiosError) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          return "Usuário não encontrado ou credenciais inválidas. Tente novamente.";
        case 409:
          return "Usuário Moodle já cadastrado. Tente entrar com seu email e senha do Moodle no login padrão";
        case 500:
          return "Erro do servidor. Tente novamente mais tarde.";
        case 502:
          return "Usuário não encontrado ou credenciais inválidas. Tente novamente.";
        default:
          return "Erro desconhecido.";
      }
    } else if (error.code === "ECONNREFUSED") {
      return "Erro do servidor. Tente novamente mais tarde.";
    }
  } else {
    return "Erro desconhecido.";
  }
}

export async function loginMoodleUser(
  ra: string,
  password: string,
): Promise<string> {
  try {
    const response = await api.post("/auth/moodle-login", {
      ra,
      password,
    });
    if (response.status === 201) {
      return "Login Moodle bem-sucedido.";
    } else {
      return "Erro desconhecido.";
    }
  } catch (error: unknown) {
    return handleApiError(error) ?? "Erro desconhecido.";
  }
}
