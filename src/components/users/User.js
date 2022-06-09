import axios from 'axios'
import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileCard from '../profiles/ProfileCard'
import { API_URL } from '../../constants/app-constants'

// Connecting to API /users/:id endpoint after the element was mounted
const getUserAPIData = async(userId) => {
  return await axios.get(API_URL + "users/" + userId).then((res) => res.data)
}

const handleEditClick = () => {
  console.log("edit icon was clicked!")
}

const handleDeleteClick = () => {
  console.log("delete icon was clicked!")
}

export default function User() {
  const userId = useParams()
  const [user, setUser] = useState([])
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    getUserAPIData(userId.userId).then((data) => {
      setUser(data)
      setProfiles(data.profiles)
    })
  }, [userId])

  // Sets userStatus to admin to user based on state data
  let userStatus
  if (user.admin) {
    userStatus = 'admin'
  } else {
    userStatus = 'user'
  }

  return (
    <div>
      <div className="text-center">
        <p className="fs-3">{ user.username }</p>
        <p className="fs-4">{ user.email }</p>
        <p className="fs-5">{ userStatus }</p>
        <div>
          <i className="fa-solid fa-pencil" onClick={ handleEditClick }></i>
          <i className="fa-solid fa-trash-can" onClick={ handleDeleteClick }></i>
        </div>
      </div>

      <h2 className="pb-2">Profiles:</h2>

      <div className="row gx-5 py-3">
        { profiles.map((profile, i) => {
          return <ProfileCard profile={profile} key={i} />
        })}
      </div>
    </div>
  );
}