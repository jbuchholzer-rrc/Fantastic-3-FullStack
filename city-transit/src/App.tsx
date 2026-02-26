import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import BusRouteMapPage from "./pages/BusRouteMapPage";
import { StopsProvider } from "./context/StopsContext";

function App() {
  return (
    <StopsProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="bus-route-map" />} />
          <Route path="bus-route-map" element={<BusRouteMapPage />} />
        </Route>
      </Routes>
    </StopsProvider>
  );
}

export default App;