import React from 'react'

function Post() {
  return (
    <div className="col-3">
    <div className="card mb-4 rounded-3 shadow-sm mx-3">
      <div className="card-body">
        <ul className="list-unstyled mt-1 mb-2 text-center">
          <li className="pb-2"><strong>Username</strong></li>
          <li className="py-2">user@email.com</li>
          <li className="pt-2">10 profiles</li>
        </ul>
      </div>   
    </div>
    </div>
  );
}

export default Post
