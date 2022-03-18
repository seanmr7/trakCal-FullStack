import { useState } from 'react'
import { IoFastFood } from 'react-icons/io5'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import NavbarList from './NavbarList'

function Navbar() {
  const [showMenu, setShowMenu] = useState(false)
  const onClick = () => {
    setShowMenu((prevState) => !prevState)
  }

  return (
    <>
      <div className='flex bg-primary text-base-100 w-full mb-4'>
        <div className='flex-1'>
          <Link to='/'>
            <div className='btn btn-ghost normal-case text-2xl'>
              <IoFastFood />
              <p className='hidden md:inline'>TrakCal</p>
            </div>
          </Link>
        </div>
        <div
          className='inline self-center mx-3 text-base-100 text-3xl dropdown dropdown-end md:hidden'
          onClick={onClick}>
          <GiHamburgerMenu />
        </div>
        <div className='hidden md:flex md:flex-none'>
          <NavbarList />
        </div>
      </div>
      <NavbarList
        isMobile={true}
        showMenu={showMenu}
        onClickOutside={() => {
          setShowMenu(false)
        }}
        onClickInside={() => {
          setShowMenu(false)
        }}
      />
    </>
  )
}

export default Navbar
