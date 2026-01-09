/**
 * @author Jack Buchholzer
 * @date Jan 9 2026
 * @Description Basic Component: Trip planner for Transit WebApp
 */



function TripPlanner() {
  return (
    <div>
      {/* Header/Title */}
      <h2>Trip Planner</h2>

      {/* From Option */}
      <select>
        <option>From</option>
        <option>Portage & Main</option>
        <option>The Forks</option>
        <option>Polo Park</option>
        <option>St Vital Centre</option>
        <option>U of M</option>
        <option>Osborne Village</option>
        <option>HSC</option>
        <option>Kildonan Place</option>
      </select>

      {/* To Option */}
      <select>
        <option>To</option> 
        <option>Portage & Main</option>
        <option>The Forks</option>
        <option>Polo Park</option>
        <option>St Vital Centre</option>
        <option>U of M</option>
        <option>Osborne Village</option>
        <option>HSC</option>
        <option>Kildonan Place</option>
      </select>

      {/* Routes */}
      <h3>Route Options</h3> 
      <ul>
        <li>Blue Line - 18 min</li>
        <li>Route 60 - 25 min</li>
        <li>Route 16 - 32 min</li>
        <li>RRC Polytech - 3000000 min</li>
      </ul>

      {/* Mock Button */}
      <button>Plan Trip</button>  
    </div>
  )
}

export default TripPlanner
