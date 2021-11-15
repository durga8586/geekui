import {AiOutlineDelete} from 'react-icons/ai'
import {FiEdit} from 'react-icons/fi'

import './index.css'

const User = props => {
  const {user, onDeleteUser, onEditUser, isUserChecked} = props

  const onClickDeleteButton = () => {
    onDeleteUser(user.id)
  }

  const onClickEditButton = () => {
    onEditUser(user.id)
  }

  const onChangeUserCheckBox = () => {
    isUserChecked(user.id)
  }

  return (
    <li className="users-list-item">
      <input
        type="checkbox"
        className="check-box"
        id={user.id}
        checked={user.isChecked}
        onChange={onChangeUserCheckBox}
      />
      <label className="label-container" htmlFor={user.id}>
        <p className="user-list-headers">{user.name}</p>
        <p className="user-list-headers">{user.email}</p>
        <p className="user-list-headers">{user.role}</p>
        <div className="edit-delete-container">
          <button
            type="button"
            className="edit-button"
            onClick={onClickEditButton}
          >
            <FiEdit />
          </button>
          <button
            type="button"
            className="edit-button"
            onClick={onClickDeleteButton}
          >
            <AiOutlineDelete />
          </button>
        </div>
      </label>
    </li>
  )
}

export default User
