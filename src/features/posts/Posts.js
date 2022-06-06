import React from 'react'
import Post from './Post'

function Posts() {
  return (
    <div>
      <h2 className="pb-2">Users:</h2>

      <div className="row g-4 py-3 row-cols-5">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>  
    </div> 
  );
}

export default Posts
