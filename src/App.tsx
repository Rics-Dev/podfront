import { useState } from 'react'
import './App.css'
import PodcastList from './components/PodcastList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <header>
        <h1>PodBack</h1>
        <p>Your favorite podcast platform</p>
      </header>
      
      <main>
        <PodcastList />
      </main>
      
      <footer>
        <p>© {new Date().getFullYear()} PodBack - Built with Bun, Hono, React and ❤️</p>
      </footer>
    </div>
  )
}

export default App
