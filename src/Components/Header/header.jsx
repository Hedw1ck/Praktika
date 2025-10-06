import React from 'react';
import {PUBLIC} from "../../tools/routes.jsx";
import { Routes, Link} from 'react-router-dom';
const Header = () => {
    return (
        <div className={'min-h-[10vh] w-full '}>
            <div className={'h-[10vh] w-full flex items-center justify-center'}>
                <input type="text" placeholder="Search" className={'h-[50%] w-[40%]  rounded-xl bg-[#E5E5E5] p-1'}/>

                <ul>
                    {
                        PUBLIC.map((routes, index) => (
                            <li key={index}>
                            <Link to={routes.path}>
                                {routes.name}
                            </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Header;