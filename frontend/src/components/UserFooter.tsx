import React, { useEffect, useState } from 'react';
import starseeker_solo_logo from '../assets/starseeker_solo_logo.png';
import { useAuth0 } from '@auth0/auth0-react';

type UserFooterProps = {
  userID: string;
};

const UserFooter: React.FC<UserFooterProps> = ({ userID }) => {
  const [ipAddress, setIpAddress] = useState<string>('');
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => setIpAddress(data.ip))
      .catch((error) => console.error('Error fetching IP address:', error));
  }, []);

  return (
    <div>
      <div className="flex drop-shadow2xl bg-gradient-to-r from-indigo-500 to-indigo-950 bg-gray-200 text-sm">
        <div className="flex m-2">
          <img
            src={starseeker_solo_logo}
            className="flex w-16 h-16 my-auto mr-4"
          />
          <div className="flex flex-col font-heebo text-left justify-end text-xs border-2 border-neutral-400 rounded-sm bg-indigo-50 text-neutral-800 shadow-2xl my-auto p-1">
            <span className="text-sm font-bold drop-shadow-sm">
              Session Data:
            </span>
            <span className="text-sm font-normal"></span>
            <p>
              User:{' '}
              {userID && isAuthenticated ? (
                <span className="font-light">{userID}</span>
              ) : (
                <span className="font-light">Failed to fetch email.</span>
              )}
            </p>
            {/* <p>
            Sign In Time:{' '}
            {signInTimestamp.toLocaleString() && isAuthenticated ? (
              <span className="font-light">
                {signInTimestamp.toLocaleString()}
              </span>
            ) : (
              <span className="font-light">Failed to fetch timestamp.</span>
            )}
          </p> */}
            <p>
              IP Address:{' '}
              {ipAddress && isAuthenticated ? (
                <span className="font-light">{ipAddress}</span>
              ) : (
                <span className="font-light">Failed to fetch IP address.</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFooter;
