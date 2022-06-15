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
    updateProfileAPIData(state).then((res) => {
      console.log(res)
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

              {/* <CreateEditProfileFormFields values={state} handleChange={handleChange} /> */}

              {/* name field */}
              <div className="form-floating my-4">
                <input
                  type="text"
                  name="name"
                  className="form-control border-0"
                  id="name-field"
                  value={state.name}
                  onChange={handleChange} />
                <label htmlFor="name-field">Name</label>
              </div>

              {/* birthday field */}
              <div className="form-floating my-4">
                <input
                  type="date"
                  name="birthday"
                  className="form-control border-0"
                  id="birthday-field"
                  max={setToday()}
                  value={state.birthday}
                  onChange={handleChange} />
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
                        checked={state.gender === 'male'}
                        onChange={handleChange} />
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
                        checked={state.gender === 'female'}
                        onChange={handleChange} />
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
                  value={state.city}
                  onChange={handleChange} />
                <label htmlFor="city-field">City</label>
              </div>

              {/* submit/reject buttons */}
              <SubmitRejectProfileButtons handleSubmit={handleSubmit} />

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}