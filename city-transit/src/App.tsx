import './App.css'
import LiveBusTracker from './components/live-bus-tracker/LiveBusTracker'

function App() {
  return (
    <>
      <header>
        <h1>Winnipeg Transit Tracker</h1>
      </header>
      <main>
        <LiveBusTracker />
      </main>
      <footer>
        <p>Team Members: Harsh Pandya, Khush Patel, Jack Buchholzer</p>
      </footer>
    </>
  )
}

export default App
