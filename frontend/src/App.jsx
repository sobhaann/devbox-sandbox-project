import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/stats/')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => setStats(data))
      .catch((err) => setError(err.message))
  }, [])

  const time = stats
    ? new Date(stats.database_datetime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : '...'

  return (
    <main className="app">
      <div className="card">
        <p className="line">
          <span className="emoji">🕒</span>
          <span>{time}</span>
        </p>
        <p className="line">
          <span className="emoji">👀</span>
          <span>
            {stats ? stats.visit_count.toLocaleString() : '...'} visitors
          </span>
        </p>
        {error && <p className="error">⚠ {error}</p>}
      </div>
    </main>
  )
}

export default App
