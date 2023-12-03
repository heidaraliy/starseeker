import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import AppNavbar from './AppNavbar';

const NavbarWrapper = () => {
  const location = useLocation();
  const isInApp = location.pathname.startsWith('/prod/');
  const isLogIn = location.pathname.startsWith('/sign_in');
  const isSignUp = location.pathname.startsWith('/sign_up');

  if (isInApp && !isLogIn && !isSignUp) {
    return <AppNavbar />;
  }

  if (isLogIn || isSignUp) {
    return null;
  }

  return <Navbar />;
};

export default NavbarWrapper;
