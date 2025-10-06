import React from 'react';
import { Routes, Route,useRoutes } from 'react-router-dom';
import {PUBLIC} from "../tools/routes.jsx";

const Page = () => {
    return (
        <div className={`min-h-[90vh] w-full bg-[#E5E5E5] pl-10 pr-10 pt-10`}>
            {
                useRoutes(PUBLIC)
            }
        </div>
    );
};

export default Page;