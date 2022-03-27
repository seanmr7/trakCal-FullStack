import { useEffect, useContext } from 'react'
import AuthContext from '../../context/auth/AuthContext'
import ProfileContext from '../../context/profile/ProfileContext'
import ProfileForm from './ProfileForm'
import ProfileList from './ProfileList'

function ProfileModal() {
  const { showProfileForm } = useContext(ProfileContext)

  return (
    <>
      <input type='checkbox' id='profiles-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box h-screen relavtive flex flex-col lg:h-3/5 lg:w-full'>
          <label htmlFor='profiles-modal' className='flex justify-between mb-1'>
            <h3 className='text-xl font-medium'>Profiles</h3>
            <p className='btn btn-primary btn-circle btn-sm shadow-md text-gray-50'>
              x
            </p>
          </label>
          <ProfileList />
          {showProfileForm && <ProfileForm />}
        </div>
      </div>
    </>
  )
}

export default ProfileModal
