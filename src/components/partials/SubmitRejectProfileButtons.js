import { useNavigate } from "react-router-dom"


export default function SubmitRejectButtons(props) {
  
  const { handleSubmit } = props

  let navigate = useNavigate()

  const handleCloseModal = () => {
    navigate('/profiles')
    // navigate(-1)
  }

  return (
    <div className="text-center mt-4">
      <button type="button" className="btn btn-light border-0 mx-4 px-4" onClick={handleSubmit}>
        <i className="fa-solid fa-check"></i>
      </button>
      <button type="button"
        id="close-modal"
        className="btn btn-light border-0 mx-4 px-4"
        data-bs-dismiss="modal"
        onClick={ handleCloseModal }>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  )
}