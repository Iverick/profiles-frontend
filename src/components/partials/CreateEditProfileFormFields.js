// Return today's date
const setToday = () => {
  return new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]
}

export default function CreateEditProfileFormFields(props) {
  
  const { values, handleChange } = props

  return (
    <div>
      {/* name field */}
      <div className="form-floating my-4">
        <input
          type="text"
          name="name"
          className="form-control border-0"
          id="name-field"
          value={values.name}
          onChange={handleChange} />
        <label htmlFor="name-field">Name</label>
      </div>

      {/* birthday field */}
      <div className="form-floating my-4">
        <input
          type="date"
          name="birthday"
          className="form-control border-0"
          id="birthday-field"
          max={setToday()}
          value={values.birthday}
          onChange={handleChange} />
        <label htmlFor="birthday-field">Birthday</label>
      </div>

      {/* radio buttons */}
      <div className="form-floating my-4">
        <div className="row justify-content-evenly">
          <small className="text-muted ms-4 mb-3">Gender</small>
          <div className="col-4">
            <div className="form-check form-check-inline">
              <label className="form-check-label" htmlFor="male-radio">
                <span className="text-secondary">Male</span>
              </label>
              <input
                className="form-check-input flex-shrink-0"
                type="radio"
                name="gender"
                id="male-radio"
                value="male"
                checked={values.gender === 'male'}
                onChange={handleChange} />
            </div>
          </div>

          <div className="col-4">
            <div className="form-check form-check-inline ms-4">
              <label className="form-check-label" htmlFor="female-radio">
                <span className="text-secondary">Female</span>
              </label>
              <input
                className="form-check-input flex-shrink-0"
                type="radio"
                name="gender"
                id="female-radio"
                value="female"
                checked={values.gender === 'female'}
                onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>

      {/* city field */}
      <div className="form-floating my-4">
        <input
          type="text"
          name="city"
          className="form-control border-0"
          id="city-field"
          value={values.city}
          onChange={handleChange} />
        <label htmlFor="city-field">City</label>
      </div>
    </div>
  )
}