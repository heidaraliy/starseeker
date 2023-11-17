import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import AppNavbar from './AppNavbar';

const NavbarWrapper = () => {
  const location = useLocation();
  const isInApp = location.pathname.startsWith('/app');

  return <>{isInApp ? <AppNavbar /> : <Navbar />}</>;
};

export default NavbarWrapper;
