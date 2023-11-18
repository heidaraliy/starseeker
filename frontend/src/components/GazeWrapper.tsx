import { useEffect, useState } from 'react';
import GazeMobilePage from '../pages/gaze/GazeMobilePage';
import GazeModelCreatorPage from '../pages/gaze/GazeModelCreatorPage';

const GazeWrapper = () => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  // Function to handle window resize and update the screenWidth state
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  // Add a resize event listener when the component mounts
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>{screenWidth >= 768 ? <GazeModelCreatorPage /> : <GazeMobilePage />}</>
  );
};

export default GazeWrapper;
