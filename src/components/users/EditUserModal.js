import { useEffect, useState } from "react"

export default function EditUserModal(props) {
  // States for form fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [admin, setAdmin] = useState(false)

  // States for checking the errors
  const [error, setError] = useState(false)

  useEffect(() => {
    if (props) {
      setEmail(props.user.email)
      setPassword(props.user.password)
      setAdmin(props.user.admin)
    }
  }, [props])

  const isAdmin = (value) => admin === value

  const handleAdminClick = (e) => {
    setAdmin(!!(e.target.value))
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email === '' || password === '') {
      setError(true)
    } else {
      console.log(email)
      console.log(password)
      console.log(admin)
        // console.log(data)
        

    }
  }

  if (!props) return <div></div>

  return (
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <form>
              <div className="form-floating my-4">
                <input 
                  type="email" 
                  className="form-control border-0" 
                  id="emailField"
                  value={ email }
                  onChange={ handleEmail } />
                <label htmlFor="emailField">Email address</label>
              </div>

              {/* password field */}
              <div className="form-floating my-4">
                <input 
                  type="password" 
                  className="form-control border-0" 
                  id="passwordField" 
                  value={ password }
                  onChange={ handlePassword } />
                <label htmlFor="passwordField">Password</label>
              </div>
              
              {/* radio buttons */}
              <div className="list-group mx-0 w-auto">
                <label className="list-group-item d-flex gap-2">
                  <input 
                    className="form-check-input flex-shrink-0" 
                    type="radio" 
                    name="user-btn" 
                    id="listGroupRadios1" 
                    value="" 
                    checked={ isAdmin(false) }
                    onChange={ handleAdminClick } />
                  <span className="text-sm text-muted">
                    User
                  </span>
                </label>
                <label className="list-group-item d-flex gap-2">
                  <input 
                    className="form-check-input flex-shrink-0" 
                    type="radio" 
                    name="admin-btn" 
                    id="listGroupRadios2" 
                    value="1"
                    checked={ isAdmin(true) } 
                    onChange={ handleAdminClick } />
                  <span className="text-sm text-muted">
                    Admin
                  </span>
                </label>
              </div> 
              
              {/* submit/reject buttons */}
              <div className="text-center mt-4">
                <button type="button" className="btn btn-secondary border-0 mx-2 px-4" onClick={ handleSubmit }>
                  <i className="fa-solid fa-check"></i>
                </button>
                <button type="button" className="btn btn-secondary border-0 mx-2 px-4" data-bs-dismiss="modal">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}