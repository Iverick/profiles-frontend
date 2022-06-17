import { React, useEffect, useState } from 'react'
import UserCard from './UserCard'
import { getUsersAPIData } from '../../services/user.service'
import Spinner from '../Spinner'

export default function Users() {
  const [users, setUsers] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    // Connecting to API /users endpoint after the element was mounted
    getUsersAPIData().then((data) => {
      setUsers(data)
      setIsLoading(false)
    })
  }, [])

  

  const renderUsers = (
    <div>
      <h2 className="pb-2">Users:</h2>

      <div className="row g-2 py-3 row-cols-4">
        { users.map((user, i) => {
          return <UserCard user={user}  key={i} />
        })}
      </div>  
    </div> 
  )

  return (
    <div>
      {isLoading ? <Spinner /> : renderUsers}
    </div>
  )
}
