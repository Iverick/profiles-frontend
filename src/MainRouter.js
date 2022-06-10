import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Profiles from './components/profiles/Profiles'
import SignIn from './components/session/SignIn'
import SignUp from './components/session/SignUp'
import User from './components/users/User'
import Users from './components/users/Users'

const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="*">404 not found!</Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element= {<Users />} />
        <Route path="/users/:userId" element={<User />} />
        <Route path="/profiles" element={<Profiles />} />
      </Routes>
    </div>
  )
}

export default MainRouter
