import { useContext, useEffect } from 'react'
import ProfileContext from '../../context/profile/ProfileContext'
import AuthContext from '../../context/auth/AuthContext'
import ProfileListItem from './ProfileListItem'

function ProfileList() {
  const { profiles, getProfiles, showProfileForm } = useContext(ProfileContext)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    getProfiles(user.token)
  }, [])

  const { toggleProfileForm } = useContext(ProfileContext)

  const onClick = () => {
    toggleProfileForm()
  }
  return (
    <div>
      <ul className='divide-y-2 divide-gray-200'>
        {profiles.map((profile) => (
          <ProfileListItem key={profile._id} profile={profile} />
        ))}
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
