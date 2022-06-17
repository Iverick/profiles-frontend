import { React, useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { getUserAPIData } from '../../services/user.service'
import { destroyProfileAPI } from '../../services/profile.service'
import ProfileCard from './ProfileCard'
import CreateProfileModal from './CreateProfileModal'
import AddProfileIconCard from './AddProfileIconCard'
import Spinner from '../Spinner'

export default function Profiles() {

  // Importing data from state
  const { user } = useSelector((state) => state.auth)
  // Mimics forceUpdate()
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])
  // Component states
  const [profiles, setProfiles] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Connecting to API /user/:user_id endpoint after the element was mounted and adds to the 
    // app's state list of profiles for the authenticated user
    // Displays spinner in the process of loading the data.
    setIsLoading(true)
    getUserAPIData(user.id).then((data) => {
      setProfiles(data.profiles)
      setIsLoading(false)
    })
  }, [user.id])

  // Handles on delete profile event.
  // Makes a call to API endpoint to remove a profile with the specified ID 
  // and removes this profile from the local state.
  // Rerenders on success
  const handleDelete = (e, profileId) => {
    destroyProfileAPI(profileId).then((res) => {
      if (res.status === 204) {
        profiles.forEach((profile, i) => {
          if (profile.id === profileId) {
            profiles.splice(i, 1)
          }
        })
        setProfiles(profiles)
        forceUpdate()
      } else {
        console.log(res)
      }
    })
  }

  const renderProfiles = (
    <div>
      <h2 className="pb-2">Profiles:</h2>

      <div className="row gx-5 py-3">
        {profiles.map((profile, i) => {
          return <ProfileCard profile={profile} key={i} onDeleteProfile={handleDelete} />
        })}

        <AddProfileIconCard />
        <CreateProfileModal />
      </div>
    </div>
  )

  return (
    <div>
      {isLoading ? <Spinner /> : renderProfiles}
    </div>
  )
}