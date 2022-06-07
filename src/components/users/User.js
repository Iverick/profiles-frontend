import axios from 'axios'
import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileCard from '../profiles/ProfileCard'

const API_URL = "http://localhost:3000/api/v1/"

function getUserAPIData(userId) {
    // Connecting to API /users/:id endpoint after the element was mounted
  return axios.get(API_URL + "users/" + userId).then((res) => res.data)
}

export default function User() {
  const userId = useParams()
  const [user, setUser] = useState([])

  useEffect(() => {
    let mounted = true;

    getUserAPIData(userId.userId).then((data) => {
      if (mounted) {
        setUser(data)
      }
    })
    return () => (mounted = false)
  }, [userId])

  return (
    <div>
      <h2 className="pb-2">Profiles:</h2>

      <div className="row gx-5 py-3">
        {/*  
        { user.profiles.map((profile, i) => {
          return <ProfileCard profile={profile} key={i} />
        })}
        */}
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />

      </div>
    </div>
  );
}