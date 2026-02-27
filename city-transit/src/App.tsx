import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import BusRouteMapPage from './pages/BusRouteMapPage';
import TripPlannerPage from './pages/TripPlannerPage';
import SavedTripsPage from './pages/SavedTripsPage';
import { StopsProvider } from './context/StopsContext';

function App() {
  return (
    <StopsProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/trip-planner" element={<TripPlannerPage />} />
          <Route path="/saved-trips" element={<SavedTripsPage />} />
          <Route path="/bus-route-map" element={<BusRouteMapPage />} />
        </Routes>
      </Layout>
    </StopsProvider>
  );
}

export default App
