import './App.css'
import { Routes, Route } from 'react-router-dom'
import { BusProvider } from './context/BusContext'
import Nav from './components/live-bus-tracker/nav/nav'
import LiveBusTrackerPage from './pages/liveBusTrackerPage'
import FavoritesPage from './pages/FavoritesPage'

function App() {
  return (
    <BusProvider>
      <header>
        <h1>Winnipeg Transit Tracker</h1>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<div><h2>Home</h2><p>Welcome to the Winnipeg Transit Tracker app.</p></div>} />
          <Route path="/live-bus-tracker" element={<LiveBusTrackerPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
      <footer>
        <p>Team Members: Harsh Pandya, Khush Patel, Jack Buchholzer</p>
      </footer>
    </BusProvider>
  )
}

export default App