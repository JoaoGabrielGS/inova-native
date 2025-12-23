import { api } from "@/src/lib/api-manager";

export interface Request {
  search?: string;
  category?: string;
  typeCourse?: string;
  duration?: string;
  price?: string;
  page?: number;
  size?: number;
}

export interface PurchasedCoursesResponse {
  id: number;
  title: string;
  slug: string;
  description: string;
  durationInMinutes: number;
  bannerUrl: string;
  price: number;
  rating: number;
  startDate: string;
  endDate: string;
  certificateReleaseDate: string;
  submissionDate: string;
  presentationVideoUrl: string;
  type: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
    slug: string;
  };
  status: {
    id: number;
    name: string;
  };
  instructor: {
    id: number;
    name: string;
    email: string;
    avatarUrl: string;
    bio: string;
  };
  progress: {
    progressPercentage: 0;
  };
  enrollmentId: number;
  createdAt: string;
  updatedAt: string;
}

export const purchased = async (request: Request) => {
  const baseURL = "/courses/purchased";

  const queryParams: URLSearchParams = new URLSearchParams();

  if (request.search && request.search.length >= 1) {
    queryParams.append("title", request.search);
  }

  if (request.category && request.category !== "all") {
    queryParams.append("category.slug", request.category);
  }

  if (request.typeCourse && request.typeCourse !== "all") {
    queryParams.append("type.name", request.typeCourse);
  }

  if (request.duration && request.duration !== "all") {
    const durationValue = Number(request.duration);

    if (!isNaN(durationValue)) {
      if (durationValue > 50) {
        queryParams.append("duration", "50");
        queryParams.append("duration", "999999");
      } else {
        queryParams.append("duration", (durationValue - 10).toString());
        queryParams.append("duration", request.duration);
      }
    }
  }

  if (request.price) {
    const priceValue = Number(request.price);

    if (!isNaN(priceValue)) {
      if (priceValue > 100) {
        queryParams.append("price", "100");
        queryParams.append("price", "999999");
      } else {
        queryParams.append("price", (priceValue - 25).toString());
        queryParams.append("price", request.price);
      }
    }
  }

  if (request.page || request.page === 0) {
    queryParams.append("page", request.page.toString());
  }

  if (request.size) {
    queryParams.append("size", request.size.toString());
  }

  const url = `${baseURL}?${queryParams.toString()}`;

  const response = await api.get(url);
  return response.data;
};
