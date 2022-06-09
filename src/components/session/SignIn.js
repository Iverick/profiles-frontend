import { React, useState } from 'react'

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="row text-center">
      <div className="col-4 offset-4">
      <main className="form-signin w-100 m-auto">
        <form>
          <h1 className="h3 mb-3 fw-normal">Sign In</h1>

          <div className="form-floating">
            <input 
              type="email" 
              className="form-control" 
              id="emailField"
              value={ email }
              onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="emailField">Email address</label>
          </div>

          <div className="form-floating">
            <input 
              type="password" 
              className="form-control" 
              id="passwordField" 
              value={ password }
              onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="passwordField">Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
      </main>
      </div>
    </div>
  )
}