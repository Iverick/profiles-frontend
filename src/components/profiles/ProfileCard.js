export default function ProfileCard() {
  return (
    <div className="col-3">
      <div className="card mb-5 rounded-3 shadow-sm mx-3">
        <div className="card-body">
          <ul className="list-unstyled mt-1 mb-2 text-center">
            <li className="pb-2">Profile Name</li>
            <li className="py-2">male</li>
            <li className="py-2">01.01.2001</li>
            <li className="pt-2">Kyiv</li>
          </ul>
        </div>   
      </div>
    </div>    
  )
}