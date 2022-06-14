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

export { getProfilesAPIData, postProfileAPIData }