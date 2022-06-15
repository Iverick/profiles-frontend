import { useEffect, useState } from 'react'
import { updateProfileAPIData } from '../../services/profile.service'
import SubmitRejectProfileButtons from '../partials/SubmitRejectProfileButtons'
import CreateEditProfileFormFields from '../partials/CreateEditProfileFormFields'

// Return today's date
const setToday = () => {
  return new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]
}

export default function EditProfileModal(props) {

  // console.log(props)

  // States for form fields
  const [state, setState] = useState({
    id: '',
    user_id: '',
    name: '',
    birthday: '',
    gender: '',
    city: ''
  })

  // States for checking the errors
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)


  useEffect(() => {
    setState(props.profileData)
  }, [props])

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
    
    setError(false)
    setSuccess(false)
    // Make a call to PUT API endpoint
    updateProfileAPIData(state).then((res) => {
      if (res.status === 200) {
        // On response successfully created display success message and reload profiles page
        setSuccess(true)
        setTimeout(() => { window.location.reload(false) }, "1500")
        return
      }
      // Displays error is res wasn't successfull
      setError(true)
    })
  }

  return (
    <div className="modal fade" id="edit-profile-backdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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