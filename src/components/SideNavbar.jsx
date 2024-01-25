

import { NavLink } from "react-router-dom"
import Floorplan from "./Floorplan";
import WorkEntries from "./WorkEntries";
import { useState } from "react";
import { FaHandPointer } from "react-icons/fa6";
import WorksiteCalendar from "./WorksiteCalendar";
import WorksiteWorkers from "./WorksiteWorkers";




const SideNavbar = ({onLinkClick}) => {
    const [selectedId, setSelectedId] = useState(null);
    const links = [
        {id: 1, component: Floorplan, text: "Pohjakuva"},
        {id: 2, component: WorkEntries, text: "Kirjaukset"},
        {id: 3, component: WorksiteCalendar, text: "Kalenteri"},
        {id: 4, component: WorksiteWorkers, text: "Työntekijät"}
    ]

    return (
       
        <>
            {links.map((link) => (
                <li key={link.id} className={`text-gray-600 border-2 py-2 cursor-pointer ${selectedId === link.id ? 'bg-blue-200 p-1' : ''}`} onClick={() => {
                    onLinkClick(link.component);
                    setSelectedId(link.id);
                }}>
                    {link.text}
                </li>
            ))}
        </>
        
        
    )

}

export default SideNavbar

// {Links.map((link) => {
//     const {id,url,text} = link;
//     if ((url === 'company' || url === 'worksites') && !user) return null;
//     return (
//         <li key={id}>
//             <NavLink className="capitalize" to={url}>
//                 {text}
//             </NavLink>
//         </li>
//     )
// })}
