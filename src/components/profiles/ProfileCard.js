export default function ProfileCard(props) {
  // Changing date format
  const date = props.profile.birthday
  const [year, month, day] = date.split('-')
  const birthday = [day, month, year].join('.');

  return (
    <div className="col-3">
      <div className="card mb-5 rounded-3 shadow-sm mx-3">
        <div className="card-body">
          <ul className="list-unstyled mt-1 mb-2 text-center">
            <li className="pb-2 fs-4">{ props.profile.name }</li>
            <li className="py-2">{ props.profile.gender }</li>
            <li className="py-2">{ birthday }</li>
            <li className="pt-2">{ props.profile.city }</li>
          </ul>
        </div>   
      </div>
    </div>    
  )
}