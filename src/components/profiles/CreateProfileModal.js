import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import SubmitRejectButtons from '../partials/SubmitRejectButtons'

export default function CreateProfileModal() {

  const { user } = useSelector((state) => state.auth)

  const [state, setState] = useState({
    name: '',
    birthday: '',
    gender: '',
    city: ''
  })

  // Handles change of form fields values
  const handleChange = e => {
    const name = e.target.name
    const value = e.target.value
    console.log(name)
    setState({
      ...state,
      [name]: value
    })
    console.log(state)
    console.log(user.id)
  }

  const handleSubmit = (e) => {
    console.log(state)
  }

  return (
    <div className="modal fade" id="create-profile-backdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="px-5">
            {/* TODO Create the form to handle Profile POST and PUT requests */}

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

            {/* radio buttons */}
            <div className="row justify-content-evenly">
              <small className="text-muted ms-4 mb-2">Gender</small>
              <div className="col-4">
                <div className="form-check form-check-inline">
                  <label className="form-check-label" htmlFor="male-radio">
                    <span className="text-secondary">User</span>
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
            <SubmitRejectButtons handleSubmit={handleSubmit} />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}