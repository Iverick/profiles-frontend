import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileCard from '../profiles/ProfileCard'
import EditUserModal from './EditUserModal'
import { getUserAPIData } from '../../services/user.service'
import AddProfileIconCard from '../profiles/AddProfileIconCard'
import CreateEditProfileModal from '../profiles/CreateEditProfileModal'

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

  // TODO: Remove this method after finishing the component!!!!!!!!
  const handleEditClick = () => {
    console.log("edit icon was clicked!")
  }

  // TODO: Remove this method after finishing the component!!!!!!!!
  const handleDeleteClick = () => {
    console.log("delete icon was clicked!")
  }

  // Sets userStatus to admin to user based on state data
  const userStatus = () => {
    let userStatus
    if (user.admin) {
      return userStatus = 'admin'
    } else {
      return userStatus = 'user'
    }
  }

  return (
    <div>
      <div className="text-center">
        <p className="fs-3">{ user.username }</p>
        <p className="fs-4">{ user.email }</p>
        <p className="fs-5">{ userStatus() }</p>
        <div className="row">
          <div className="col-6 text-end">
            <button type="button" className="btn btn-white" data-bs-toggle="modal" data-bs-target="#userBackdrop">
              <i className="fa-solid fa-pencil" onClick={ handleEditClick }></i>
            </button>
          </div>
          <div className="col-6 text-start">
            <button type="button" className="btn btn-white">
              <i className="fa-solid fa-trash-can" onClick={ handleDeleteClick }></i>
            </button>
          </div>
        </div>
      </div>

      <h2 className="pb-2">Profiles:</h2>

      <div className="row gx-5 py-3">
        { profiles.map((profile, i) => {
          return <ProfileCard profile={profile} key={i} />
        })}

        <AddProfileIconCard />
      </div>

      <EditUserModal user={user} />



      {/* TODO: Add user props to this modal. Careful here - user ID should be passed! */}
      <CreateEditProfileModal />


    </div>
  );
}