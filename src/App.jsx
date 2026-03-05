import { useState } from 'react'
import Header from './components/Header/Header'
import TaskBoard from './components/TaskBoard/TaskBoard'
import './App.css'

function App() {
  const [stats, setStats] = useState({ total: 0, done: 0 })

  return (
    <main>
      <Header total={stats.total} done={stats.done} />
      <TaskBoard onStatsChange={setStats} />
    </main>
  )
}

export default App
