import './App.css';
import Navbar from './features/Navbar'
import Posts from './features/posts/Posts'

function App() {
  return (
    <div className="container py-3">
      <header>
        <Navbar />
      </header>

      <div class="container px-4 py-5 bg-light bg-gradient">
        <Posts />
      </div>
    </div>
  );
}

export default App;
