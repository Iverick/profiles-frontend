import React from 'react'
import UserCard from './UserCard'

function Users(props) {
  return (
    <div>
      <h2 className="pb-2">Users:</h2>

      <div className="row g-2 py-3 row-cols-4">
        { props.users.map((user) => {
          return <UserCard user={user} key={user.id} />
        })}
      </div>  
    </div> 
  );
}

export default Users
