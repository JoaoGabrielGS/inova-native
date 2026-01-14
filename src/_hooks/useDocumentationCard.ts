import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "../constants/queries";
import { userStatus } from "../services/documents/userStatus";

const getUserDocumentsStatus = async (courseId: number) => {
  const response = userStatus(courseId);
  return response;
};

export const useDocumentationCard = (courseId: number) => {
  const { data: userStatus, isLoading } = useQuery({
    queryKey: [QUERIES.DOCUMENT.USER_STATUS, courseId],
    queryFn: () => getUserDocumentsStatus(Number(courseId)),
    enabled: !!courseId,
  });

  return {
    states: { userStatus, isLoading },
  };
};
