import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/datagaze_logo.png';
import colored_sign_out from '../assets/datagaze_sign_out_background.png';
import mono_sign_out from '../assets/datagaze_sign_out_mono.png';
import AppSidebar from './AppSidebar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignOutHovered, setIsSignOutHovered] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMobileNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="shadow-xl bg-gradient-to-r from-indigo-900 to-indigo-700 fixed w-screen z-50">
      <div>
        <div className="flex justify-between px-4">
          <div className="flex">
            <div>
              {/* logo */}
              <Link to="/app/dashboard">
                <img
                  src={logo}
                  alt="Modulo Logo"
                  className="-mt-0.5 w-52 py-2 drop-shadow-md hover:drop-shadow-lg hover:-translate-y-0.5 active:translate-y-0 duration-200"
                />
              </Link>
            </div>
            {/* nav items */}
            <div className="hidden lg:flex items-center space-x-2 ml-4 text-xl font-light">
              <Link
                to="/app/dashboard"
                className={`tracking-tighter font-heebo py-4 px-2 text-white ${
                  currentPath === '/app/dashboard'
                    ? 'drop-shadow-xl font-bold'
                    : ''
                } hover:text-indigo-300 hover:-translate-y-0.5 active:translate-y-0 transition duration-200`}
              >
                Dashboard
              </Link>
              <Link
                to="/app/models"
                className={`tracking-tighter font-heebo py-4 px-2 text-white ${
                  currentPath === '/app/models'
                    ? 'drop-shadow-xl font-bold'
                    : ''
                } hover:text-indigo-300 hover:-translate-y-0.5 active:translate-y-0 transition duration-200`}
              >
                Models
              </Link>
              <Link
                to="/app/forecasts"
                className={`tracking-tighter font-heebo py-4 px-2 text-white ${
                  currentPath === '/app/forecasts'
                    ? 'drop-shadow-xl font-bold'
                    : ''
                } hover:text-indigo-300 hover:-translate-y-0.5 active:translate-y-0 transition duration-200`}
              >
                Forecasts
              </Link>
              <Link
                to="/app/documentation"
                className={`tracking-tighter font-heebo py-4 px-2 text-white ${
                  currentPath === '/app/documentation'
                    ? 'drop-shadow-xl font-bold'
                    : ''
                } hover:text-indigo-300 hover:-translate-y-0.5 active:translate-y-0 transition duration-200`}
              >
                Documentation
              </Link>
              <Link
                to="/app/integrations"
                className={`tracking-tighter font-heebo py-4 px-2 text-white ${
                  currentPath === '/app/integrations'
                    ? 'drop-shadow-xl font-bold'
                    : ''
                } hover:text-indigo-300 hover:-translate-y-0.5 active:translate-y-0 transition duration-200`}
              >
                Integrations
              </Link>
            </div>
          </div>
          {/* sign out */}
          <div className="hidden lg:flex items-center">
            <Link to="/">
              <img
                src={mono_sign_out}
                style={{ opacity: isSignOutHovered ? 1 : 0 }}
                onMouseEnter={() => setIsSignOutHovered(true)}
                onMouseLeave={() => setIsSignOutHovered(false)}
                alt="Modulo Logo"
                className="relative border-2 border-black rounded-sm w-28 drop-shadow-lg transition-all hover:drop-shadow-2xl active:translate-y-0.5 duration-300"
              />
              <img
                src={colored_sign_out}
                style={{ opacity: isSignOutHovered ? 0 : 1 }}
                onMouseEnter={() => setIsSignOutHovered(true)}
                onMouseLeave={() => setIsSignOutHovered(false)}
                alt="Modulo Logo"
                className="absolute top-[1.05rem] border-2 border-indigo-950 rounded-sm w-28 drop-shadow-lg transition-all hover:drop-shadow-2xl active:translate-y-0.5 duration-300"
              />
            </Link>
          </div>
          {/* mobile menu */}
          <div className="lg:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button justify-end"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className=" w-6 h-6 text-white"
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
          to="/app/dashboard"
          className="block font-heebo py-4 px-2 text-white hover:text-indigo-300 transition duration-300"
          onClick={toggleMobileNavbar}
        >
          Dashboard
        </Link>
        <Link
          to="/app/models"
          className="block font-heebo py-4 px-2 text-white hover:text-indigo-300 transition duration-300"
          onClick={toggleMobileNavbar}
        >
          Models
        </Link>
        <Link
          to="/app/forecasts"
          className="block font-heebo py-4 px-2 text-white hover:text-indigo-300 transition duration-300"
          onClick={toggleMobileNavbar}
        >
          Forecasts
        </Link>
        <Link
          to="/app/documentation"
          className="block font-heebo py-4 px-2 text-white hover:text-indigo-300 transition duration-300"
          onClick={toggleMobileNavbar}
        >
          Documentation
        </Link>
        <Link
          to="/app/integrations"
          className="block font-heebo py-4 px-2 text-white hover:text-indigo-300 transition duration-300"
          onClick={toggleMobileNavbar}
        >
          Integrations
        </Link>
        <Link
          to="/"
          className="block tracking-tighter text-center items-center font-heebo font-bold w-28 py-0.5 my-4 mt-2 text-slate-700 bg-indigo-50 border-2 border-slate-400 rounded"
          onClick={toggleMobileNavbar}
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
