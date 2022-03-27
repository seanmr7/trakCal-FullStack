import { useContext } from 'react'
import { FaPen } from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa'
import ProfileContext from '../../context/profile/ProfileContext'

function ProfileListItem({ profile }) {
  const { activeProfile, makeActiveProfile } = useContext(ProfileContext)
  const { name, height, weight, bmi, _id } = profile

  const heightFeet = Math.floor(height / 12)
  const heightInch = Math.floor(height % 12)
  const displayBMI = Math.round(bmi * 10) / 10

  const onClick = () => {
    makeActiveProfile(_id)
  }

  return (
    <li
      className={`flex justify-between p-2 hover:bg-primary hover:text-secondary ${
        _id === activeProfile._id && 'bg-primary text-secondary'
      }`}
      onClick={onClick}>
      <p>
        {name}, {heightFeet}' - {heightInch}", {weight} lbs, {displayBMI} BMI
      </p>
      <div className='flex gap-x-3 justify-center content-center items-center'>
        <FaPen />
        <FaTimes />
      </div>
    </li>
  )
}

export default ProfileListItem
