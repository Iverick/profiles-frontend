import './App.css';
import Navbar from './features/Navbar'
import Users from './features/users/Users'

function App() {
  return (
    <div className="pt-3 px-5">
      <header>
        <Navbar />
      </header>

      <div className="main container px-4 py-5 bg-light bg-gradient">
        <Users />
      </div>
    </div>
  );
}

export default App
