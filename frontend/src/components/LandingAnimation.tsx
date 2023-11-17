import { useEffect, useState } from 'react';
import logo from '../assets/modulo_logo.svg'; // Adjust the path to your logo file

const LandingPage = () => {
  // State to manage the class names for animation
  const [logoClass, setLogoClass] = useState('');
  const [mottoClass, setMottoClass] = useState('');

  useEffect(() => {
    // Set the class names to start the animation after a delay
    const timer = setTimeout(() => {
      setLogoClass('logo-small-translate');
      setMottoClass('motto-fade-out');
    }, 2000); // Adjust delay for animation start as needed

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen relative">
        {/* Logo */}
        <img
          src={logo}
          alt="Modulo Logo"
          className={`transition-all duration-3000 ease-in-out transform w-64 h-20 ${logoClass}`}
        />
        {/* Motto */}
        <p
          className={`font-signika text-2xl text-white transition-opacity duration-1500 ease-in-out ${mottoClass}`}
        >
          The missing piece.
        </p>
        <div>hi</div>
      </div>
    </div>
  );
};

export default LandingPage;
