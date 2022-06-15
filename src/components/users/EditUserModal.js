import { useEffect, useState } from "react"
import { updateUserAPIData } from '../../services/user.service'
import SubmitRejectProfileButtons from '../partials/SubmitRejectProfileButtons'

export default function EditUserModal(props) {

  // States for form fields
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [admin, setAdmin] = useState(false)

  // States for checking the errors
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (props) {
      // Sets initial values for states
      setUserId(props.user.id)
      setEmail(props.user.email)
      setAdmin(props.user.admin)
    }
  }, [props])

  // Sets checked to the proper radio button based on the admin state
  const isAdmin = (value) => admin === value

  // Toggling the admin status change
  const handleAdminClick = (e) => {
    setAdmin(!!(e.target.value))
  }

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
    if (email === '' || password === '' || password === undefined) {
      setError(true)
    } else {
      const updatedData = { email, password, admin }
      updateUserAPIData(userId, updatedData).then((res) => {
        if (res.status === 200) {
          // On response success close the modal and reload the user page
          setPassword('')
          setSuccess(true)
          setTimeout(() => { window.location.reload(false) }, "1500")
          return
        }
        // Displays error is res wasn't successfull
        setError(true)
      })
    }
  }

  if (!props) return <div></div>

  return (
    <div className="modal fade" id="userBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <form>

            <div className="text-success" style={{ display: success ? '' : 'none'}}>
              User data was changed!
            </div>

              <div className="text-danger"
                style={{ display: error ? '' : 'none'}}>
                There were errors editing this user
              </div>

              {/* email field */}
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
              <div className="row justify-content-between">
                <div className="col-4">
                  <div className="form-check form-check-inline ms-5">
                    <label className="form-check-label" htmlFor="user-radio">
                      <span className="text-secondary">User</span>
                    </label>
                    <input 
                      className="form-check-input flex-shrink-0" 
                      type="radio" 
                      name="user-btn" 
                      id="user-radio" 
                      value="" 
                      checked={ isAdmin(false) }
                      onChange={ handleAdminClick } />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="admin-radio">
                      <span className="text-secondary">Admin</span>
                    </label>
                    <input 
                      className="form-check-input flex-shrink-0" 
                      type="radio" 
                      name="admin-btn" 
                      id="admin-radio" 
                      value="1"
                      checked={ isAdmin(true) } 
                      onChange={ handleAdminClick } />
                  </div>
                </div>
              </div>
              
              <SubmitRejectProfileButtons handleSubmit={handleSubmit} />

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}