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

export { register }
