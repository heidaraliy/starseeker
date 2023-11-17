import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/datagaze_home_logo.png';
import colored_logo from '../assets/datagaze_logo.png';
import mono_sign_in from '../assets/datagaze_sign_in_mono.png';
import colored_sign_in from '../assets/datagaze_sign_in_background.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSignInHovered, setIsSignInHovered] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMobileNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="shadow-xl bg-gradient-to-r from-neutral-900 to-neutral-400 fixed w-screen z-50">
      <div>
        <div className="flex justify-between px-4">
          <div className="flex">
            <div>
              {/* logo */}
              <Link to="/">
                <img
                  src={logo}
                  style={{ opacity: isHovered ? 0 : 1 }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  alt="Modulo Logo"
                  className="relative -mt-0.5 w-52 py-2 drop-shadow-lg transition-all hover:drop-shadow-xl active:translate-y-0.5 duration-300"
                />
                <img
                  src={colored_logo}
                  style={{ opacity: isHovered ? 1 : 0 }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  alt="Modulo Logo"
                  className="absolute -mt-0.5 top-0 w-52 py-2 drop-shadow-lg transition-all hover:drop-shadow-xl active:translate-y-0.5 duration-300"
                />
              </Link>
            </div>
            {/* Primary Navbar items */}
            <div className="hidden lg:flex items-center space-x-2 ml-4 text-xl font-light">
              <Link
                to="/products"
                className={`tracking-tighter font-heebo py-4 px-2 text-white ${
                  currentPath === '/products' ? 'drop-shadow-xl font-bold' : ''
                } hover:text-neutral-300 hover:-translate-y-0.5 active:translate-y-0 transition duration-200`}
              >
                Products
              </Link>
              <Link
                to="/solutions"
                className={`tracking-tighter font-heebo py-4 px-2 text-white ${
                  currentPath === '/solutions' ? 'drop-shadow-xl font-bold' : ''
                } hover:text-neutral-300 hover:-translate-y-0.5 active:translate-y-0 transition duration-200`}
              >
                Solutions
              </Link>
              <Link
                to="/privacy"
                className={`tracking-tighter font-heebo py-4 px-2 text-white ${
                  currentPath === '/privacy' ? 'drop-shadow-xl font-bold' : ''
                } hover:text-neutral-300 hover:-translate-y-0.5 active:translate-y-0 transition duration-200`}
              >
                Privacy
              </Link>
              <Link
                to="/contact_us"
                className={`tracking-tighter font-heebo py-4 px-2 text-white ${
                  currentPath === '/contact_us'
                    ? 'drop-shadow-xl font-bold'
                    : ''
                } hover:text-neutral-300 hover:-translate-y-0.5 active:translate-y-0 transition duration-200`}
              >
                Contact Us
              </Link>
            </div>
          </div>
          {/* sign in */}
          <div className="hidden lg:flex items-center">
            <Link to="/app/dashboard">
              <img
                src={mono_sign_in}
                style={{ opacity: isSignInHovered ? 0 : 1 }}
                onMouseEnter={() => setIsSignInHovered(true)}
                onMouseLeave={() => setIsSignInHovered(false)}
                alt="Modulo Logo"
                className="relative border-2 border-black rounded-sm w-28 drop-shadow-lg transition-all hover:drop-shadow-2xl active:translate-y-0.5 duration-300"
              />
              <img
                src={colored_sign_in}
                style={{ opacity: isSignInHovered ? 1 : 0 }}
                onMouseEnter={() => setIsSignInHovered(true)}
                onMouseLeave={() => setIsSignInHovered(false)}
                alt="Modulo Logo"
                className="absolute top-[1.05rem] border-2 border-indigo-950 rounded-sm w-28 drop-shadow-lg transition-all hover:drop-shadow-2xl active:translate-y-0.5 duration-300"
              />
            </Link>
          </div>
          {/* Mobile menu button */}
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
      {/* Mobile menu */}

      <div
        className={`lg:hidden text-lg nav-animate ml-4 font-light ${
          isOpen ? 'max-h-[23rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <Link
          to="/products"
          className="tracking-tighter block font-heebo py-4 px-2 text-white hover:text-neutral-300 transition duration-300"
        >
          Products
        </Link>
        <Link
          to="/solutions"
          className="tracking-tighter block font-heebo py-4 px-2 text-white hover:text-neutral-300 transition duration-300"
        >
          Solutions
        </Link>
        <Link
          to="/privacy"
          className="tracking-tighter block font-heebo py-4 px-2 text-white hover:text-neutral-300 transition duration-300"
        >
          Privacy
        </Link>
        <Link
          to="/contact_us"
          className="tracking-tighter block font-heebo py-4 px-2 text-white hover:text-neutral-300 transition duration-300"
        >
          Contact Us
        </Link>
        <Link
          to="/app/dashboard"
          className="block tracking-tighter text-center items-center font-heebo font-bold w-28 py-0.5 my-4 mt-2 text-slate-700 bg-indigo-50 border-2 border-slate-400 rounded"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
