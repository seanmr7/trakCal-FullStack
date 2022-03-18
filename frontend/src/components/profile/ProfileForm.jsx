import { useContext, useState } from 'react'
import ProfileContext from '../../context/profile/ProfileContext'

function ProfileForm() {
  const [formData, setFormData] = useState({
    name: '',
    heightFeet: '',
    heightInch: '',
    weight: '',
  })

  const { name, heightFeet, heightInch, weight } = formData

  const { toggleProfileForm } = useContext(ProfileContext)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    toggleProfileForm()
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
        <button
          type='submit'
          className='btn btn-primary btn-block shadow-md text-gray-50'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default ProfileForm
