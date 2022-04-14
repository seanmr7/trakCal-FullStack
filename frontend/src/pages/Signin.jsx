import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthContext from '../context/auth/AuthContext'

function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { user, login, isSuccess, isError, reset } = useContext(AuthContext)
  const navigate = useNavigate()

  const { email, password } = formData

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

    login(formData)
  }

  return (
    <div className='h-full'>
      <div className='container flex flex-col mx-auto justify-center justify-items-center items-center w-full md:w-3/4'>
        <h1 className='text-4xl text-center my-2'>Welcome Back!</h1>
        <h2 className='text-2xl text-center mb-3'>Sign in below</h2>
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
          <div>
            <input
              type='submit'
              value='Sign In'
              className='btn btn-primary w-full mb-2'
            />
            <span className='text-sm font-light'>
              <Link to='/sign-up'>Sign Up Instead?</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin
