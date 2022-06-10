import { React, useEffect, useState } from 'react'
import UserCard from './UserCard'
import { getUsersAPIData } from '../../services/user.service'

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
