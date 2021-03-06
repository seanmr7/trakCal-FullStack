import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthContext from '../context/auth/AuthContext'

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
  })

  const { user, register, isSuccess, isError, reset } = useContext(AuthContext)
  const navigate = useNavigate()

  const { email, password, password2 } = formData

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong. Please try again.')
      reset()
    }

    if (isSuccess || user) {
      navigate('/')
      reset()
    }
  }, [isError, isSuccess, navigate, reset, user])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      window.alert('Passwords must match')
    } else {
      register({
        email,
        password,
      })
    }
  }

  return (
    <div className='h-full'>
      <div className='container flex flex-col mx-auto justify-center justify-items-center items-center w-full md:w-3/4'>
        <h1 className='text-4xl text-center my-2'>Sign Up</h1>
        <h2 className='text-2xl text-center mb-3'>and start tracking today!</h2>
        <form onSubmit={onSubmit} className='w-3/4'>
          <input
            type='email'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
            className='w-full input input-bordered input-primary mx-auto my-2'
            required
          />
          <input
            type='password'
            placeholder='Password'
            id='password'
            value={password}
            onChange={onChange}
            className='w-full input input-bordered input-primary mx-auto my-2'
            required
          />
          <input
            type='password'
            placeholder='Confirm password'
            id='password2'
            value={password2}
            onChange={onChange}
            className='w-full input input-bordered input-primary mx-auto my-2'
            required
          />
          <div>
            <input
              type='submit'
              value='Sign Up'
              className='btn btn-primary w-full mb-2'
            />
            <span className='text-sm font-light'>
              <Link to='/sign-in'>Sign In Instead?</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
