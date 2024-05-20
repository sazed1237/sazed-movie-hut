import React from 'react';
import { mobileNavItems } from '../helpers/navItems';
import { NavLink } from 'react-router-dom';

const MobileNav = () => {

    return (
        <div className='md:hidden h-14 bg-black bg-opacity-90 fixed bottom-0 w-full z-50'>
            <div className='h-full flex items-center justify-between px-7 text-neutral-400 font-semibold'>
                {
                    mobileNavItems.map((nav, index) => (
                        <NavLink 
                        key={index} 
                        to={nav.href}
                        className={({isActive}) => `  ${isActive && 'text-orange-500'}`}
                        >
                            <div className='flex items-center text-2xl justify-center'>
                                {nav.icon}
                            </div>
                            <p className='text-sm'>{nav.label}</p>
                        </NavLink>
                    ))
                }
            </div>
        </div>
    );
};

export default MobileNav;