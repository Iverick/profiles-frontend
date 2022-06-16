import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../slices/authSlice'
import { destroyProfileAPI } from '../../services/user.service'
import SubmitRejectProfileButtons from '../partials/SubmitRejectProfileButtons'

export default function DeleteUserModal(props) {

  const { user } = useSelector((state) => state.auth)
  const userId = props.userId.userId

  // States for checking the errors
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  let navigate = useNavigate()
  const dispatch = useDispatch()

  const handleCloseModal = (e) => {
    document.getElementById('close-modal').click()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(false)
    setError(false)

    destroyProfileAPI(userId).then((res) => {
      // Makes a call to API endpoint. Then it checks whether user is removing his own account (userId == user.id)
      // and logs user out and redirect to login page in that case, or redirects back to "/users" page otherwise.
      // Displays error is response wasn't successfull.
      if (res.status === 204) {
        setSuccess(true)

        if (userId == user.id) {
          setTimeout(() => {
            dispatch(logout())
              .unwrap()
              .then(() => {
                return navigate("/signin")
              })
          }, "1000")
        } else {
          setTimeout(() => {
            navigate("/users")
          }, "1500")
        }
      } else {
        // Display error with request wasn't successfull
        setError(true)
        console.log(res)
      }
    })


  }

  return (
    <div className="modal fade" id="delete-user" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">

            <div className="text-success" style={{ display: success ? '' : 'none' }}>
              User account was deleted!
            </div>

            <div className="text-danger"
              style={{ display: error ? '' : 'none' }}>
              There were errors deleting this user
            </div>

            <div className="text-center my-4">Do you really want to remove this user?</div>

            <SubmitRejectProfileButtons handleSubmit={handleSubmit} handleCloseModal={handleCloseModal} />
          </div>
        </div>
      </div>
    </div>
  )
}