import SubmitRejectButtons from '../partials/SubmitRejectButtons'

export default function EditProfileModal() {

  const handleSubmit = (e) => {
    console.log(e)
  }
  
  return (
    <div className="modal fade" id="edit-profile-backdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">


            {/* TODO Create the form to handle Profile POST and PUT requests */}


            EditProfileModal Form Goes Here

            {/* submit/reject buttons */}
            <SubmitRejectButtons handleSubmit={handleSubmit} />

          </div>
        </div>
      </div>
    </div>
  )
}