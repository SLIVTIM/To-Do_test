import './App.css'
import { useState } from 'react'
import Header from './components/header/Header'
import TaskCard from './components/task-card/TaskCard'
import CardEdit from './components/card-edit/CardEdit'

function App() {


  return (
    <>
      <Header />
      <div className='card-management'>
          <TaskCard />
          <CardEdit />
      </div>

    </>
  )
}

export default App
