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
import SignInPage from './pages/user_auth/SignInPage';
import SignUpPage from './pages/user_auth/SignUpPage';
import ProductsPage from './pages/public/ProductsPage';
import SolutionsPage from './pages/public/SolutionsPage';
import PrivacyPage from './pages/public/PrivacyPage';
import ContactUsPage from './pages/public/ContactUsPage';

function App() {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

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
      <div className="mx-auto  overflow-x-hidden">
        <NavbarWrapper />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact_us" element={<ContactUsPage />} />
          <Route path="/sign_in" element={<SignInPage />} />
          <Route path="/sign_up" element={<SignUpPage />} />
          <Route path="/prod/dashboard" element={<UserDashboardPage />} />
          <Route path="/prod/models" element={<ModelsPage />} />
          <Route path="/prod/forecasts" element={<ForecastsPage />} />
          <Route path="/prod/analytics" element={<AnalyticsPage />} />
          <Route path="/prod/documentation" element={<DocumentationPage />} />
          <Route
            path="/prod/gaze/usage"
            element={
              screenWidth < 768 ? <GazeMobilePage /> : <GazeModelCreatorPage />
            }
          />
          <Route
            path="/prod/gaze/explore"
            element={
              screenWidth < 768 ? <GazeMobilePage /> : <GazeModelCreatorPage />
            }
          />
          <Route
            path="/prod/gaze/forecast"
            element={
              screenWidth < 768 ? <GazeMobilePage /> : <GazeModelCreatorPage />
            }
          />
          <Route
            path="/prod/gaze/analytics"
            element={
              screenWidth < 768 ? <GazeMobilePage /> : <GazeModelCreatorPage />
            }
          />
          <Route
            path="/prod/gaze/model_creator"
            element={
              screenWidth < 768 ? <GazeMobilePage /> : <GazeModelCreatorPage />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
