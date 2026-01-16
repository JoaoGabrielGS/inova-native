"use client";

import { api } from "@/src/lib/api-manager";

export const create = async (lessonId: number, enrollmentId: number) => {
  const response = await api.post(
    `/lesson-watch/watch/${lessonId}/${enrollmentId}`,
  );
  return response;
};
