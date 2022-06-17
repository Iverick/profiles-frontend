import { useEffect, useState } from "react"
import EditProfileModal from './EditProfileModal'
import { destroyProfileAPI } from '../../services/profile.service'
import { changeInputBirthdayFormat } from '../../helpers/helpers'

export default function ProfileCard(props) {
  // States for form fields
  const [profile, setProfile] = useState([])

  // Sets unique ID for EditProfile modal of every card
  const modalElementId = `#edit-profile-${profile.id}`

  useEffect(() => {
    // Sets initial states based on props
    setProfile(props.profile)
  }, [props])

  // Make a call to API endpoint to remove a profile with the specified ID
  // Reloads page on success
  const handleDelete = () => {
    const profileId = profile.id

    destroyProfileAPI(profileId).then((res) => {
      if (res.status === 204) {
        window.location.reload(false)
      } else {
        console.log(res)
      }
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
            <button type="button"
                    className="btn btn-sm w-100 p-2"
                    data-bs-toggle="modal"
                    data-bs-target={modalElementId}>
              <span className="text-black-50 me-2">edit</span>
              <i className="fa-solid fa-pencil text-black-50"></i>
            </button>
          </div>
          <div className="text-center flex-fill btn-outline-danger rounded-0 rounded-end border-0">
            <button className="btn btn-sm w-100 p-2" onClick={handleDelete}>
              <span className="text-black-50 me-2">delete</span>
              <i className="fa-solid fa-trash-can text-black-50"></i>
            </button>
          </div>
        </div>
      </div>

      <EditProfileModal profileData={profile} modalElementId={modalElementId} />
    </div>
  )
}