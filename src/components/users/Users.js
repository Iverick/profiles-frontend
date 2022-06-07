import axios from 'axios'
import { React, useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import UserCard from './UserCard'

const API_URL = "http://localhost:3000/api/v1/"

function getUsersAPIData() {
  return axios.get(API_URL + "users").then((res) => res.data)
}

export default function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Connecting to API /users endpoint after the element was mounted
    let mounted = true;
    getUsersAPIData().then((data) => {
      if (mounted) {
        setUsers(data)
      }
    })
    return () => (mounted = false)
  }, [])

  return (
    <div>
      <h2 className="pb-2">Users:</h2>

      <div className="row g-2 py-3 row-cols-4">
        { users.map((user) => {
          return <UserCard user={user} key={user.id} />
        })}
      </div>  
    </div> 
  );
}
