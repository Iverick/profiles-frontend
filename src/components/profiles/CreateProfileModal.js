import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { postProfileAPIData } from '../../services/profile.service'
import SubmitRejectProfileButtons from '../partials/SubmitRejectProfileButtons'
import CreateEditProfileFormFields from '../partials/CreateEditProfileFormFields'

export default function CreateProfileModal(props) {

  const { user } = useSelector((state) => state.auth)

  // States for form fields
  const [state, setState] = useState({
    name: '',
    birthday: '',
    gender: '',
    city: ''
  })
  // UserId state
  const [userId, setUserId] = useState(null)

  // States for checking the errors
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // If userId was provided in props set it.
    // Otherwise assign it to the id of authenticated user.
    if (props.userId) {
      setUserId(props.userId.userId)
    } else {
      setUserId(user.id)
    }
  }, [props, user.id])

  // Handles change of form fields values
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState({
      ...state,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (state.name === '' || state.birthday === '' || state.gender === '' || state.city === '' || userId === null) {
      setError(true)
    } else {
      // Make a call to POST API endpoint
      setError(false)
      setSuccess(false)
      const createdData = state
      createdData['user_id'] = userId
      postProfileAPIData(createdData).then((res) => {
        if (res.status === 201) {
          // On response successfully created close the modal and redirect to user page
          setSuccess(true)
          return
        }
        // Displays error is res wasn't successfull
        setError(true)
      })
    }
  }

  return (
    <div className="modal fade" id="create-profile-backdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="px-5">

              <div className="text-success" style={{ display: success ? '' : 'none' }}>
                Profile was created!
              </div>

              <div className="text-danger" style={{ display: error ? '' : 'none' }}>
                There were errors creating a profile
              </div>

              <CreateEditProfileFormFields values={state} handleChange={handleChange} />

              {/* submit/reject buttons */}
              <SubmitRejectProfileButtons handleSubmit={handleSubmit} />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}