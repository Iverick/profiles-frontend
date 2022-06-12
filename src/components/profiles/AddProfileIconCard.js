
export default function AddProfileIconCard() {
  return (
    <div className="col-3">
      <div className="card mb-5 rounded-5 shadow-sm mx-3">
        <div className="card-body text-center">
            <button type="button" className="btn btn-white w-100" data-bs-toggle="modal" data-bs-target="#profileBackdrop">
              <div className="d-flex flex-column my-5 py-3">
                <i className="fa-regular fa-plus fs-1 text-muted"></i>
                <span className="text-muted">Create new profile</span>
              </div>
            </button>
        </div>
      </div>
    </div>
  )
}