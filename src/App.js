import { BrowserRouter } from 'react-router-dom'
import './App.css'
import MainRouter from './MainRouter'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <BrowserRouter>
      <div className="pt-3 px-5 bg-light bg-gradient">
        <header>
          <Navbar />
        </header>

        <div className="main container px-4 py-5">
          <MainRouter />
        </div>
      </div>
    </BrowserRouter>
  );
}
