import { api } from "@/src/lib/api-manager";

export interface AgreementUserTermsResponseDTO {
  id: number;
  hash: string;
  userIp: string;
  isSigned: boolean;
  agreementTerm: {
    id: number;
    version: number;
    terms: string;
  };
  documentUrl: string;
}

export const userTerms = async (
  enrollmentId: number,
): Promise<{ userAgreementTerms: AgreementUserTermsResponseDTO }> => {
  const response = await api.get(`/agreement-terms/user-terms/${enrollmentId}`);
  return response.data;
};
