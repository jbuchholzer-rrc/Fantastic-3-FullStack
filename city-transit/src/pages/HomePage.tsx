/**
 * @author Jack Buchholzer
 * HomePage -- landing page with weather, navigation, and service advisories
 *
 * Weather comes from Open-Meteo (free, no API key needed).
 * Uses WMO weather codes to pick the right icon and description.
 */

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Radio, MapPin, Navigation, Heart, AlertTriangle, Wind, Cloud, Sun, CloudRain, CloudSnow, CloudDrizzle, CloudLightning, CloudFog } from "lucide-react"
import ServiceAdvisoryBanner from "../components/ServiceAdvisoryBanner"
import "./HomePage.css"

// WMO weather codes mapped to descriptions and icons
// https://open-meteo.com/en/docs
function getWeatherInfo(code: number) {
  if (code === 0) return { desc: "Clear sky", Icon: Sun }
  if (code <= 3) return { desc: "Partly cloudy", Icon: Cloud }
  if (code <= 49) return { desc: "Foggy", Icon: CloudFog }
  if (code <= 59) return { desc: "Drizzle", Icon: CloudDrizzle }
  if (code <= 69) return { desc: "Rain", Icon: CloudRain }
  if (code <= 79) return { desc: "Snow", Icon: CloudSnow }
  if (code <= 84) return { desc: "Rain showers", Icon: CloudRain }
  if (code <= 86) return { desc: "Snow showers", Icon: CloudSnow }
  if (code <= 99) return { desc: "Thunderstorm", Icon: CloudLightning }
  return { desc: "Unknown", Icon: Cloud }
}

type Weather = {
  temp: number
  windSpeed: number
  code: number
}

function HomePage() {
  const [weather, setWeather] = useState<Weather | null>(null)

  useEffect(() => {
    // winnipeg coordinates, no API key needed
    fetch("https://api.open-meteo.com/v1/forecast?latitude=49.8951&longitude=-97.1384&current=temperature_2m,weather_code,wind_speed_10m&timezone=America/Winnipeg")
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          windSpeed: Math.round(data.current.wind_speed_10m),
          code: data.current.weather_code,
        })
      })
      .catch(() => {})
  }, [])

  const weatherInfo = weather ? getWeatherInfo(weather.code) : null

  return (
    <div className="home-page">
      <div className="home-hero">
        <h2>Winnipeg Transit Tracker</h2>
        <p>Live bus tracking and trip planning powered by real city data</p>

        {weather && weatherInfo && (
          <div className="weather-bar">
            <weatherInfo.Icon size={20} />
            <span className="weather-temp">{weather.temp}°C</span>
            <span className="weather-desc">{weatherInfo.desc}</span>
            <Wind size={14} />
            <span>{weather.windSpeed} km/h</span>
          </div>
        )}
      </div>

      <div className="home-links">
        <Link to="/live-bus-tracker" className="card home-link-card">
          <Radio size={24} className="link-icon" />
          <div>
            <div className="link-text">Live Bus Tracker</div>
            <div className="link-desc">Real-time arrivals at any stop</div>
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
            <div className="link-desc">Plan your trip with transit data</div>
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
        <h3>
          <AlertTriangle size={16} />
          Service Advisories
        </h3>
        <ServiceAdvisoryBanner />
      </div>
    </div>
  )
}

export default HomePage
