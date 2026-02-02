import { NavLink } from "react-router-dom";
import "./nav.css";

const Nav = () => {
  return (
    <nav className="main-nav">
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/live-bus-tracker">
        Live Bus Tracker
      </NavLink>
      <NavLink to="/favorites">
        Favorites
      </NavLink>
      <NavLink to="/bus-route-map">
        Bus Route Map
      </NavLink>
      <NavLink to="/trip-planner">
        Trip Planner
      </NavLink>
    </nav>
  );
};

export default Nav;