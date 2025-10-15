import React from 'react';
import {PUBLIC} from "../../tools/routes.jsx";
import {Link} from 'react-router-dom';

const Header = () => {
const token = localStorage.getItem('token');

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    window.location.reload();
}
    return (
        <div className={'h-[10vh] flex w-full gap-2 relative '}>
            <div className={`h-full w-[10%]  `}>
                <img className={`h-full w-full `} src="src/Components/Header/logo (2).jpg" alt=""/>
            </div>
            <div className={'h-full w-[65%] flex items-center justify-center'}>
                <ul className={`flex justify-between w-full gap-2 h-full `}>
                    {
                        PUBLIC.map((routes, index) => (
                            routes.name && (
                                <Link key={index} to={routes.path}>
                            <li
                                className={`  h-full p-2 flex items-center justify-center text-white bg-[#D6C1D8]`}>
                                    {routes.name}
                            </li>
                                </Link>
                        )))
                    }
                </ul>
            </div>
            <div className={`border-1 w-[20%] h-full absolute right-0 top-0`}>
                <p>{token}</p>
                <button
                onClick={()=>logout()}
                >Log out</button>
            </div>
        </div>
    );
};

export default Header;