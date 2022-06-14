import { React, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getProfilesAPIData } from'../../services/profile.service'
import ProfileCard from './ProfileCard'
import CreateProfileModal from './CreateProfileModal'
import AddProfileIconCard from './AddProfileIconCard'

export default function Profiles() {

  const { isAdmin } = useSelector((state) => state.auth)

  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    // Connecting to API /profiles endpoint after the element was mounted
    getProfilesAPIData().then((data) => {
      setProfiles(data)
    })
  }, [])

  return (
    <div>
      <h2 className="pb-2">Profiles:</h2>

      <div className="row gx-5 py-3">
        { profiles.map((profile, i) => {
          return <ProfileCard profile={profile} key={i} />
        })}

        { isAdmin && (<AddProfileIconCard />) }
      </div>

      <CreateProfileModal />
    </div>
  )
}