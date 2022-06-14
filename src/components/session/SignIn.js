import { React, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../../slices/authSlice'

export default function SignIn() {

  let navigate = useNavigate()
  const dispatch = useDispatch()
  // States for form fields
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // States for checking the errors
  const [error, setError] = useState(false)

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  // Handling the submit button click
  const handleSubmit = (e) => {
    e.preventDefault()
    if (email === '' || password === '') {
      setError(true)
    } else {
      // Makes a call to API endpoint with the form data using authSlice function to log in user
      // and redirect to Dashboard page on success
      dispatch(login({ email, password }))
        .unwrap()
        .then(() => {
          return navigate("/")
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
            <h1 className="h2 mb-3 fw-normal">Sign In</h1>

            <div className="text-danger"
              style={{ display: error ? '' : 'none' }}>
              There were errors trying to log into your account
            </div>

            {/* email field */}
            <div className="form-floating my-4">
              <input
                type="email"
                className="form-control border-0"
                id="emailField"
                value={email}
                onChange={handleEmail} />
              <label htmlFor="emailField">Email address</label>
            </div>

            {/* password field */}
            <div className="form-floating my-4">
              <input
                type="password"
                className="form-control border-0"
                id="passwordField"
                value={password}
                onChange={handlePassword} />
              <label htmlFor="passwordField">Password</label>
            </div>

            <button onClick={handleSubmit} className="w-100 btn btn-lg btn-outline-secondary border-0" type="submit">
              Sign In
            </button>
          </form>
        </main>

        <div className="mt-3">
          <small >
            <Link to="/signup" className="text-muted text-decoration-none">Or click here to create an account</Link>
          </small>
        </div>
      </div>
    </div>
  )
}