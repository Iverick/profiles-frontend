export default function SubmitRejectButtons(props) {
  const { handleSubmit } = props

  return (
    <div className="text-center mt-4">
      <button type="button" className="btn btn-light border-0 mx-4 px-4" onClick={handleSubmit}>
        <i className="fa-solid fa-check"></i>
      </button>
      <button type="button"
        id="close-modal"
        className="btn btn-light border-0 mx-4 px-4"
        data-bs-dismiss="modal">
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  )
}