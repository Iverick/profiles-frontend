import { useEffect, useState } from "react"

// Changes input date format
const changeInputBirthdayFormat = (date) => {
  const [year, month, day] = date.split('-')
  const birthday = [day, month, year].join('.')
  return birthday
}

export default function ProfileCard(props) {

  // States for form fields
  const [userId, setUserId] = useState('')
  const [profileId, setProfileId] = useState('')
  const [profileName, setProfileName] = useState('')
  const [profileGender, setProfileGender] = useState('')
  const [profileBirthday, setProfileBirthday] = useState('')
  const [profileCity, setProfileCity] = useState('')

  useEffect(() => {
    // Sets initial states based on props
    setUserId(props.profile.user_id)
    setProfileId(props.profile.id)
    setProfileName(props.profile.name)
    setProfileGender(props.profile.gender)
    setProfileBirthday(changeInputBirthdayFormat(props.profile.birthday))
    setProfileCity(props.profile.city)
  }, [])

  return (
    <div className="col-3">
      <div className="card mb-5 rounded-5 shadow-sm mx-3">

        {/* Card body */}
        <div className="card-body">
          <ul className="list-unstyled mt-1 mb-2 text-center">
            <li className="pb-2 fs-4">{ profileName }</li>
            <li className="py-2">{ profileGender }</li>
            <li className="py-2">{ profileBirthday }</li>
            <li className="pt-2">{ profileCity }</li>
          </ul>
        </div> 
        
        {/* Footer buttons */}
        <div className="d-flex">
          <div className="text-center flex-fill btn-outline-primary rounded-0 rounded-start border-0">
            <button type="button" className="btn btn-sm w-100 p-2" data-bs-toggle="modal" data-bs-target="#profileBackdrop">
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
 
      </div>
    </div>    
  )
}