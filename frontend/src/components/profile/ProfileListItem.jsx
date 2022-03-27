import { useContext } from 'react'
import { FaPen } from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa'
import AuthContext from '../../context/auth/AuthContext'
import ProfileContext from '../../context/profile/ProfileContext'

function ProfileListItem({ profile }) {
  const {
    activeProfile,
    makeActiveProfile,
    showProfileForm,
    toggleProfileForm,
    setEditState,
    setLocalStorage,
    deleteProfile,
  } = useContext(ProfileContext)
  const { user } = useContext(AuthContext)
  const { name, height, weight, bmi, _id } = profile

  const heightFeet = Math.floor(height / 12)
  const heightInch = Math.floor(height % 12)
  const displayBMI = Math.round(bmi * 10) / 10

  // Check if the user had a profile selected and assign class names to activeClass
  let activeClass = ''
  if (activeProfile !== undefined && _id === activeProfile._id) {
    activeClass = 'bg-primary text-secondary'
  }

  // Sets active profile to profile clicked
  const setActive = () => {
    makeActiveProfile(_id)
    setLocalStorage(profile)
  }

  // Sets the edit state to true and shows the profile form
  const onEdit = () => {
    setEditState(true)
    if (showProfileForm) {
      return
    } else {
      toggleProfileForm()
    }
  }

  // Deletes profile
  const onDelete = (e) => {
    if (e.target.id === 'delete') {
      deleteProfile(_id, user.token)
    }
  }

  return (
    <li
      className={`flex justify-between p-2 hover:bg-primary hover:text-secondary ${activeClass}
      `}
      onClick={setActive}>
      <p>
        {name}, {heightFeet}' - {heightInch}", {weight} lbs, {displayBMI} BMI
      </p>
      <div className='flex gap-x-3 justify-center content-center items-center'>
        <FaPen onClick={onEdit} />
        <FaTimes id='delete' onClick={onDelete} />
      </div>
    </li>
  )
}

export default ProfileListItem
