import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import User from './components/users/User'
import Users from './components/users/Users'


const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="users" element= {<Users />} />
        <Route path="users/:userId" element={<User />} />
      </Routes>
    </div>
  )
}

export default MainRouter
