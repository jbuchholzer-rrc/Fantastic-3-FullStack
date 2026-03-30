/**
 * @author Jack Buchholzer
 * HomePage -- landing page with quick stats and navigation
 *
 * Shows how many routes and stops we have synced from the
 * Winnipeg Transit API, current service advisories, and
 * quick links to the main features.
 */

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Radio, MapPin, Navigation, Heart } from "lucide-react"
import { getTransitStops, getTransitRoutes } from "../hooks/useTransit"
import ServiceAdvisoryBanner from "../components/ServiceAdvisoryBanner"
import "./HomePage.css"

function HomePage() {
  const [stopCount, setStopCount] = useState(0)
  const [routeCount, setRouteCount] = useState(0)

  useEffect(() => {
    getTransitStops()
      .then((data) => setStopCount(data.length))
      .catch(() => {})

    getTransitRoutes()
      .then((data) => setRouteCount(data.length))
      .catch(() => {})
  }, [])

  return (
    <div className="home-page">
      <div className="home-hero">
        <h2>Winnipeg Transit Tracker</h2>
        <p>Real-time bus tracking, route maps, and trip planning for Winnipeg Transit</p>
      </div>

      <div className="home-stats">
        <div className="card stat-card">
          <span className="stat-number">{routeCount}</span>
          <span className="stat-label">Transit Routes</span>
        </div>
        <div className="card stat-card">
          <span className="stat-number">{stopCount}</span>
          <span className="stat-label">Bus Stops</span>
        </div>
      </div>

      <div className="home-links">
        <Link to="/live-bus-tracker" className="card home-link-card">
          <Radio size={24} className="link-icon" />
          <div>
            <div className="link-text">Live Bus Tracker</div>
            <div className="link-desc">Check real-time arrivals at any stop</div>
          </div>
        </Link>

        <Link to="/bus-route-map" className="card home-link-card">
          <MapPin size={24} className="link-icon" />
          <div>
            <div className="link-text">Route Map</div>
            <div className="link-desc">View routes and stops on the map</div>
          </div>
        </Link>

        <Link to="/trip-planner" className="card home-link-card">
          <Navigation size={24} className="link-icon" />
          <div>
            <div className="link-text">Trip Planner</div>
            <div className="link-desc">Plan your trip with real transit data</div>
          </div>
        </Link>

        <Link to="/favorites" className="card home-link-card">
          <Heart size={24} className="link-icon" />
          <div>
            <div className="link-text">Favorites</div>
            <div className="link-desc">Your saved favorite buses</div>
          </div>
        </Link>
      </div>

      <div className="home-advisories">
        <h3>Service Advisories</h3>
        <ServiceAdvisoryBanner />
      </div>
    </div>
  )
}

export default HomePage
