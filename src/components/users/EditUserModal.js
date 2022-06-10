import { useEffect, useState } from "react"
import { useNavigate  } from 'react-router-dom'
import { updateUserAPIData } from '../../services/user.service'

export default function EditUserModal(props) {

  let navigate = useNavigate()
  // States for form fields
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [admin, setAdmin] = useState(false)

  // States for checking the errors
  const [error, setError] = useState(false)

  useEffect(() => {
    if (props) {
      // Sets initial values for states
      setUserId(props.user.id)
      setEmail(props.user.email)
      setAdmin(props.user.admin)
    }
  }, [props])

  // Checks the proper radio button based on the admin state
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
          // On response success close the modal and redirect back to user page
          setPassword('')
          setError(false)
          document.getElementById('close-modal').click()
          return navigate("/users/" + userId)
        }
        // Displays error is res wasn't successfull
        setError(true)
      })
    }
  }

  if (!props) return <div></div>

  return (
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <form>

              <div className="text-danger"
                style={{ display: error ? '' : 'none'}}>
                There were errors editing this user
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
              <div class="row justify-content-between">
                <div class="col-4">
                  <div class="form-check form-check-inline ms-5">
                    <label class="form-check-label" for="user-radio">User</label>
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

                <div class="col-4">
                  <div class="form-check form-check-inline">
                    <label class="form-check-label" for="admin-radio">Admin</label>
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
              
              {/* submit/reject buttons */}
              <div className="text-center mt-4">
                <button type="button" className="btn btn-light border-0 mx-4 px-4" onClick={ handleSubmit }>
                  <i className="fa-solid fa-check"></i>
                </button>
                <button type="button" 
                        id="close-modal"
                        className="btn btn-light border-0 mx-4 px-4" 
                        data-bs-dismiss="modal">
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