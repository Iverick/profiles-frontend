import axios from 'axios'
import { API_URL } from '../constants/app-constants'

// Connecting to API /users/:id endpoint to extract the list of users
const getUsersAPIData = async() => {
  return await axios.get(API_URL + "users").then((res) => res.data)
}

// Connecting to API /users/:id endpoint to extract details about a specific user
const getUserAPIData = async(userId) => {
  return await axios.get(API_URL + "users/" + userId).then((res) => res.data)
}

// Connecting to API /users/:id PUT endpoint to update details about a specific user
const updateUserAPIData = async(userId, updatedData) => {
  try {
    let res = await axios.put(API_URL + "users/" + userId, updatedData, {
      headers: { "Content-Type": "application/json" },
    })
    return res
  } catch(err) {
    console.log(err)
    return await err
  }
}

export { getUsersAPIData, getUserAPIData, updateUserAPIData }
