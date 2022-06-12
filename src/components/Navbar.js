import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
      <a href="/" className="d-flex align-items-center text-dark text-decoration-none ms-3">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeeUl9IZDN97pBQNgeunx6dD1df-4g7vkPFw&usqp=CAU" alt="" className="rounded-circle border border-3 border-success me-2" width="45" height="45" />
        <span className="fs-4">Username</span>
      </a>

      <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        <Link className="me-3 py-2 text-dark text-decoration-none" to="/profiles">Profiles</Link>
        <Link className="me-3 py-2 text-dark text-decoration-none" to="/">Dashboard</Link>
        <Link className="me-3 py-2 text-dark text-decoration-none" to="/users">Users</Link>
        <div>
          <button type="button" className="btn ms-3 py-2 btn-outline-dark btn-sm text-decoration-none">Log out</button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar
