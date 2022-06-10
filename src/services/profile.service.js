import axios from 'axios'
import { API_URL } from '../constants/app-constants'

// Connecting to API /profiles endpoint to extract the list of profiles
const getProfilesAPIData = async() => {
  return await axios.get(API_URL + "profiles").then((res) => {
    return res.data
  })
}

export { getProfilesAPIData }