import { useContext } from 'react'
import ProfileContext from '../../context/profile/ProfileContext'
import ProfileListItem from './ProfileListItem'

function ProfileList() {
  const { profiles, toggleProfileForm, setEditState, showProfileForm, isEdit } =
    useContext(ProfileContext)

  const cancelButtonVisibility = () => {
    if (showProfileForm && !isEdit) {
      return true
    } else {
      return false
    }
  }

  // Show or hide profile form
  const onClick = () => {
    setEditState(false)
    toggleProfileForm()
  }

  const onCancel = () => {
    if (showProfileForm) {
      toggleProfileForm()
    }
  }

  return (
    <div>
      <ul className='divide-y-2 divide-gray-200'>
        {profiles.map((profile) => (
          <ProfileListItem key={profile._id} profile={profile} />
        ))}
        <li
          className='btn btn-primary mt-2 btn-md shadow-lg text-gray-50'
          onClick={onClick}>
          Add Profile
        </li>
        {cancelButtonVisibility() && (
          <li
            className='btn btn-accent mt-2 btn-md shadow-lg text-gray-50'
            onClick={onCancel}>
            Cancel
          </li>
        )}
      </ul>
    </div>
  )
}

export default ProfileList
