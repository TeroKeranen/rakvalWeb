
const Links = [
    {id: 1, url: '/', text: 'Etusivu'},
    {id: 2, url: 'company', text: 'Yritys'},
    {id: 3, url: 'worksites', text: 'Työmaat'},
    {id: 4, url: 'about', text: 'Tietoa'}
]

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavLinks = () => {

    const user = useSelector((state) => state.userState.user)
    
    return (
        <>
        {Links.map((link) => {
            const {id,url,text} = link;
            if ((url === 'company' || url === 'worksites') && !user) return null;
            return (
                <li key={id}>
                    <NavLink className="capitalize" to={url}>
                        {text}
                    </NavLink>
                </li>
            )
        })}
        </>

    )
}


export default NavLinks;