import './index.css'

const PasswordItem = props => {
  const {details, isMasked, onDeletePassword} = props
  const {id, website, username, password} = details
  const onDelete = () => {
    onDeletePassword(id)
  }

  return (
    <li className="each">
      <div className="details">
        <div className="pic">
          <p>{username[0].toUpperCase()}</p>
        </div>
        <div className="user">
          <p>{website}</p>
          <p>{username}</p>
          {isMasked && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars-img"
            />
          )}
          {!isMasked && <p>{password}</p>}
        </div>
      </div>
      <button
        type="button"
        className="delete-btn"
        onClick={onDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete"
        />
      </button>
    </li>
  )
}
export default PasswordItem
