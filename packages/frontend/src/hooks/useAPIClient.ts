import { apiClient } from "@/services";

export const useApiClient = () => {
  // const { getToken } = useAuth();

  // setupApiClient(getToken);

  return apiClient;
};
