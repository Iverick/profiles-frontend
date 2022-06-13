/*
  Helper method adds Authorization token to the header if it persists is a local browser storage
 */
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')
  if (user && token) {
    return { 
      "Authorization": token,
      "Content-Type": "application/json"
    }
  } else {
    return {}
  }
}
