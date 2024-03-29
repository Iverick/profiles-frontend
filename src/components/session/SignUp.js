import { React, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../../slices/authSlice'

export default function SignUp() {

  let navigate = useNavigate()
  const dispatch = useDispatch()
  // States for form fields
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [admin, setAdmin] = useState(false)

  // States for checking the errors
  const [error, setError] = useState(false)

  // Handling the name change
  const handleUsername = (e) => {
    setUsername(e.target.value)
  }
 
  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
 
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  // Handling the admin change
  const handleAdmin = () => {
    setAdmin(!admin)
  }

  // Handling the submit button click
  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === '' || email === '' || password === '') {
      setError(true)
    } else {
      // Make a call to API endpoint with the form data using authSlice function and redirect
      // to SignIn page on success
      dispatch(register({ username, email, password, admin }))
        .unwrap()
        .then(() => {
          return navigate("/signin")
        })
        .catch(() => {
          setError(true)
        })
    }
  }

  return (
    <div className="row text-center">
      <div className="col-4 offset-4">
        <main className="form-signin w-100 m-auto">
          <form>
            <h1 className="h2 mb-3 fw-normal">Create your account</h1>

            <div className="text-danger"
                style={{ display: error ? '' : 'none'}}>
              There were errors while registering your account
            </div>

            <div className="form-floating my-4">
              <input
                type="text"
                className="form-control border-0"
                id="usernameField"
                value={ username }
                onChange={ handleUsername } />
              <label htmlFor="usernameField">Username</label>
            </div>

            <div className="form-floating my-4">
              <input
                type="email"
                className="form-control border-0"
                id="emailField"
                value={ email }
                onChange={ handleEmail } />
              <label htmlFor="emailField">Email address</label>
            </div>

            <div className="form-floating my-4">
              <input
                type="password"
                className="form-control border-0"
                id="passwordField"
                value={ password }
                onChange={ handlePassword } />
              <label htmlFor="passwordField">Password</label>
            </div>

            <div className="checkbox my-4">
              <label>
                <input type="checkbox" checked={ admin } onChange={ handleAdmin } /> 
                <span className="text-muted ms-2">Admin</span>
              </label>
            </div>

            <button onClick={ handleSubmit } className="w-100 btn btn-lg btn-outline-secondary border-0" type="submit">
              Sign Up
            </button>
          </form>
        </main>

        <div className="mt-3">
          <small >
            <Link to="/signin" className="text-muted text-decoration-none">Or click here to login</Link>
          </small>
        </div>
      </div>
    </div>
  )
}