import { NavLink } from "react-router-dom"
import { Home, Radio, Heart, MapPin, Navigation, Clock } from "lucide-react"
import "./nav.css"

const Nav = () => {
  return (
    <nav className="main-nav">
      <NavLink to="/" end>
        <Home size={16} />
        Home
      </NavLink>
      <NavLink to="/live-bus-tracker">
        <Radio size={16} />
        Live Tracker
      </NavLink>
      <NavLink to="/bus-route-map">
        <MapPin size={16} />
        Route Map
      </NavLink>
      <NavLink to="/trip-planner">
        <Navigation size={16} />
        Trip Planner
      </NavLink>
      <NavLink to="/saved-trips">
        <Clock size={16} />
        Saved Trips
      </NavLink>
      <NavLink to="/favorites">
        <Heart size={16} />
        Favorites
      </NavLink>
    </nav>
  )
}

export default Nav
