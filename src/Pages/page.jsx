import React from 'react';
import { Routes, Route,useRoutes } from 'react-router-dom';
import {login, PUBLIC} from "../tools/routes.jsx";
const token = localStorage.getItem("token");
const Page = () => {
    return (
        <div className={` ${token?"min-h-[90vh]":"min-h-[100vh]"} w-full bg-[#E5E5E5] pl-10 pr-10 pt-10`}>
            {
                useRoutes(token ? PUBLIC : login)
            }
        </div>
    );
};

export default Page;