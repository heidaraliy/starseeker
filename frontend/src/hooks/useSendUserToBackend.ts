import { useCallback, useState } from 'react';
import axios, { AxiosRequestConfig, Method } from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

interface UseSendUserToBackendReturn {
  sendUser: (endpoint: string, method: Method, data?: any) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

const useSendUserToBackend = (): UseSendUserToBackendReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { getAccessTokenSilently } = useAuth0();

  const sendUser = useCallback(
    async (endpoint: string, method: Method, data?: any) => {
      setIsLoading(true);
      setError(null);
      try {
        const token = await getAccessTokenSilently();
        const config: AxiosRequestConfig = {
          method,
          url: endpoint,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: data,
        };
        const response = await axios(config);
        console.log('Response from backend:', response.data);
      } catch (err) {
        setError(err as Error);
        console.error('Error during API request:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [getAccessTokenSilently]
  );

  return { sendUser, isLoading, error };
};

export default useSendUserToBackend;
