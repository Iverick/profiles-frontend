import React from 'react'

function Post() {
  return (
    <div className="card mb-4 rounded-3 shadow-sm mx-3">
      <div className="card-body">
        <ul className="list-unstyled mt-1 mb-2 text-center">
          <li className="pb-2"><strong>Username</strong></li>
          <li className="py-2">user@email.com</li>
          <li className="pt-2">10 profiles</li>
        </ul>
      </div>   
    </div>

    /*
    <div class="col d-flex align-items-center border rounded mx-4 py-4">
      <div class="text-center">
        <p>Username</p>
        <p>user@email.com</p>
        <p>10 profiles</p>
      </div>
    </div>
    */
  );
}

export default Post
