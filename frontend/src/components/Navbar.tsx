import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/starseeker_mono.png';
import colored_logo from '../assets/starseeker_color.png';
import mono_sign_in from '../assets/sign_in_mono.png';
import colored_sign_in from '../assets/sign_in_color.png';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSignInHovered, setIsSignInHovered] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { loginWithRedirect } = useAuth0();

  const handleSignIn = () => {
    loginWithRedirect();
  };

  const toggleMobileNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="shadow-xl bg-gradient-to-r from-neutral-500 to-neutral-900 fixed w-screen z-50">
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
            {/* nav items */}
            <div className="hidden lg:flex items-center space-x-2 ml-4 text-xl font-light">
              <Link
                to="/products"
                className={`tracking-tighter font-heebo py-4 px-2 text-neutral-50  ${
                  currentPath === '/products'
                    ? 'drop-shadow-xl font-bold text-neutral-300'
                    : ''
                } hover:text-neutral-300 duration-300`}
              >
                Products
              </Link>
              <Link
                to="/solutions"
                className={`tracking-tighter font-heebo py-4 px-2 text-neutral-50  ${
                  currentPath === '/solutions'
                    ? 'drop-shadow-xl font-bold text-neutral-300'
                    : ''
                } hover:text-neutral-300 duration-300`}
              >
                Solutions
              </Link>
              <Link
                to="/integrations"
                className={`tracking-tighter font-heebo py-4 px-2 text-neutral-50  ${
                  currentPath === '/integrations'
                    ? 'drop-shadow-xl font-bold text-neutral-300'
                    : ''
                } hover:text-neutral-300 duration-300`}
              >
                Integrations
              </Link>
              <Link
                to="/privacy"
                className={`tracking-tighter font-heebo py-4 px-2 text-neutral-50  ${
                  currentPath === '/privacy'
                    ? 'drop-shadow-xl font-bold text-neutral-300'
                    : ''
                } hover:text-neutral-300 duration-300`}
              >
                Privacy
              </Link>
              <Link
                to="/contact_us"
                className={`tracking-tighter font-heebo py-4 px-2 text-neutral-50  ${
                  currentPath === '/contact_us'
                    ? 'drop-shadow-xl font-bold text-neutral-300'
                    : ''
                } hover:text-neutral-300 duration-300`}
              >
                Contact Us
              </Link>
            </div>
          </div>
          {/* sign in */}
          <div className="hidden lg:flex items-center">
            {/* <a href="http://localhost:8080/auth/start"> */}
            <img
              src={mono_sign_in}
              style={{ opacity: isSignInHovered ? 0 : 1 }}
              onMouseEnter={() => setIsSignInHovered(true)}
              onMouseLeave={() => setIsSignInHovered(false)}
              alt="Modulo Logo"
              className="relative w-36 drop-shadow-lg transition-all hover:drop-shadow-2xl active:translate-y-0.5 duration-300"
            />
            <img
              onClick={handleSignIn}
              src={colored_sign_in}
              style={{ opacity: isSignInHovered ? 1 : 0 }}
              onMouseEnter={() => setIsSignInHovered(true)}
              onMouseLeave={() => setIsSignInHovered(false)}
              alt="Modulo Logo"
              className="absolute top-[1.04rem] w-36 drop-shadow-lg transition-all hover:drop-shadow-2xl active:translate-y-0.5 duration-300"
            />
            {/* </a> */}
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
          onClick={toggleMobileNavbar}
        >
          Products
        </Link>
        <Link
          to="/solutions"
          className="tracking-tighter block font-heebo py-4 px-2 text-white hover:text-neutral-300 transition duration-300"
          onClick={toggleMobileNavbar}
        >
          Solutions
        </Link>
        <Link
          to="/integrations"
          className="tracking-tighter block font-heebo py-4 px-2 text-white hover:text-neutral-300 transition duration-300"
          onClick={toggleMobileNavbar}
        >
          Integrations
        </Link>
        <Link
          to="/privacy"
          className="tracking-tighter block font-heebo py-4 px-2 text-white hover:text-neutral-300 transition duration-300"
          onClick={toggleMobileNavbar}
        >
          Privacy
        </Link>
        <Link
          to="/contact_us"
          className="tracking-tighter block font-heebo py-4 px-2 text-white hover:text-neutral-300 transition duration-300"
          onClick={toggleMobileNavbar}
        >
          Contact Us
        </Link>
        <div
          className="block tracking-tighter text-center items-center font-heebo font-bold w-28 py-0.5 my-4 mt-2 text-neutral-700 bg-neutral-50 border-2 border-neutral-400 rounded"
          onClick={toggleMobileNavbar}
        >
          <a href="http://localhost:8080/auth/start">Sign In</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
