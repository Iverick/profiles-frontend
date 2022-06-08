import axios from 'axios'
import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileCard from '../profiles/ProfileCard'

const API_URL = "http://localhost:3000/api/v1/"

const getUserAPIData = async(userId) => {
    // Connecting to API /users/:id endpoint after the element was mounted
  return await axios.get(API_URL + "users/" + userId).then((res) => res.data)
}

export default function User() {
  const userId = useParams()
  const [user, setUser] = useState([])
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    let mounted = true;

    getUserAPIData(userId.userId).then((data) => {
      if (mounted) {
        setUser(data)
        setProfiles(data.profiles)
      }
    })
    return () => (mounted = false)
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
          <i class="fa-solid fa-pencil"></i>
          <i class="fa-solid fa-trash-can"></i>
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