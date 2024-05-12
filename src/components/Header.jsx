import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, logout } from "../features/auth/authSlice";
import {clearCompanyDetails } from '../features/company/companySlice'
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Header = () => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showTooltip, setShowTooltip] = useState(false);
    const user = useSelector((state) => state.userState.user)
    
    

    const handleLogout = () => {
        dispatch(logout()).then(() => {
            navigate('/');
            dispatch(logoutUser())
            dispatch(clearCompanyDetails())

        })
    }
    const toggleTooltip = () => {
        setShowTooltip(!showTooltip);
    };

    const handleLinkClick = () => {
        setShowTooltip(false);
    };

    return (
        <header className="bg-neutral py-2 text-neutral-content">
            <div className="align-element flex justify-center sm:justify-end">

            {user ? 
                    <div className="flex gap-x-2 sm:gap-x-8 items-center relative">
                        <div className="flex items-center cursor-pointer" onClick={toggleTooltip}>
                            <p className="text-xs sm:text-sm">
                                {t('welcome')}, {user.email}
                            </p>
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                        {showTooltip && (
                            <div className="absolute top-full left-40 mt-5 p-5 bg-base-200 shadow-lg rounded z-50">
                                <ul>
                                    <li><Link to="/settings" className="text-blue-500 hover:text-blue-700">Settings</Link></li>
                                    <li><Link to="/profile" className="text-blue-500 hover:text-blue-700" onClick={handleLinkClick}>{t('profile')}</Link></li>
                                    <li><Link to="/help" className="text-blue-500 hover:text-blue-700">Help</Link></li>
                                </ul>
                            </div>
                        )}

                        <button className="btn btn-xs btn-outline btn-primary" onClick={handleLogout}>logout</button>
                    </div> :

                    <div className="flex gap-x-6 justify-center items-center">
                        <Link to="/login" className="link link-hover text-xs sm:text-sm" >
                            Sign in
                        </Link>
                        <Link to="/register" className="link link-hover text-xs sm:text-sm" >
                            create account
                        </Link>
                    </div>

                    }

                

            </div>

        </header>

    )
}

export default Header;