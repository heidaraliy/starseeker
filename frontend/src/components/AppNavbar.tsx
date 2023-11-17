import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/modulo_logo.svg';
import AppSidebar from './AppSidebar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMobileNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="shadow-xl bg-indigo-500 fixed w-screen z-50">
      <div>
        <div className="flex justify-between px-4">
          <div className="flex">
            <div>
              {/* logo */}
              <Link to="/app/dashboard">
                <img
                  src={logo}
                  alt="Modulo Logo"
                  className="w-36 py-2 drop-shadow-lg hover:drop-shadow-xl hover:-translate-y-0.5 active:translate-y-0 duration-100"
                />
              </Link>
            </div>
            {/* nav items */}
            <div className="hidden lg:flex items-end space-x-4 ml-4">
              <Link
                to="/app/dashboard"
                className={`tracking-tighter font-heebo text-lg py-4 px-2 text-white ${
                  currentPath === '/app/dashboard'
                    ? 'underline underline-offset-4'
                    : ''
                } hover:text-indigo-300 hover:-translate-y-0.5 active:translate-y-0 transition duration-200`}
              >
                Dashboard
              </Link>
              <Link
                to="/app/models"
                className={`tracking-tighter font-heebo text-lg py-4 px-2 text-white ${
                  currentPath === '/app/models'
                    ? 'underline underline-offset-4'
                    : ''
                } hover:text-indigo-300 hover:-translate-y-0.5 active:translate-y-0 transition duration-200`}
              >
                Models
              </Link>
              <Link
                to="/app/forecasts"
                className={`tracking-tighter font-heebo text-lg py-4 px-2 text-white ${
                  currentPath === '/app/forecasts'
                    ? 'underline underline-offset-4'
                    : ''
                } hover:text-indigo-300 hover:-translate-y-0.5 active:translate-y-0 transition duration-200`}
              >
                Forecasts
              </Link>
              <Link
                to="/app/documentation"
                className={`tracking-tighter font-heebo text-lg py-4 px-2 text-white ${
                  currentPath === '/app/documentation'
                    ? 'underline underline-offset-4'
                    : ''
                } hover:text-indigo-300 hover:-translate-y-0.5 active:translate-y-0 transition duration-200`}
              >
                Documentation
              </Link>
              <Link
                to="/app/integrations"
                className={`tracking-tighter font-heebo text-lg py-4 px-2 text-white ${
                  currentPath === '/app/integrations'
                    ? 'underline underline-offset-4'
                    : ''
                } hover:text-indigo-300 hover:-translate-y-0.5 active:translate-y-0 transition duration-200`}
              >
                Integrations
              </Link>
            </div>
          </div>
          {/* big button */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/"
              className="block tracking-tighter text-center items-center font-heebo text-lg w-28 py-1 font-bold text-slate-700 bg-indigo-50 border-2 border-slate-400 rounded hover:bg-red-300 hover:-translate-y-0.5 hover:border-red-800 hover:text-red-900 active:translate-y-0.5 transition duration-200"
            >
              Sign Out
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
        className={`lg:hidden text-lg nav-animate ${
          isOpen ? 'max-h-[23rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {' '}
        <Link
          to="/app/dashboard"
          className="block font-heebo ml-4 py-4 px-2 text-white hover:text-indigo-300 transition duration-300"
          onClick={toggleMobileNavbar}
        >
          Dashboard
        </Link>
        <Link
          to="/app/models"
          className="block font-heebo ml-4 py-4 px-2 text-white hover:text-indigo-300 transition duration-300"
          onClick={toggleMobileNavbar}
        >
          Models
        </Link>
        <Link
          to="/app/models"
          className="block font-heebo ml-4 py-4 px-2 text-white hover:text-indigo-300 transition duration-300"
          onClick={toggleMobileNavbar}
        >
          Forecasts
        </Link>
        <Link
          to="/app/documentation"
          className="block font-heebo ml-4 py-4 px-2 text-white hover:text-indigo-300 transition duration-300"
          onClick={toggleMobileNavbar}
        >
          Documentation
        </Link>
        <Link
          to="/app/integrations"
          className="block font-heebo ml-4 py-4 px-2 text-white hover:text-indigo-300 transition duration-300"
          onClick={toggleMobileNavbar}
        >
          Integrations
        </Link>
        <Link
          to="/"
          className="block tracking-tighter text-center items-center font-heebo text-lg w-28 py-0.5 my-4 ml-4 mt-2 font-bold text-slate-700 bg-indigo-50 border-2 border-slate-400 rounded"
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
