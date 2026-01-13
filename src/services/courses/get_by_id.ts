import { api } from "@/src/lib/api-manager";

export interface GetCourseDetailsCourseResponse {
  id?: number;
  title?: string;
  category?: {
    id?: number;
    name?: string;
  };
  type?: {
    id?: number;
    name?: string;
  };
  description?: string;
  bannerUrl?: string;
  workload?: number;
  modules?: [
    {
      id?: number;
      name?: string;
      disciplines?: [
        {
          id?: number;
          name?: string;
          lessons?: [
            {
              id?: number;
              title?: string;
              url?: string;
            },
          ];
        },
      ];
    },
  ];
}

export interface GetCourseDetailsInstructorResponse {
  id?: number;
  name?: string;
  bio?: string;
  avatarUrl?: string;
}

export interface GetCourseDetailsEnrollmentResponse {
  id?: number;
  progress?: number;
  since?: Date | string;
  feedback?: {
    score?: number;
    comment?: string;
  };
}

export interface GetCourseDetailsOrderResponse {
  paymentMethod?: string;
  paidPrice?: number;
}

export interface ListCourseDetailsByIdReponse {
  course?: GetCourseDetailsCourseResponse;
  instructor?: GetCourseDetailsInstructorResponse;
  enrollment?: GetCourseDetailsEnrollmentResponse;
  order?: GetCourseDetailsOrderResponse;
}

export const getCoursesDetailsById = async (
  id: number,
): Promise<ListCourseDetailsByIdReponse> => {
  const baseURL = `/course-details/${id}`;
  const response = await api.get<ListCourseDetailsByIdReponse>(baseURL);
  return response.data;
};
