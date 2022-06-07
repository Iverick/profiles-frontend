import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Users from './components/users/Users'

const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={ <Dashboard /> } />
        <Route path="/users" element= { <Users /> } />
      </Routes>
    </div>
  )
}

export default MainRouter
