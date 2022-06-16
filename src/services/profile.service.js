import axios from 'axios'
import { API_URL } from '../constants/app-constants'

// Connecting to API /profiles endpoint to extract the list of profiles
const getProfilesAPIData = async() => {
  return await axios.get(API_URL + "profiles").then((res) => {
    return res.data
  })
}

// Makes a POST request to API /profiles endpoint to create a new profile
const postProfileAPIData = async(createdData) => {
  try {
    return await axios
      .post(API_URL + "profiles", createdData)
      .then((res) => {
        return res
      })
  } catch(err) {
    console.log(err)
    return await err
  }
}

// Makes a POST request to API /profiles/:profileId endpoint to update a existing profile
const updateProfileAPIData = async(updatedData) => {
  try {
    return await axios
      .put(API_URL + "profiles/" + updatedData.id, updatedData, {
        headers: { "Content-Type": "application/json" }
      })
      .then((res) => {
        return res
      })
  } catch(err) {
    console.log(err)
    return await err
  }
}

// Makes a DELETE request to API /profiles/:profileId endpoint to remove a profile
const destroyProfileAPI = async(profileId) => {
  try {
    return await axios
      .delete(API_URL + "profiles/" + profileId, {
        headers: { "Content-Type": "application/json" }
      })
      .then((res) => {
        return res
      })
  } catch(err) {
    console.log(err)
    return await err
  }
}

export { getProfilesAPIData, postProfileAPIData, updateProfileAPIData, destroyProfileAPI }