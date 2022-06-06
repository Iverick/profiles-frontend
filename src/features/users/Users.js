import React from 'react'
import User from './User'

function Posts() {
  return (
    <div>
      <h2 className="pb-2">Users:</h2>

      <div className="row g-2 py-3 row-cols-4">
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
      </div>  
    </div> 
  );
}

export default Posts
