import { React, useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import ProfileCard from '../profiles/ProfileCard'
import Spinner from '../Spinner'
import EditUserModal from './EditUserModal'
import DeleteUserModal from './DeleteUserModal'
import { getUserAPIData } from '../../services/user.service'
import { destroyProfileAPI } from '../../services/profile.service'
import AddProfileIconCard from '../profiles/AddProfileIconCard'
import CreateProfileModal from '../profiles/CreateProfileModal'
import { userStatus } from '../../helpers/helpers'

export default function User() {

  const { user } = useSelector((state) => state.auth)
  // Mimics forceUpdate()
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])
  // Component states
  const userId = useParams()
  const [loadedUser, setLoadedUser] = useState([])
  const [profiles, setProfiles] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Used to toggle modal's visibility
  const [showEditUser, setShowEditUser] = useState(false)
  const [showDeleteUser, setShowDeleteUser] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getUserAPIData(userId.userId).then((data) => {
      setLoadedUser(data)
      setProfiles(data.profiles)
      setIsLoading(false)
    })
  }, [userId])

  // Button click handler for bootstrap EditUser modal
  const handleShowEditUser = () => setShowEditUser(true)
  const handleCloseEditUser = () => setShowEditUser(false)
  // Button click handler for bootstrap DeleteUser modal
  const handleShowDeleteUser = () => setShowDeleteUser(true)
  const handleCloseDeleteUser = () => setShowDeleteUser(false)

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

  const renderUser = (
    <div>
      <div className="text-center">
        <p className="fs-3">{loadedUser.username}</p>
        <p className="fs-4">{loadedUser.email}</p>
        <p className="fs-5">{userStatus(loadedUser.admin)}</p>

        {/* Edit and Delete user icons */}
        {user.admin && (
          <div className="row">
            <div className="col-6 text-end">
              <Button variant="btn btn-white" onClick={handleShowEditUser}>
                <i className="fa-solid fa-pencil"></i>
              </Button>
            </div>
            <div className="col-6 text-start">
              <Button variant="btn btn-white" onClick={handleShowDeleteUser}>
                <i className="fa-solid fa-trash-can"></i>
              </Button>
            </div>
          </div>
        )}
      </div>

      <h2 className="pb-2">Profiles:</h2>

      <div className="row gx-5 py-3">
        {profiles.map((profile, i) => {
          return <ProfileCard profile={profile} key={i} onDeleteProfile={handleDelete} />
        })}

        {user.id === Number(userId.userId) && <AddProfileIconCard />}

        {/* Throws "component is changing a controlled input to be uncontrolled" error on inserting this component */}
        <EditUserModal user={loadedUser} showEditUser={showEditUser} onHide={handleCloseEditUser} />

        <DeleteUserModal userId={userId} showDeleteUser={showDeleteUser} onHide={handleCloseDeleteUser} />

        <CreateProfileModal />
      </div>
    </div>
  )

  return (
    <div>
      {isLoading ? <Spinner /> : renderUser}
    </div>
  )
}