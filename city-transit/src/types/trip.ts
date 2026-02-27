/**
 * Trip type definition
 * Represents a single transit trip in the Winnipeg Transit system
 */
type Trip = {
  id: number
  from: string
  to: string
  route: string
  departureTime: string
  arrivalTime: string
  duration: number // minutes
  fare: number
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
}

export default Trip
