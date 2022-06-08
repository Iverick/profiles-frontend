import axios from 'axios'
import { React, useEffect, useState } from 'react'
import UserCard from './UserCard'
import { API_URL } from '../../constants/app-constants'

const getUsersAPIData = async() => {
  return await axios.get(API_URL + "users").then((res) => res.data)
}

export default function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Connecting to API /users endpoint after the element was mounted
    getUsersAPIData().then((data) => {
      setUsers(data)
    })
  }, [])

  return (
    <div>
      <h2 className="pb-2">Users:</h2>

      <div className="row g-2 py-3 row-cols-4">
        { users.map((user) => {
          return <UserCard user={user}  key={user.id} />
        })}
      </div>  
    </div> 
  );
}
