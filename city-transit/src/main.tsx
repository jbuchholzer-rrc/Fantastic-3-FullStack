import 'leaflet/dist/leaflet.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './App.css'
import App from './App.tsx'
import { StopsProvider } from './context/StopsContext.tsx'
import { BusProvider } from './context/BusContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StopsProvider>
        <BusProvider>
          <App />
        </BusProvider>
      </StopsProvider>
    </BrowserRouter>
  </StrictMode>,
)
