import './App.css'
import 'leaflet/dist/leaflet.css';
import AppRouter from './routers/routers'
import { GoogleMapsProvider } from './context/GoogleMapsContext';

function App() {
  return (
    <>
      <GoogleMapsProvider>
        <AppRouter />
      </GoogleMapsProvider>
    </>
  )
}

export default App
