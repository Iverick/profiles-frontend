import { useEffect,useState } from "react"
import { useSelector } from 'react-redux'
import { postProfileAPIData } from'../../services/profile.service'
import SubmitRejectProfileButtons from '../partials/SubmitRejectProfileButtons'

// Return today's date
const setToday = () => {
  return new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]
}

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
      setUserId(props.userId)
    } else {
      setUserId(user.id)
    }
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
    console.log(state)
    e.preventDefault()
    if (state.name === '' || state.birthday === '' || state.gender === '' || state.city === '' || userId === null) {
      setError(true)
    } else {
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
            {/* TODO Create the form to handle Profile POST and PUT requests */}

            <div className="text-success" style={{ display: success ? '' : 'none'}}>
              Profile was created!
            </div>

            <div className="text-danger" style={{ display: error ? '' : 'none'}}>
              There were errors creating a profile
            </div>

            {/* name field */}
            <div className="form-floating my-4">
              <input
                type="text"
                name="name"
                className="form-control border-0"
                id="name-field"
                value={ state.name }
                onChange={ handleChange } />
              <label htmlFor="name-field">Name</label>
            </div>
            
            {/* birthday field */}
            <div className="form-floating my-4">
              <input
                type="date"
                name="birthday"
                className="form-control border-0"
                id="birthday-field"
                max={ setToday() }
                value={ state.birthday }
                onChange={ handleChange } />
              <label htmlFor="birthday-field">Birthday</label>
            </div>

            {/* radio buttons */}
            <div className="form-floating my-4">
            <div className="row justify-content-evenly">
              <small className="text-muted ms-4 mb-3">Gender</small>
              <div className="col-4">
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="male-radio">
                    <span className="text-secondary">Male</span>
                  </label>
                  <input
                    className="form-check-input flex-shrink-0"
                    type="radio"
                    name="gender"
                    id="male-radio"
                    value="male"
                    checked={ state.gender === 'male' }
                    onChange={ handleChange } />
                </div>
              </div>

              <div className="col-4">
                <div className="form-check form-check-inline ms-4">
                  <label className="form-check-label" htmlFor="female-radio">
                    <span className="text-secondary">Female</span>
                  </label>
                  <input
                    className="form-check-input flex-shrink-0"
                    type="radio"
                    name="gender"
                    id="female-radio"
                    value="female"
                    checked={ state.gender === 'female' }
                    onChange={ handleChange } />
                </div>
              </div>
            </div>
            </div>

            {/* city field */}
            <div className="form-floating my-4">
              <input
                type="text"
                name="city"
                className="form-control border-0"
                id="city-field"
                value={ state.city }
                onChange={ handleChange } />
              <label htmlFor="city-field">City</label>
            </div>

            {/* submit/reject buttons */}
            <SubmitRejectProfileButtons handleSubmit={ handleSubmit } />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}