

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavLinks = () => {
    const {t,i18n} = useTranslation();
    const user = useSelector((state) => state.userState.user)

    const Links = [
        {id: 1, url: '/', text: 'home'},
        {id: 2, url: 'company', text: 'company'},
        {id: 3, url: 'worksites', text: 'worksites'},
        {id: 4, url: 'about', text: 'about'},
        {id: 5, url: '/pricing', text: 'pricing'}
    ]


    
    return (
        <>
        {Links.map((link) => {
            const {id,url,text} = link;
            if ((url === 'company' || url === 'worksites' || url == '/pricing') && !user) return null;
            if (url === "about" && user) return null
            return (
                <li key={id}>
                    <NavLink className="capitalize" to={url}>
                        {t(text)}
                    </NavLink>
                </li>
            )
        })}
        </>

    )
}


export default NavLinks;