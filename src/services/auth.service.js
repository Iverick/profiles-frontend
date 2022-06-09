import axios from 'axios'
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
// and return the auth token and the signed in user data in response
const login = async (email, password) => {
  try {
    let res = await axios
      .post(AUTH_URL + "sign_in", {
        headers: { "Content-Type": "application/json" },
        user: { email, password }
      })
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data
      })
    return res
  } catch (err) {
    console.log(err)
    return await err
  }
}

export { register, login }
