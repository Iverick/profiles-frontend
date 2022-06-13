import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../slices/authSlice'

function Navbar() {

  let navigate = useNavigate()
  const dispatch = useDispatch()

  // Handles Logout button click
  const handleLogout = (e) => {
    e.preventDefault()

    dispatch(logout())
      .unwrap()
      .then(() => {
        return navigate("/signin")
      })
  }

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
          <button onClick={ handleLogout } type="button" className="btn ms-3 py-2 btn-outline-muted btn-sm text-decoration-none">
            Log out
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar
