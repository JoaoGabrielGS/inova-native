import { useQuery } from "@tanstack/react-query";
import { profileService } from "../services/profile";
import { QUERIES } from "../constants/queries";

const useProfile = () => {
  const { data: profileData, isLoading } = useQuery({
    queryFn: () => profileService.getProfile(),
    queryKey: [QUERIES.PROFILE.GET],
  });

  return {
    profileData,
    isLoading,
  };
};

export default useProfile;
