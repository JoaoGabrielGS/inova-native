import { api } from "@/src/lib/api-manager";

export interface GetProfileResponse {
  id: number;
  name: string;
  email: string;
  cpf: string;
  bio: string;
  ra: string;
  phone: string;
  avatarUrl: string;
  emailConfirmedAt: string;
  externalCustomerId: string;
  commission: number;
  address: {
    id: number;
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
  };
  permissions: [
    {
      id: number;
      description: string;
    },
  ];
  rg: string;
  createdAt: string;
  updatedAt: string;
  bankAccountInformation: {
    id: number;
    bankName: string;
    bankCode: number;
    agency: number;
    account: string;
    accountType: {
      id: number;
      name: string;
    };
  };
  pixInformation: {
    id: number;
    pixKey: string;
    keyType: {
      id: number;
      name: string;
    };
  };
  rgIssuer: string;
  race: {
    id: number;
    name: string;
  };
  gender: {
    id: number;
    name: string;
  };
  hasDisabilities: true;
}

export async function getProfile() {
  const response = await api.get(`/users/profile`);
  return response.data as GetProfileResponse;
}
