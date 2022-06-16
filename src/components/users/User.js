import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileCard from '../profiles/ProfileCard'
import Spinner from '../Spinner'
import EditUserModal from './EditUserModal'
import DeleteUserModal from './DeleteUserModal'
import { getUserAPIData } from '../../services/user.service'
import AddProfileIconCard from '../profiles/AddProfileIconCard'
import CreateProfileModal from '../profiles/CreateProfileModal'

export default function User() {

  const { isAdmin } = useSelector((state) => state.auth)

  // Component states
  const userId = useParams()
  const [user, setUser] = useState([])
  const [profiles, setProfiles] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getUserAPIData(userId.userId).then((data) => {
      setUser(data)
      setProfiles(data.profiles)
      setIsLoading(false)
    })
  }, [userId])

  // Sets userStatus to admin to user based on state data
  const userStatus = () => {
    let userStatus
    if (user.admin) {
      userStatus = 'admin'
    } else {
      userStatus = 'user'
    }
    return userStatus
  }

  const renderUser = (
    <div>
      <div className="text-center">
        <p className="fs-3">{user.username}</p>
        <p className="fs-4">{user.email}</p>
        <p className="fs-5">{userStatus()}</p>

        {/* Edit and Delete user icons */}
        {isAdmin && (
          <div className="row">
            <div className="col-6 text-end">
              <button type="button" className="btn btn-white" data-bs-toggle="modal" data-bs-target="#edit-user">
                <i className="fa-solid fa-pencil"></i>
              </button>
            </div>
            <div className="col-6 text-start">
              <button type="button" className="btn btn-white" data-bs-toggle="modal" data-bs-target="#delete-user">
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        )}
      </div>

      <h2 className="pb-2">Profiles:</h2>

      <div className="row gx-5 py-3">
        {profiles.map((profile, i) => {
          return <ProfileCard profile={profile} key={i} />
        })}

        <AddProfileIconCard />

        {/* Throws "component is changing a controlled input to be uncontrolled" error on inserting this component */}
        <EditUserModal user={user} />

        <DeleteUserModal userId={userId} />

        <CreateProfileModal userId={userId} />
      </div>
    </div>
  )

  return (
    <div>
      {isLoading ? <Spinner /> : renderUser}
    </div>
  )
}