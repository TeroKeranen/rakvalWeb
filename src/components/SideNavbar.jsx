

import { NavLink } from "react-router-dom"
import Floorplan from "./Floorplan";
import WorkEntries from "./WorkEntries";
import { useState } from "react";
import { FaHandPointer } from "react-icons/fa6";
import WorksiteCalendar from "./WorksiteCalendar";
import WorksiteWorkers from "./WorksiteWorkers";




const SideNavbar = ({onLinkClick, address}) => {
    const [selectedId, setSelectedId] = useState(null);
    const links = [
        // {id: 1, component: Floorplan, text: "Pohjakuva"},
        // {id: 2, component: WorkEntries, text: "Kirjaukset"},
        // {id: 3, component: WorksiteCalendar, text: "Kalenteri"},
        // {id: 4, component: WorksiteWorkers, text: "Työntekijät"}
        {id: 1, componentType: 'floorplan', text: "Pohjakuva"},
        {id: 2, componentType: 'workEntries', text: "Kirjaukset"},
        {id: 3, componentType: 'worksiteCalendar', text: "Kalenteri"},
        {id: 4, componentType: 'worksiteWorkers', text: "Työntekijät"}
    ]

    return (
       
        <section className="flex flex-col ">

            <div className="mx-auto">
                <h1 className="text-gray-600 text-xl font-bold mb-4">{address}</h1>
            </div>

            <div className="flex flex-row  lg:flex-col">
                {links.map((link) => (
                    <li key={link.id} className={`text-gray-600 border-2 py-2 cursor-pointer ${selectedId === link.id ? 'bg-blue-200 p-1' : ''}`} onClick={() => {
                        onLinkClick(link.componentType);
                        setSelectedId(link.id);
                    }}>
                        {link.text}
                    </li>
                ))}
            </div>
        </section>
        
        
    )

}

export default SideNavbar

