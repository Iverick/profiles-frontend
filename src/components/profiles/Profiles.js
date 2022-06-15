import { React, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getProfilesAPIData } from'../../services/profile.service'
import { getUserAPIData } from '../../services/user.service'
import ProfileCard from './ProfileCard'
import CreateProfileModal from './CreateProfileModal'
import AddProfileIconCard from './AddProfileIconCard'

export default function Profiles() {

  const { user } = useSelector((state) => state.auth)

  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    // Connecting to API /user/:user_id endpoint after the element was mounted and adds to the 
    // app's state list of profiles for the authenticated user
    getUserAPIData(user.id).then((data) => {
      setProfiles(data.profiles)
    })
  }, [user.id])

  console.log(profiles)

  return (
    <div>
      <h2 className="pb-2">Profiles:</h2>

      <div className="row gx-5 py-3">
        { profiles.map((profile, i) => {
          return <ProfileCard profile={profile} key={i} />
        })}

        <AddProfileIconCard />
        <CreateProfileModal />
      </div>
    </div>
  )
}