import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { logout } from '../../slices/authSlice'
import { destroyProfileAPI } from '../../services/user.service'

export default function DeleteUserModal(props) {

  const { user } = useSelector((state) => state.auth)
  const userId = props.userId.userId

  // States for checking the errors
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  let navigate = useNavigate()
  const dispatch = useDispatch()

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

        if (Number(userId) === user.id) {
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
    <Modal
      show={props.showDeleteUser}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="mx-5">
        <div className="text-success" style={{ display: success ? '' : 'none' }}>
          User account was deleted!
        </div>

        <div className="text-danger"
          style={{ display: error ? '' : 'none' }}>
          There were errors deleting this user
        </div>

        <div className="text-center my-4">Do you really want to remove this user?</div>

        <div className="mt-4 text-center">
          <Button variant="btn btn-light" className="border-0 mx-4 px-4" onClick={handleSubmit}>
            <i className="fa-solid fa-check"></i>
          </Button>
          <Button variant="btn btn-light" className="border-0 mx-4 px-4" id="close-modal" onClick={props.onHide}>
            <i className="fa-solid fa-xmark"></i>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}