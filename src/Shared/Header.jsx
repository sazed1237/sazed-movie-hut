import React, { useEffect, useState } from 'react';
import logo from '../assets/logo1.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { navItems } from '../helpers/navItems';

const Header = () => {

    const location = useLocation()
    const removeSpace = location?.search?.slice(3)?.split('%20')?.join(' ')
    const [searchInput, setSearchInput] = useState(removeSpace)
    const navigate = useNavigate()

    // console.log(location.search.slice(3))



    useEffect(() => {
        if (searchInput) {
            navigate(`/search?q=${searchInput}`)
        }
    }, [searchInput])



    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <section className=' fixed top-0 w-full h-16  opacity-80 bg-black items-center justify-center flex z-50'>
            <div className="navbar container mx-auto">
                <div className="flex-1 h-16">
                    <Link to={'/'} className='h-full'>
                        <img className='h-full' src={logo} alt="" />
                    </Link>

                    <nav className='hidden md:flex gap-3 ml-8'>
                        {
                            navItems.map((menu, index) => (
                                <div key={index}>

                                    <NavLink to={menu.href} className={({ isActive }) => `px-2 hover:text-orange-500 transition-all ${isActive && 'text-orange-500'}`}>
                                        {menu.label}
                                    </NavLink>

                                </div>
                            ))
                        }
                    </nav>
                </div>

                <div className="flex-none gap-2">
                    <form onSubmit={handleSubmit} className="items-center justify-center hidden md:flex">
                        <input
                            onChange={(e) => setSearchInput(e.target.value)}
                            type="text"
                            name='search'
                            placeholder="Search here"
                            className="input bg-transparent input-sm "
                            value={searchInput}
                        />

                        <button className='text-2xl text-neutral-100 '>
                            <IoSearch />
                        </button>
                    </form>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;