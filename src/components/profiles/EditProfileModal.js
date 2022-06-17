import { useEffect, useState } from 'react'
import { updateProfileAPIData } from '../../services/profile.service'
import SubmitRejectProfileButtons from '../partials/ProfileModalButtons'
import ProfileFormFields from '../partials/ProfileFormFields'

export default function EditProfileModal(props) {

  const modalElementId = props.modalElementId.substring(1)

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
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [nameFieldError, setNameFieldError] = useState(false)
  const [birthdayFieldError, setBirthdayFieldError] = useState(false)
  const [genderFieldError, setGenderFieldError] = useState(false)
  const [cityFieldError, setCityFieldError] = useState(false)

  useEffect(() => {
    setState(props.profileData)
  }, [props])

  // Handles change of form fields values
  const handleChange = (e) => {
    const name = e.target.name
    setState({
      ...state,
      [name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setError(false)
    setSuccess(false)
    setNameFieldError(false)
    setGenderFieldError(false)
    setCityFieldError(false)
    setBirthdayFieldError(false)

    // setFormFieldsError(Object.keys(formFieldsError).forEach(v => formFieldsError[v] = false))

    // Validate fields and make a call to PUT API endpoint
    if (state.name === '') {
      // setFormFieldsError({...formFieldsError, name: true})
      setError(true)
      setNameFieldError(true)
    }
    else if (state.gender === '') {
      setError(true)
      setGenderFieldError(true)
    }
    else if (state.city === '') {
      setError(true)
      setCityFieldError(true)
    }
    else if (state.birthday === '' || state.birthday.length !== 10) {
      setError(true)
      setBirthdayFieldError(true)
    }
    else {
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
  }

  return (
    <div className="modal fade" id={modalElementId} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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

              <ProfileFormFields 
                values={state} 
                handleChange={handleChange} 
                nameFieldError={nameFieldError}
                birthdayFieldError={birthdayFieldError}
                genderFieldError={genderFieldError}
                cityFieldError={cityFieldError} />

              {/* submit/reject buttons */}
              <SubmitRejectProfileButtons handleSubmit={handleSubmit} />

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}