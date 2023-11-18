import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarWrapper from './components/NavbarWrapper';
import Home from './pages/product/Home';
import UserDashboardPage from './pages/gaze/UserDashboardPage';
import ModelsPage from './pages/gaze/ModelsPage';
import GazeWrapper from './components/GazeWrapper';
import DocumentationPage from './pages/gaze/DocumentationPage';
import ForecastsPage from './pages/gaze/ForecastsPage';
import IntegrationsPage from './pages/gaze/IntegrationsPage';

function App() {
  return (
    <Router>
      <div className="mx-auto max-w-app overflow-x-hidden">
        <NavbarWrapper />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app/dashboard" element={<UserDashboardPage />} />
          <Route path="/app/models" element={<ModelsPage />} />
          <Route path="/app/gaze/model_creator" element={<GazeWrapper />} />
          <Route path="/app/documentation" element={<DocumentationPage />} />
          <Route path="/app/forecasts" element={<ForecastsPage />} />
          <Route path="/app/integrations" element={<IntegrationsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
