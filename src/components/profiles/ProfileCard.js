import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import EditProfileModal from './EditProfileModal'
import SubmitRejectProfileButtons from '../partials/SubmitRejectProfileButtons'
import { updateProfileAPIData } from '../../services/profile.service'

// Return today's date
const setToday = () => {
  return new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]
}

// Changes input date format
const changeInputBirthdayFormat = (date) => {
  const [year, month, day] = date.split('-')
  const birthday = [day, month, year].join('.')
  return birthday
}

export default function ProfileCard(props, key) {

  const { isAdmin } = useSelector((state) => state.auth)

  // States for form fields
  const [profile, setProfile] = useState('')

  // States for checking the errors
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // Sets initial states based on props
    setProfile(props.profile)
  }, [props])

  // Handles change of form fields values
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setProfile({
      ...profile,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfileAPIData(profile).then((res) => {
      console.log(res)
    })

  }

  return (
    <div className="col-3">
      <div className="card mb-5 rounded-5 shadow-sm mx-3">

        {/* Card body */}
        <div className="card-body">
          <ul className="list-unstyled mt-1 mb-2 text-center">
            <li className="pb-2 fs-4">{profile.name}</li>
            <li className="py-2">{profile.gender}</li>
            <li className="py-2">{changeInputBirthdayFormat(props.profile.birthday)}</li>
            <li className="pt-2">{profile.city}</li>
          </ul>
        </div>

        {/* Footer buttons */}

        <div className="d-flex">
          <div className="text-center flex-fill btn-outline-primary rounded-0 rounded-start border-0">
            <button type="button" className="btn btn-sm w-100 p-2" data-bs-toggle="modal" data-bs-target="#edit-profile-backdrop">
              <span className="text-black-50 me-2">edit</span>
              <i className="fa-solid fa-pencil text-black-50"></i>
            </button>
          </div>
          <div className="text-center flex-fill btn-outline-danger rounded-0 rounded-end border-0">
            <button className="btn btn-sm w-100 p-2">
              <span className="text-black-50 me-2">delete</span>
              <i className="fa-solid fa-trash-can text-black-50"></i>
            </button>
          </div>
        </div>


        {/* <EditProfileModal profileData={profile} key={this} /> */}
      </div>


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
                    value={profile.name}
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
                    value={profile.birthday}
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
                          checked={profile.gender === 'male'}
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
                          checked={profile.gender === 'female'}
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
                    value={profile.city}
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
    </div>
  )
}