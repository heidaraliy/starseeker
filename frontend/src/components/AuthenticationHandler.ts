import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const AuthenticationHandler = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const auth0Domain: string = import.meta.env.VITE_AUTH0_DOMAIN;
    const updateUserInfo = async () => {
      if (isAuthenticated) {
        console.log('User authenticated. Starting database ingestion check.');
        try {
          console.log('Attempting to retrieve access token.');
          const token = await getAccessTokenSilently();
          // ({
          //   authorizationParams: {
          //     audience: 'https://api.example.com/', // Value in Identifier field for the API being called.
          //     scope: 'read:posts', // Scope that exists for the API being called. You can create these through the Auth0 Management API or through the Auth0 Dashboard in the Permissions view of your API.
          //   },
          // });
          console.log('Token retrieved. Attempting to fetch user data.');
          console.log('Attempting to retrieve user data.');
          const response = await axios.get(`https://${auth0Domain}/userinfo`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userDetails = response.data;
          console.log(
            'User data retrieved. \n\n',
            JSON.stringify(userDetails, null, 2)
          );

          axios
            .post('http://localhost:8080/api/user/auth', userDetails, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              console.log('Response from the server:', response.data);
            })
            .catch((error) => {
              console.error('Error during database update:', error);
            });
        } catch (error) {
          console.error('Error during authentication:', error);
        }
      }
    };

    updateUserInfo();
  }, [isAuthenticated, getAccessTokenSilently]);

  return null; // This component doesn't render anything
};

export default AuthenticationHandler;
