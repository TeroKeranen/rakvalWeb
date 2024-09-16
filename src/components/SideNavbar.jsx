

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdArrowBack } from "react-icons/md";





const SideNavbar = ({userRole,onLinkClick, address, setActiveComponent}) => {

    
    const [selectedId, setSelectedId] = useState(null);
    const {t} = useTranslation();
    const links = [
        // {id: 1, component: Floorplan, text: "Pohjakuva"},
        // {id: 2, component: WorkEntries, text: "Kirjaukset"},
        // {id: 3, component: WorksiteCalendar, text: "Kalenteri"},
        // {id: 4, component: WorksiteWorkers, text: "Työntekijät"}
        {id: 1, componentType: 'floorplan', text: t('sidenavbarFloorPlan')},
        {id: 2, componentType: 'workEntries', text: t('sidenavbarEntries')},
        {id: 3, componentType: 'worksiteCalendar', text: t('sidenavbarCalendar')},
        {id: 4, componentType: 'worksiteWorkers', text: t('sidenavbarWorkers')},
        {id: 5, componentType: 'products', text: t('sidenavbarProducts')}
    ]

    return (
       
        <section className="flex flex-col">

            <div className="mx-auto">
                
                <h1 className="flex flex-row hover:text-fuchsia-800 cursor-pointer text-gray-600 text-xl font-bold mb-4 " onClick={() => {
                     setActiveComponent(null);
                     setSelectedId(null);
                }}>{address}</h1>
            </div>

            <div className="flex flex-row flex-wrap justify-center items-center lg:flex-col lg:items-stretch">
                {links.map((link) => {

                    if (link.componentType === 'worksiteWorkers' && userRole !== 'admin' && userRole !== 'superAdmin') {
                        return null;
                    }
                    return (

                        <li key={link.id} className={`hover:bg-base-200 hover:text-white text-gray-600 border-2 rounded-lg p-2 my-2 mx-1 lg:mx-0 cursor-pointer ${selectedId === link.id ? 'bg-blue-200 p-1' : ''}`} onClick={() => {
                            onLinkClick(link.componentType);
                            setSelectedId(link.id);
                        }}>
                            <p className="text-sm md:text-base">{link.text}</p>
                        </li>
                        )
                    })}
            </div>
        </section>
        
        
    )

}

export default SideNavbar

