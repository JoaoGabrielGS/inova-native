import { api } from "@/src/lib/api-manager";

export interface CertificateApprovalDTO {
  canGenerate: boolean;
  hasCertificate: boolean;
  certificateUrl: string | null;
  hasSolicited: boolean | null;
  disapprovalReason: string | null;
  certificateReleaseDate: string;
}

export const canGenerate = async (
  courseId: number,
): Promise<CertificateApprovalDTO> => {
  const response = await api.get(`/certificates/can-generate/${courseId}`);
  return response.data;
};
