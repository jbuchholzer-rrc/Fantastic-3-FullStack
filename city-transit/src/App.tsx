import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import BusRouteMapPage from './pages/BusRouteMapPage';
import { StopsProvider } from './context/StopsContext';

function App() {
  return (
    <StopsProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/bus-route-map" element={<BusRouteMapPage />} />
          </Routes>
        </Layout>
      </Router>
    </StopsProvider>
  );
}

export default App;
