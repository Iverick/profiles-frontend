/*
  Helper method returns Authorization header if it persists is a local browser storage
 */
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = JSON.parse(localStorage.getItem('token'))
  if (user && token) {
    return { Authorization: 'Bearer ' + token }
  } else {
    return {}
  }
}
