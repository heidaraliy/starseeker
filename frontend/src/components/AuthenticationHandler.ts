import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useFetchAuth0User from '../hooks/useFetchAuth0User';
import useSendUserToBackend from '../hooks/useSendUserToBackend';

const AuthenticationHandler = () => {
  const { isAuthenticated } = useAuth0();
  const { userDetails } = useFetchAuth0User();
  const { sendUser } = useSendUserToBackend();
  const [isUserDataSent, setIsUserDataSent] = useState(false);

  useEffect(() => {
    const sendUserInfoToBackend = async () => {
      if (userDetails && !isUserDataSent) {
        try {
          console.log('Sending user data to backend.');
          await sendUser(
            'http://localhost:8080/api/user/auth',
            'POST',
            userDetails
          );
          setIsUserDataSent(true);
        } catch (error) {
          console.error('Error sending user data to backend:', error);
        }
      }
    };

    if (isAuthenticated) {
      sendUserInfoToBackend();
    }
  }, [isAuthenticated, userDetails, sendUser, isUserDataSent]);

  return null;
};

export default AuthenticationHandler;
