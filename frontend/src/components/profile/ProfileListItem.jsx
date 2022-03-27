import { useContext } from 'react'
import { FaPen } from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa'
import ProfileContext from '../../context/profile/ProfileContext'

function ProfileListItem({ profile }) {
  const {
    activeProfile,
    makeActiveProfile,
    showProfileForm,
    toggleProfileForm,
    setEditState,
    setLocalStorage,
  } = useContext(ProfileContext)
  const { name, height, weight, bmi, _id } = profile

  const heightFeet = Math.floor(height / 12)
  const heightInch = Math.floor(height % 12)
  const displayBMI = Math.round(bmi * 10) / 10

  let activeClass = ''
  if (activeProfile !== '' && _id === activeProfile._id) {
    activeClass = 'bg-primary text-secondary'
  }

  // Sets active profile to profile clicked
  const setActive = () => {
    makeActiveProfile(_id)
    setLocalStorage(profile)
  }

  const editProfile = () => {
    setEditState(true)
    if (showProfileForm) {
      return
    } else {
      toggleProfileForm()
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
        <FaPen onClick={editProfile} />
        <FaTimes />
      </div>
    </li>
  )
}

export default ProfileListItem
