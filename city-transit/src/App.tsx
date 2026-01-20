import "./App.css";

import BusRouteMap from "./components/bus-route-map/BusRouteMap";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>City Transit Planner</h1>
      </header>

      <main>
        
        <BusRouteMap />
       
      </main>

      <footer className="app-footer">
        <p>Team Members: Khush, Harsh, Jack</p>
      </footer>
    </div>
  );
}

export default App;
