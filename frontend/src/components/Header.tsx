import { Link } from 'react-router-dom'
import MobileNav from './MobileNav'

const Header = () => {
  return (
    <div className='border-b-2 border-b-orange-500 py-6'>
        <nav className=' container mx-auto flex justify-between item-center'>
            <Link to={'/'} className='text-3xl text-orange-500 tracking-tight font-bold'>Merneat.com</Link>
            <Link to={'/login'} className='hidden md:block font-semibold text-xl hover:text-orange-500'>Log in</Link>
            <div className=' md:hidden text-3xl'>
              <MobileNav/>
            </div>
        </nav>
    </div>
  )
}

export default Header