import React from 'react'

function User(props) {
  let profiles_count = props.user.profiles_count || 0

  return (
    <div className="col-3">
      <div className="card mb-4 rounded-3 shadow-sm mx-3">
        <div className="card-body">
          <ul className="list-unstyled mt-1 mb-2 text-center">
            <li className="pb-2"><strong>{ props.user.username }</strong></li>
            <li className="py-2">{ props.user.email }</li>
            <li className="pt-2">{ profiles_count } profiles</li>
          </ul>
        </div>   
      </div>
    </div>
  );
}

export default User
