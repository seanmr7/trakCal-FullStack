import { IoFastFood } from 'react-icons/io5'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex bg-primary text-base-100 w-full mb-4'>
      <div className='flex-1'>
        <Link to='/'>
          <div className='btn btn-ghost normal-case text-2xl'>
            <IoFastFood />
            <p className='hidden md:inline'>TrakCal</p>
          </div>
        </Link>
      </div>
      <div className='hidden md:flex md:flex-none'>
        <ul className='menu menu-horizontal p-0'>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <a>Log In/Out</a>
          </li>
          <li>
            <a>Profiles</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
