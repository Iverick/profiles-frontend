import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import User from './components/users/User'
import Users from './components/users/Users'
import SignIn from './components/session/SignIn'
import SignUp from './components/session/SignUp'

const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="*">404 not found!</Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element= {<Users />} />
        <Route path="/users/:userId" element={<User />} />
        
      </Routes>
    </div>
  )
}

export default MainRouter
