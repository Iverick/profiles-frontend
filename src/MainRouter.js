import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Dashboard from './components/dashboard/Dashboard'
import Profiles from './components/profiles/Profiles'
import SignIn from './components/session/SignIn'
import SignUp from './components/session/SignUp'
import User from './components/users/User'
import Users from './components/users/Users'

const MainRouter = () => {

  const { loggedIn } = useSelector((state) => state.auth)

  return (
    <div>
    { loggedIn ? (
      <Routes>
        <Route path="*" element= { <Navigate from="*" to="/" exact /> } />
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element= {<Users />} />
        <Route path="/users/:userId" element={<User />} />
        <Route path="/profiles" element={<Profiles />} />
      </Routes>
    ) : (
      <Routes>
        <Route path="*" element= { <Navigate from="/" to="/signin" exact /> } />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      )
    }
    </div>
  )
}

export default MainRouter
