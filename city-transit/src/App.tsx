import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import BusRouteMapPage from "./pages/BusRouteMapPage";
import LiveBusTrackerPage from "./pages/liveBusTrackerPage";
import FavoritesPage from "./pages/FavoritesPage";
import TripPlannerPage from "./pages/TripPlannerPage";
import SavedTripsPage from "./pages/SavedTripsPage";

import { StopsProvider } from "./context/StopsContext";

function App() {
  return (
    <StopsProvider>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<Navigate to="bus-route-map" />} />

          <Route path="bus-route-map" element={<BusRouteMapPage />} />
          <Route path="live-bus-tracker" element={<LiveBusTrackerPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="trip-planner" element={<TripPlannerPage />} />
          <Route path="saved-trips" element={<SavedTripsPage />} />

        </Route>
      </Routes>
    </StopsProvider>
  );
}

export default App;