import { QUERIES } from "@/src/constants/queries";
import { courseService } from "@/src/services/courses";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {
  const [page, setPage] = useState(0);
  const size = 10;
  const [search, setSearch] = useState("");
  const [confirmedSearch, setConfirmedSearch] = useState("");

  const { data: courses, isLoading } = useQuery({
    queryFn: () => courseService.purchased({ page, size, search }),
    queryKey: [QUERIES.COURSE.PURCHASED, page, confirmedSearch],
  });

  const handleSearch = () => {
    setPage(0);
    setConfirmedSearch(search);
  };

  return {
    states: {
      page,
      size,
      search,
      courses: courses?.content,
      totalElements: courses?.totalElements,
      isLoading,
      confirmedSearch,
    },
    actions: {
      setPage,
      setSearch,
      setConfirmedSearch,
      handleSearch,
    },
  };
};

export default useHome;
