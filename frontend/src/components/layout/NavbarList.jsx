import { useContext, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/AuthContext'

function NavbarList(props) {
  const { isAuthenticated, logout } = useContext(AuthContext)
  const ref = useRef(null)
  const { isMobile, showMenu, onClickOutside, onClickInside } = props

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside && onClickOutside()
      }
    }

    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [onClickOutside, onClickInside])

  if (isAuthenticated && !isMobile) {
    return (
      <ul ref={ref} className='menu menu-horizontal p-0'>
        <li>
          <p
            onClick={() => {
              logout()
              onClickOutside()
            }}>
            Logout
          </p>
        </li>
        <li>
          <label htmlFor='profiles-modal'>Profiles</label>
        </li>
        <li>
          <label htmlFor='dates-modal'>Prev Logs</label>
        </li>
      </ul>
    )
  }

  if (!isAuthenticated && !isMobile) {
    return (
      <ul className='menu menu-horizontal p-0'>
        <li>
          <Link to='/sign-in'>Log In</Link>
        </li>
        <li>
          <Link to='/sign-up'>Signup</Link>
        </li>
      </ul>
    )
  }

  if (showMenu && isMobile && isAuthenticated) {
    return (
      <div
        ref={ref}
        className='dropdown-content card card-compact w-32 bg-primary text-base-100'>
        <ul className='menu menu-compact p-0'>
          <li>
            <p
              className='text-lg'
              onClick={() => {
                onClickInside()
                logout()
              }}>
              Logout
            </p>
          </li>
          <li>
            <label className='text-lg' htmlFor='profiles-modal'>
              Profiles
            </label>
          </li>
          <li>
            <label className='text-lg' htmlFor='dates-modal'>
              Prev Logs
            </label>
          </li>
        </ul>
      </div>
    )
  }

  if (showMenu && isMobile && !isAuthenticated) {
    return (
      <div
        ref={ref}
        className='dropdown-content card card-compact w-32 bg-primary text-base-100'>
        <ul className='menu menu-compact p-0'>
          <li>
            <Link to='/sign-in' className='text-lg' onClick={onClickInside}>
              Log In
            </Link>
          </li>
          <li>
            <Link to='/sign-up' className='text-lg' onClick={onClickInside}>
              Signup
            </Link>
          </li>
        </ul>
      </div>
    )
  }

  if (!showMenu && isMobile) {
    return null
  }
}

NavbarList.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

NavbarList.defaultProps = {
  isMobile: false,
}

export default NavbarList
