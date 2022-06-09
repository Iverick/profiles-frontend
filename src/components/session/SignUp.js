import { React, useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import { register } from '../../services/auth.service'

export default function SignUp() {

  let navigate = useNavigate()
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
      register(username, email, password, admin).then((data) => {
        if (data.error) {
          setError(true)
        } else {
          return navigate("/signin")
        }
      })
    }
  }

  return (
    <div className="row text-center">
      <div className="col-4 offset-4">
      <main className="form-signin w-100 m-auto">
        <form>
          <h1 className="h3 mb-3 fw-normal">Create your account</h1>

          <div className="form-floating">
            <input 
              type="text" 
              className="form-control" 
              id="usernameField" 
              value={ username }
              onChange={ handleUsername } />
            <label htmlFor="usernameField">Username</label>
          </div>

          <div className="form-floating">
            <input 
              type="email" 
              className="form-control" 
              id="emailField"
              value={ email }
              onChange={ handleEmail } />
            <label htmlFor="emailField">Email address</label>
          </div>

          <div className="form-floating">
            <input 
              type="password" 
              className="form-control" 
              id="passwordField" 
              value={ password }
              onChange={ handlePassword } />
            <label htmlFor="passwordField">Password</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" checked={ admin } onChange={ handleAdmin } /> Admin
            </label>
          </div>

          {/* remove the following line after the component is finished */}
          { admin ? 'you are an admin' : 'not admin '}

          <button onClick={handleSubmit} className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
        </form>
      </main>
      </div>
    </div>
  )
}