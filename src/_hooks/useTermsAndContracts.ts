import { useQuery } from "@tanstack/react-query";
import { MUTATION } from "../constants/mutations";
import { getProfile } from "../services/profile/get";

export const useTermsAndContracts = () => {
  const terms = {
    id: 1,
    content: "",
    url: "https://cursos-livres-cdn-prod.inovacarreira.com.br/files/B14384AC2913719C0DB937263BCEA6C1.pdf",
    date: new Date().toISOString(),
    ip: "127.0.0.1",
    hash: "265SD890EHVC098735GJHY",
  };

  const { data: user } = useQuery({
    queryKey: [MUTATION.PROFILE.FINDONE],
    queryFn: getProfile,
  });

  return {
    states: { terms, user },
  };
};
