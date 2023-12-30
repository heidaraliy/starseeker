import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarWrapper from './components/NavbarWrapper';
import Home from './pages/public/HomePage';
import UserDashboardPage from './pages/prod/UserDashboardPage';
import ModelsPage from './pages/prod/ModelsPage';
import DocumentationPage from './pages/prod/DocumentationPage';
import ForecastsPage from './pages/prod/ForecastsPage';
import IntegrationsPage from './pages/public/IntegrationsPage';
import GazeMobilePage from './pages/prod_gaze/GazeMobilePage';
import GazeModelCreatorPage from './pages/prod_gaze/GazeModelCreatorPage';
import AnalyticsPage from './pages/prod/AnalyticsPage';
import ProductsPage from './pages/public/ProductsPage';
import SolutionsPage from './pages/public/SolutionsPage';
import PrivacyPage from './pages/public/PrivacyPage';
import ContactUsPage from './pages/public/ContactUsPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth0 } from '@auth0/auth0-react';
import AuthenticationHandler from './components/AuthenticationHandler';
import UserFooter from './components/UserFooter';

function App() {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log('User authenticated? ' + isAuthenticated);
  console.log('User loading? ' + isLoading);
  const userID = user?.sub.split('|')[1];

  // send to mobile page if user accesses Gaze.
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <div className="mx-auto overflow-x-hidden">
        <AuthenticationHandler />
        <NavbarWrapper />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact_us" element={<ContactUsPage />} />
          <Route
            path="/prod/dashboard"
            element={<ProtectedRoute component={UserDashboardPage} />}
          />
          <Route
            path="/prod/models"
            element={<ProtectedRoute component={ModelsPage} />}
          />
          <Route
            path="/prod/forecasts"
            element={<ProtectedRoute component={ForecastsPage} />}
          />
          <Route
            path="/prod/analytics"
            element={<ProtectedRoute component={AnalyticsPage} />}
          />
          <Route
            path="/prod/documentation"
            element={<ProtectedRoute component={DocumentationPage} />}
          />
          <Route
            path="/prod/gaze/model_creator"
            element={
              screenWidth < 768 ? (
                <GazeMobilePage />
              ) : (
                <ProtectedRoute component={GazeModelCreatorPage} />
              )
            }
          />
        </Routes>
        <UserFooter userID={userID} />
      </div>
    </Router>
  );
}

export default App;
