import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/modulo_logo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow-xl bg-indigo-500 fixed w-screen z-50">
      <div>
        <div className="flex justify-between mx-4">
          <div className="flex">
            <div>
              {/* logo */}
              <Link to="/">
                <img
                  src={logo}
                  alt="Modulo Logo"
                  className="w-36 py-2 drop-shadow-lg hover:drop-shadow-xl hover:-translate-y-0.5 active:translate-y-0 duration-100"
                />
              </Link>
            </div>
            {/* Primary Navbar items */}
            <div className="hidden lg:flex items-end space-x-4 ml-4">
              <a
                href=""
                className="tracking-tighter font-heebo text-lg py-4 px-2 text-white hover:text-indigo-200 transition duration-300"
              >
                Products
              </a>
              <a
                href=""
                className="tracking-tighter font-heebo text-lg py-4 px-2 text-white hover:text-indigo-200 transition duration-300"
              >
                Services
              </a>
              <a
                href=""
                className="tracking-tighter font-heebo text-lg py-4 px-2 text-white hover:text-indigo-200 transition duration-300"
              >
                Solutions
              </a>
              <a
                href=""
                className="tracking-tighter font-heebo text-lg py-4 px-2 text-white hover:text-indigo-200 transition duration-300"
              >
                Privacy
              </a>
              <a
                href=""
                className="tracking-tighter font-heebo text-lg py-4 px-2 text-white hover:text-indigo-200 transition duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
          {/* Secondary Navbar items */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/app/dashboard"
              className="block tracking-tighter text-center items-center font-heebo text-lg w-28 py-1 font-bold text-slate-700 bg-slate-200 border-2 border-slate-400 rounded hover:bg-green-300 hover:-translate-y-0.5 hover:border-green-800 hover:text-green-900 active:translate-y-0.5 transition duration-200"
            >
              Sign In
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button justify-end"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6 text-neutral-800"
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
        className={`${
          isOpen ? 'h-[22.5rem]' : 'hidden'
        } lg:hidden text-lg ml-4`}
      >
        <Link
          to="/contact_us"
          className="tracking-tighter block font-heebo text-lg py-4 px-2 text-white font-bold hover:text-indigo-200 transition duration-300"
        >
          Products
        </Link>
        <Link
          to="/contact_us"
          className="tracking-tighter block font-heebo text-lg py-4 px-2 text-white font-bold hover:text-indigo-200 transition duration-300"
        >
          Services
        </Link>
        <Link
          to="/contact_us"
          className="tracking-tighter block font-heebo text-lg py-4 px-2 text-white font-bold hover:text-indigo-200 transition duration-300"
        >
          Solutions
        </Link>
        <Link
          to="/contact_us"
          className="tracking-tighter block font-heebo text-lg py-4 px-2 text-white font-bold hover:text-indigo-200 transition duration-300"
        >
          Privacy
        </Link>
        <Link
          to="/contact_us"
          className="tracking-tighter block font-heebo text-lg py-4 px-2 text-white font-bold hover:text-indigo-200 transition duration-300"
        >
          Contact Us
        </Link>
        <Link
          to="/app/dashboard"
          className="block tracking-tighter text-center items-center font-heebo text-lg w-28 py-0.5 mt-2 font-bold text-slate-700 bg-indigo-50 border-2 border-slate-400 rounded hover:bg-green-300 hover:-translate-y-0.5 hover:border-green-800 hover:text-green-900 active:translate-y-0.5 transition duration-200"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
