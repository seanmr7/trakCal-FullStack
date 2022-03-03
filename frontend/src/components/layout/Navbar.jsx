import { IoFastFood } from 'react-icons/io5'

function Navbar() {
  return (
    <div className='flex bg-primary text-base-100 w-full'>
      <div className='flex-1'>
        <div className='btn btn-ghost normal-case text-2xl'>
          <IoFastFood />
          <p className='hidden md:inline'>TrakCal</p>
        </div>
      </div>
      <div className='hidden md:flex md:flex-none'>
        <ul className='menu menu-horizontal p-0'>
          <li>
            <a href='/'>About</a>
          </li>
          <li>
            <a href='/'>Log In/Out</a>
          </li>
          <li>
            <a href='/'>Profiles</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
