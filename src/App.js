import './App.css'
import Navbar from './components/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import Users from './components/users/Users'

export default function App() {
  return (
    <div className="pt-3 px-5 bg-light bg-gradient">
      <header>
        <Navbar />
      </header>

      <div className="main container px-4 py-5">
        <Dashboard />
      </div>
    </div>
  );
}
