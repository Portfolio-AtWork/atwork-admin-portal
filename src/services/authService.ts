import { LoginRequest, LoginResponse } from "@/types/auth";
import { buildApiUrl } from "@/config/api";

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch(buildApiUrl("login/auth"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Falha na autenticação");
  }

  return response.json();
};