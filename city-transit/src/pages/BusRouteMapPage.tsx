/**
 * @author Jack Buchholzer
 * BusRouteMapPage -- browse all transit routes on the map
 *
 * Shows every route from the Winnipeg Transit API in a
 * scrollable panel with real colored badges. Click a route
 * to see its stops plotted on the leaflet map.
 */

import BusRouteMap from "../components/bus-route-map/BusRouteMap"

function BusRouteMapPage() {
  return (
    <div>
      <h2 className="page-title">Route Map</h2>
      <BusRouteMap />
    </div>
  )
}

export default BusRouteMapPage