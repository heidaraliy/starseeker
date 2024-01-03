import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const useFetchAuth0User = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!isAuthenticated) return;
      setIsLoading(true);
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(
          `https://${import.meta.env.VITE_AUTH0_DOMAIN}/userinfo`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserDetails(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [isAuthenticated, getAccessTokenSilently]);

  return { userDetails, isLoading, error };
};

export default useFetchAuth0User;
