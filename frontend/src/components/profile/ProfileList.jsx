import { useContext, useState } from 'react'
import ProfileContext from '../../context/profile/ProfileContext'
function ProfileList() {
  const { showProfileForm, toggleProfileForm } = useContext(ProfileContext)

  const onClick = () => {
    toggleProfileForm()
  }
  return (
    <div>
      <ul className='divide-y-2 divide-gray-300'>
        <li className='flex justify-between p-2 hover:bg-primary hover:text-secondary'>
          John
        </li>
        <li className='flex justify-between p-2 hover:bg-primary hover:text-secondary'>
          Susan
        </li>
        <li className='flex justify-between p-2 hover:bg-primary hover:text-secondary'>
          joey
        </li>
        <li
          className='btn btn-primary mt-2 btn-md shadow-lg text-gray-50'
          onClick={onClick}>
          Add Profile
        </li>
      </ul>
    </div>
  )
}

export default ProfileList
