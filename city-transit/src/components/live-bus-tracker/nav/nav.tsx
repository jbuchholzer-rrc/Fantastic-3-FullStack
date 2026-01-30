import { NavLink } from "react-router-dom";
import "./Nav.css";

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
    </nav>
  );
};

export default Nav;