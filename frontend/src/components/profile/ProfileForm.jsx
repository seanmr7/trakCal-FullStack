import { useContext, useState, useEffect } from 'react'
import ProfileContext from '../../context/profile/ProfileContext'
import AuthContext from '../../context/auth/AuthContext'
import { toast } from 'react-toastify'

function ProfileForm() {
  const { user } = useContext(AuthContext)
  const {
    toggleProfileForm,
    createProfile,
    editProfile,
    isEdit,
    setEditState,
    activeProfile,
    loading,
  } = useContext(ProfileContext)

  const [formData, setFormData] = useState({
    name: '',
    heightFeet: '',
    heightInch: '',
    weight: '',
  })

  const { name, heightFeet, heightInch, weight } = formData

  useEffect(() => {
    // Set formData to the active profile if the user is editing
    if (isEdit) {
      setFormData(() => ({
        name: activeProfile.name,
        heightFeet: Math.floor(activeProfile.height / 12),
        heightInch: Math.floor(activeProfile.height % 12),
        weight: activeProfile.weight,
      }))
    }
  }, [isEdit, activeProfile])

  // Change state to value entered in form
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  // Cancels edit profile
  const onCancel = (e) => {
    e.preventDefault()
    setEditState(false)
    toggleProfileForm()
  }

  const onSubmit = (e) => {
    e.preventDefault()

    // Check that all fields are filled in
    if (name === '' || heightFeet === '' || heightInch === '' || weight === '') {
      toast.error('Please fill in all fields')
      return
    }

    // Create profile data object with sanitized values
    const profileData = {
      name: name,
      height: parseInt(heightFeet) * 12 + parseInt(heightInch),
      weight: parseInt(weight),
    }

    // Check if a profile is being edited to run appropriate function
    if (isEdit) {
      editProfile(activeProfile._id, profileData, user.token)
      toast.success('Profile edited!')
    } else {
      createProfile(profileData, user.token)
      toast.success('Profile created!')
    }
  }

  return (
    <div id='profile-form' className='container shadow-md bg-gray-50 p-3 mt-3'>
      <form onSubmit={onSubmit}>
        <div className='flex flex-col'>
          <div className='form-control mb-5 md:mr-5 md:w-full'>
            <label htmlFor='name' className='label p-0 text-sm font-light'>
              Name
            </label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={onChange}
              placeholder='Jake'
              className='input input-sm'
            />
          </div>
          <div className='flex'>
            <div className='form-control mb-5 w-1/3 md:mr-5 md:w-full'>
              <label htmlFor='height' className='label p-0 text-sm font-light'>
                Height
              </label>
              <div className='flex'>
                <input
                  type='number'
                  id='heightFeet'
                  value={heightFeet}
                  onChange={onChange}
                  placeholder='5'
                  className='input input-sm w-1/4 mr-2'
                />
                <input
                  type='number'
                  id='heightInch'
                  value={heightInch}
                  onChange={onChange}
                  placeholder='6'
                  className='input input-sm w-2/5'
                />
              </div>
            </div>
            <div className='form-control mb-5 w-2/3 md:mr-5 md:w-full'>
              <label htmlFor='weight' className='label p-0 text-sm font-light'>
                Weight
              </label>
              <input
                type='number'
                id='weight'
                value={weight}
                onChange={onChange}
                placeholder='150'
                className='input input-sm mr-2'
              />
            </div>
          </div>
        </div>
        {isEdit ? (
          <div className='w-full flex'>
            <button
              type='submit'
              className={`flex-1 btn btn-primary btn-block shadow-md mx-2 text-gray-50 ${
                loading && 'loading'
              }`}
              disabled={loading && true}>
              {loading ? 'Loading...' : 'Submit'}
            </button>
            <button
              className='flex-1 btn btn-warning btn-block shadow-md mx-2 text-gray-50'
              onClick={onCancel}
              disabled={loading && true}>
              Cancel
            </button>
          </div>
        ) : (
          <button
            type='submit'
            className={`btn btn-primary btn-block shadow-md text-gray-50 ${
              loading && 'loading'
            }`}
            disabled={loading && true}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        )}
      </form>
    </div>
  )
}

export default ProfileForm
