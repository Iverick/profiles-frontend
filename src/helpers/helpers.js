// Changes input date format
const changeInputBirthdayFormat = (date) => {
  const [year, month, day] = date.split('-')
  const birthday = [day, month, year].join('.')
  return birthday
}

// Sets userStatus to admin or user based on the arg
const userStatus = (admin) => {
  let userStatus
  if (admin) {
    userStatus = 'admin'
  } else {
    userStatus = 'user'
  }
  return userStatus
}

export { changeInputBirthdayFormat, userStatus }
