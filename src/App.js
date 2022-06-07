import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Users from './components/users/Users'

const API_URL = "http://localhost:3000/api/v01/"

function getUsersAPIData() {
  return axios.get(API_URL + "users").then((res) => res.data)
}

export default function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Connecting to API /users endpoint after the element was mounted
    let mounted = true;
    getUsersAPIData().then((items) => {
      if (mounted) {
        setUsers(items)
      }
    })
    return () => (mounted = false)
  }, [])

  return (
    <div className="pt-3 px-5 bg-light bg-gradient">
      <header>
        <Navbar />
      </header>

      <div className="main container px-4 py-5">
        <Users users={users} />
      </div>
    </div>
  );
}
