export default function ProfileCard(props) {
  // Changing date format
  const date = props.profile.birthday
  const [year, month, day] = date.split('-')
  const birthday = [day, month, year].join('.');

  return (
    <div className="col-3">
      <div className="card mb-5 rounded-5 shadow-sm mx-3">

        {/* Card body */}
        <div className="card-body">
          <ul className="list-unstyled mt-1 mb-2 text-center">
            <li className="pb-2 fs-4">{ props.profile.name }</li>
            <li className="py-2">{ props.profile.gender }</li>
            <li className="py-2">{ birthday }</li>
            <li className="pt-2">{ props.profile.city }</li>
          </ul>
        </div> 
        
        {/* Footer buttons */}
        <div className="d-flex">
          <div className="text-center border flex-fill">
            <button className="btn btn-sm btn-white w-100 p-2">
              <span className="text-muted me-2">edit</span>
              <i className="fa-solid fa-pencil"></i>
            </button>
          </div>
          <div className="text-center border flex-fill">
            <button className="btn btn-sm btn-white w-100 p-2">
              <span className="text-muted me-2">delete</span>
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
 
      </div>
    </div>    
  )
}