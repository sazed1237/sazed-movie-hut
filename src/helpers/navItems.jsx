import { BiSolidMoviePlay } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { PiTelevisionFill } from "react-icons/pi";
import { IoSearch } from 'react-icons/io5';


export const navItems = [
    {
        label: "TV Shows",
        href: 'tv',
        icon: <PiTelevisionFill />
    },
    {
        label: "Movies",
        href: 'movie',
        icon: <BiSolidMoviePlay />
    },

]


export const mobileNavItems = [
    {
        label: "Home",
        href: '/',
        icon: <FaHome></FaHome>
    },

    ...navItems,

    {
        label: "Search",
        href: '/search',
        icon: <IoSearch></IoSearch>
    },
]