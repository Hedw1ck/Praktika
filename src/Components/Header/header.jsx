import React from 'react';
import { PUBLIC } from "../../tools/routes.jsx";
import { Link } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import Logo from "./logo.png";

const Header = () => {
    const token = localStorage.getItem('token');

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        window.location.reload();
    }

    return (
        <header className="w-full bg-gradient-to-r from-purple-600 via-purple-400 to-pink-400 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative shadow-md">
            {/* Logo */}
            <div className="flex justify-center md:justify-start md:w-[10%]">
                <img className="h-12 md:h-16 w-auto" src={Logo} alt="Logo" />
            </div>

            {/* Navigation */}
            <nav className="w-full md:w-[65%] flex justify-center">
                <ul className="flex flex-col md:flex-row items-center justify-around gap-2 md:gap-4 w-full">
                    {PUBLIC.map((route, idx) => route.name && (
                        <Link key={idx} to={route.path} className="w-full md:w-auto">
                            <li className="text-white font-semibold text-sm md:text-base px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300 cursor-pointer text-center">
                                {route.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </nav>

            {/* User Info & Logout */}
            <div className="w-full md:w-[10%] flex items-center justify-center md:justify-end gap-4 md:gap-6 bg-white rounded-lg md:rounded-full p-2 md:p-3 shadow-md">
                <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm md:text-base">
                    <FaUser className="text-lg md:text-xl" />
                    <span>{token || 'Guest'}</span>
                </div>
                <button
                    onClick={logout}
                    className="text-purple-600 text-xl md:text-2xl p-1 rounded-full hover:bg-purple-100 hover:text-purple-800 transition-all duration-300"
                >
                    <IoIosLogOut />
                </button>
            </div>
        </header>
    );
};

export default Header;
