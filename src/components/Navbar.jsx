
import { NavLink } from "react-router-dom";
import {BsCart3, BsMoonFill, BsSunFill} from 'react-icons/bs'
import {FaBarsStaggered} from 'react-icons/fa6'
import NavLinks from "./NavLinks";
import { useDispatch } from "react-redux";
import { toggleTheme,logoutUser } from "../features/auth/authSlice";
import logoImage from '../assets/logo-no-background.png'
import { useTranslation } from 'react-i18next';






const Navbar = () => {

    const { i18n } = useTranslation();
    const dispatch = useDispatch()

    const handleTheme = () => {
        
        dispatch(toggleTheme());
        
        
    }

        // Kielenvaihtofunktio, joka tarkistaa nykyisen kielen ja vaihtaa sen
    const toggleLanguage = () => {
        const currentLanguage = i18n.language;
        const newLanguage = currentLanguage === 'en' ? 'fi' : 'en';
        i18n.changeLanguage(newLanguage);
    }
    

    return (
        <nav className="bg-base-200">
            <div className="navbar align-element">
                <div className="navbar-start">
                    {/* TITLE */}
                    <NavLink to="/" className="hidden lg:flex btn btn-neutral text-3xl items-center">
                        Rakival
                    </NavLink>
                    {/* {DROPDOWN} */}
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <FaBarsStaggered className="h-6 w-6"/>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
                            <NavLinks />
                        </ul>
                    </div>
                </div>
                <div className="navbard-center hidden lg:flex">
                    <ul className="menu menu-horizontal">
                        <NavLinks />
                    </ul>
                </div>
                <div className="navbard-end">
                    {/* theme setup */}

                    <label className="swap swap-rotate">
                        <input type="checkbox" onChange={handleTheme} />
                        {/* sun icon */}
                        <BsSunFill className="swap-on h-4 w-4" />
                        {/* moon icon */}
                        <BsMoonFill className="swap-off h-4 w-4" />
                    </label>
                    <button onClick={toggleLanguage}>Switch to English</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar