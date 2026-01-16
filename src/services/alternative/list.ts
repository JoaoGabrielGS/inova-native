import { api } from "@/src/lib/api-manager";

export interface AlternativeListRequest {
  questionId: number;
  viewType: "STUDENT" | "INSTRUCTOR" | "ADMIN" | "TUTOR";
}
export const list = async ({
  questionId,
  viewType = "STUDENT",
}: AlternativeListRequest) => {
  const baseURL = `/questions/${questionId}/alternatives`;
  const queryParams: URLSearchParams = new URLSearchParams();

  queryParams.append("view-type", viewType);

  const url = `${baseURL}?${queryParams.toString()}`;
  const response = await api.get(url);
  return response;
};
