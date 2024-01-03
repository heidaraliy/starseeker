import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/starseeker_hover.png';
import colored_logo from '../assets/starseeker_color.png';
import colored_sign_out from '../assets/sign_out_color.png';
import AppSidebar from './AppSidebar';
import { useAuth0 } from '@auth0/auth0-react';
import useFetchAuth0User from '../hooks/useFetchAuth0User';
import useSendUserToBackend from '../hooks/useSendUserToBackend';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { isAuthenticated, logout } = useAuth0();
  const { userDetails } = useFetchAuth0User();
  const { sendUser } = useSendUserToBackend();
  const [isUserDataSent, setIsUserDataSent] = useState(false);

  const handleSignOut = () => {
    console.log('User signing out.');
    const sendUserInfoToBackend = async () => {
      if (isAuthenticated && userDetails && !isUserDataSent) {
        try {
          console.log('Sending user data to backend.');
          await sendUser(
            'http://localhost:8080/api/user/sign_out',
            'POST',
            userDetails
          );
          console.log('User signed out, session terminated.');
          setIsUserDataSent(true);
          logout();
        } catch (error) {
          console.error('Error sending user data to backend:', error);
        }
      } else {
        logout();
      }
    };

    sendUserInfoToBackend();
  };

  const toggleMobileNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="shadow-xl bg-gradient-to-r from-indigo-500 to-indigo-950 fixed w-screen z-50">
      <div>
        <div className="flex justify-between px-4">
          <div className="flex">
            <div>
              {/* logo */}
              <Link to="/prod/dashboard">
                <img
                  src={logo}
                  style={{ opacity: isHovered ? 1 : 0 }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  alt="Starseeker Logo"
                  className="relative -mt-0.5 w-52 py-2 drop-shadow-lg transition-all hover:drop-shadow-xl active:translate-y-0.5 duration-300"
                />
                <img
                  src={colored_logo}
                  style={{ opacity: isHovered ? 0 : 1 }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  alt="Starseeker Logo"
                  className="absolute -mt-0.5 top-0 w-52 py-2 drop-shadow-lg transition-all hover:drop-shadow-xl active:translate-y-0.5 duration-300"
                />
              </Link>
            </div>
            {/* nav items */}
            <div className="hidden lg:flex items-center space-x-2 ml-4 text-xl font-light">
              <Link
                to="/prod/dashboard"
                className={`tracking-tighter font-heebo py-4 px-2 text-indigo-50  ${
                  currentPath === '/prod/dashboard'
                    ? 'drop-shadow-xl font-bold text-indigo-200'
                    : ''
                } hover:text-indigo-200 duration-300`}
              >
                Dashboard
              </Link>
              <Link
                to="/prod/models"
                className={`tracking-tighter font-heebo py-4 px-2 text-indigo-50 ${
                  currentPath === '/prod/models'
                    ? 'drop-shadow-xl font-bold text-indigo-200'
                    : ''
                } hover:text-indigo-200 duration-300`}
              >
                Models
              </Link>
              <Link
                to="/prod/forecasts"
                className={`tracking-tighter font-heebo py-4 px-2 text-indigo-50 ${
                  currentPath === '/prod/forecasts'
                    ? 'drop-shadow-xl font-bold text-indigo-200'
                    : ''
                } hover:text-indigo-200 duration-300`}
              >
                Forecasts
              </Link>
              <Link
                to="/prod/analytics"
                className={`tracking-tighter font-heebo py-4 px-2 text-indigo-50 ${
                  currentPath === '/prod/analytics'
                    ? 'drop-shadow-xl font-bold text-indigo-200'
                    : ''
                } hover:text-indigo-200 duration-300`}
              >
                Analytics
              </Link>
              <Link
                to="/prod/documentation"
                className={`tracking-tighter font-heebo py-4 px-2 text-indigo-50 ${
                  currentPath === '/prod/documentation'
                    ? 'drop-shadow-xl font-bold text-indigo-200'
                    : ''
                } hover:text-indigo-200 duration-300`}
              >
                Documentation
              </Link>
            </div>
          </div>
          {/* sign out */}
          <div className="hidden lg:flex items-center">
            <img
              src={colored_sign_out}
              alt="Modulo Logo"
              className="w-36 drop-shadow-lg transition-all hover:drop-shadow-xl hover:-translate-y-0.5 duration-300"
              onClick={handleSignOut}
            />
          </div>
          {/* mobile menu */}
          <div className="lg:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button justify-end"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className=" w-6 h-6 text-indigo-50"
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* mobile nav items */}
      <div
        className={`lg:hidden text-lg nav-animate font-light ml-4 ${
          isOpen ? 'max-h-[23rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {' '}
        <Link
          to="/prod/dashboard"
          className="block font-heebo py-4 px-2 text-indigo-50 hover:text-indigo-300 transition duration-300"
          onClick={toggleMobileNavbar}
        >
          Dashboard
        </Link>
        <Link
          to="/prod/models"
          className="block font-heebo py-4 px-2 text-indigo-50 hover:text-indigo-300 transition duration-300"
          onClick={toggleMobileNavbar}
        >
          Models
        </Link>
        <Link
          to="/prod/forecasts"
          className="block font-heebo py-4 px-2 text-indigo-50 hover:text-indigo-300 transition duration-300"
          onClick={toggleMobileNavbar}
        >
          Forecasts
        </Link>
        <Link
          to="/prod/analytics"
          className="block font-heebo py-4 px-2 text-indigo-50 hover:text-indigo-300 transition duration-300"
          onClick={toggleMobileNavbar}
        >
          Analytics
        </Link>
        <Link
          to="/prod/documentation"
          className="block font-heebo py-4 px-2 text-indigo-50 hover:text-indigo-300 transition duration-300"
          onClick={toggleMobileNavbar}
        >
          Documentation
        </Link>
        <Link
          to="/"
          className="block tracking-tighter text-center items-center font-heebo font-bold w-28 py-0.5 my-4 mt-2 text-slate-700 bg-indigo-50 border-2 border-slate-400 rounded"
          onClick={handleSignOut}
        >
          Sign Out
        </Link>
      </div>
      <div className="absolute left-0 z-50">
        <AppSidebar />
      </div>
    </nav>
  );
};

export default Navbar;
