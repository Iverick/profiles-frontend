import axios from 'axios'
import authHeader from './auth-header'
import { AUTH_URL } from '../constants/app-constants'

// Makes a POST request to /users API endpoint to create a new user on the server with the
// provided credentials
const register = async (username, email, password, admin) => {
  try {
    let res = await axios.post(AUTH_URL, {
      headers: { "Content-Type": "application/json" },
      user: { username, email, password, admin },
    })
    return await res
  } catch (err) {
    console.log(err)
    return await err
  }
}

// Makes a POST request to /users/sign_in API endpoint to sign in a user with the provided credentials
// and return the auth token and the signed in user data in response.
// Stores provided response data in local storage later.
const login = async (email, password) => {
  try {
    return await axios
      .post(AUTH_URL + "sign_in", {
        user: { email, password }
      })
      .then((res) => {
        const token = res.headers.authorization
        if (token) {
          localStorage.setItem("token", token)
          localStorage.setItem("user", JSON.stringify(res.data.user))
        }
        return res
      })
  } catch (err) {
    console.log(err)
    return await err
  }
}

// Makes a DELETE request to /users/sign_out API endpoint to log out a user with the stored Auth token
// and then removes auth token and user data from the local storage
const logout = async () => {
  try {
    return await axios
      .delete(AUTH_URL + "sign_out", {
        headers: authHeader()
      })
      .then((res) => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        return res
      })
  } catch (err) {
    console.log(err)
    return await err
  }
}

export { register, login, logout }
