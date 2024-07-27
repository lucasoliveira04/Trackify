import './App.css'
import 'leaflet/dist/leaflet.css';
import AppRouter from './routers/routers'
import AppProviders from './util/contexts';

function App() {
  return (
    <>
      <AppProviders>
        <AppRouter />
      </AppProviders>   
    </>
  )
}

export default App
