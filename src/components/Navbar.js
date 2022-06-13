import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../slices/authSlice'

export default function Navbar() {

  const dispatch = useDispatch()
  let navigate = useNavigate()
  // Importing states from redux
  const { user, loggedIn, isAdmin } = useSelector((state) => state.auth)
  
  // Changing color of the userpick based on the value of showIsAdmin state
  let userpickImgClasses = ["rounded-circle", "me-2", "border", "border-4"]

  if (isAdmin) {
    userpickImgClasses.push("border-success")
  } else {
    userpickImgClasses.push("border-muted")
  }

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
        {/* Userpick image */}
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeeUl9IZDN97pBQNgeunx6dD1df-4g7vkPFw&usqp=CAU" 
          alt="" 
          className={ userpickImgClasses.join(" ") } 
          width="45" 
          height="45" />
        <span className="fs-4">{ user ? user.username : 'username' }</span>
      </a>

      <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        <Link className="me-3 py-2 text-dark text-decoration-none" to="/">Dashboard</Link>
        <Link className="me-3 py-2 text-dark text-decoration-none" to="/profiles">Profiles</Link>
        <Link className="me-3 py-2 text-dark text-decoration-none" to="/users">Users</Link>
        <div>
          <button onClick={ handleLogout } type="button" className="btn ms-3 py-2 btn-outline-muted text-decoration-none">
            <span className="text-sm">Log out</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
