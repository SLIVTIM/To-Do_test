import { useEffect, useState } from 'react'
import './TaskBoard.css'

const API = "https://us-central1-js04-b4877.cloudfunctions.net/tasks"

function TaskBoard({ onStatsChange }) {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(json => {
        setTasks(json.data || [])
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch tasks:", err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (onStatsChange) {
      onStatsChange({ total: tasks.length, done: tasks.filter(t => t.done).length })
    }
  }, [tasks])

  async function addTask() {
    const text = input.trim()
    if (!text) return
    try {
      const res = await fetch(`${API}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      const json = await res.json()
      setTasks(prev => [json.data || { id: Date.now(), text, create_time: new Date().toISOString(), done: false }, ...prev])
      setInput('')
    } catch (err) {
      console.error("Failed to add task:", err)
    }
  }

  async function deleteTask(id) {
    try {
      await fetch(`${API}/${id}`, { method: 'DELETE' })
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      console.error("Failed to delete task:", err)
    }
  }

  async function toggleDone(id) {
    const task = tasks.find(t => t.id === id)
    if (!task) return
    const endpoint = task.done ? 'uncheck' : 'check'
    try {
      await fetch(`${API}/${endpoint}/${id}`, { method: 'POST' })
      setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
    } catch (err) {
      console.error("Failed to toggle task:", err)
    }
  }

  function formatDate(raw) {
    if (!raw) return 'no date'
    const d = new Date(raw)
    if (isNaN(d)) return raw
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="taskboard-wrapper">

      <div className="add-form">
        <input
          type="text"
          maxLength={20}
          placeholder="new task (max 20 chars)"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Add Card</button>
      </div>

      <div className="task-list">
        {loading && <div className="loader" />}

        {!loading && tasks.length === 0 && (
          <p className="state-msg">no tasks yet. add one above!</p>
        )}

        {tasks.map(task => (
          <article key={task.id} className={`task-card ${task.done ? 'done' : ''}`}>

            <button className="icon-btn delete" onClick={() => deleteTask(task.id)} title="Delete">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
              </svg>
            </button>

            <div className="task-info">
              <div className="task-text">{task.text}</div>
              <div className="task-date">Date: {formatDate(task.create_time)}</div>
            </div>

            <button className="icon-btn check" onClick={() => toggleDone(task.id)} title="Mark done">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </button>

          </article>
        ))}
      </div>
    </div>
  )
}

export default TaskBoard