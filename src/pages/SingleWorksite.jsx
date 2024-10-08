import { createElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleWorksite, clearWorksiteDetails, fetchCompanyProducts } from "../features/company/companySlice";
import { Outlet, useParams } from "react-router-dom";
import { AddFloorplanImg, Floorplan, Products, SideNavbar, SingleWorksiteLanding, WorkEntries, WorkEntriesButton, WorksiteWorkers } from "../components";
import WorksiteCalendar from "../components/WorksiteCalendar";

const SingleWorksite = () => {
    const {id} = useParams();
    
    const dispatch = useDispatch();
    const company = useSelector(state => state.companyState)
    const userRole = useSelector(state => state.userState.user.role);
    const [ActiveComponent, setActiveComponent] = useState(null);
    const worksiteDetails = company?.worksiteDetails
    const worksiteId = worksiteDetails?._id;
    const companyId = company?.company?._id
    
    
    

    
    
    const handleLinkClick = (componentType) => {
        setActiveComponent(componentType);
    }

    useEffect(() => {
        if (!worksiteDetails) {
            dispatch(fetchSingleWorksite(id))
            fetchCompanyProducts(companyId)
        }
    },[dispatch, worksiteDetails])

    useEffect(() => {
        dispatch(fetchSingleWorksite(id))

        return () => {
            dispatch(clearWorksiteDetails());
        }
    }, [id,dispatch])
    
    
    // console.log("testi",worksiteDetails);

    if (company.loading || !worksiteDetails) {
        return (
            <section className="text-center h-screen">
                <span className="loading loading-spinner loading-xs bg-green-900"></span>
                <span className="loading loading-spinner loading-sm bg-green-800"></span>
                <span className="loading loading-spinner loading-md bg-green-700"></span>
                <span className="loading loading-spinner loading-lg bg-green-600"></span>
            </section>
        )
    }

    
    return (
        // <section className="text-center ">
        //     <h1>{worksiteDetails._id}</h1>
        //     <h1>{worksiteDetails.address}</h1>

        // </section>
        <div className="flex flex-col lg:flex-row ">
        {/* Sivunavigaatio */}
            <div className="w-full lg:w-1/6 bg-slate-100 p-4 lg:min-h-screen overflow-y-auto">
                    <ul className="flex flex-row justify-around lg:flex-col lg:space-y-0">
                        <SideNavbar userRole={userRole} onLinkClick={handleLinkClick} address={worksiteDetails.address} setActiveComponent={setActiveComponent}/>
                    </ul>
                
            </div>
            
            {/* Sisältö */}
            <div className="flex flex-col justify-center items-center w-full lg:w-3/4 p-4 mx-auto">
                {!ActiveComponent && <SingleWorksiteLanding worksiteDetails={worksiteDetails}/>}
                {ActiveComponent === 'floorplan' && <AddFloorplanImg worksiteId={id}/>}
                {/* {ActiveComponent === 'workEntries' && <WorkEntriesButton />} */}
                
                {/* {ActiveComponent === 'worksiteWorkers' && <h1>työntrekijät</h1>} */}
                {/* {ActiveComponent ? createElement(ActiveComponent) : <div>valitse komponentti</div>}
                 */}
                {ActiveComponent === 'floorplan' && <Floorplan />}
                {ActiveComponent === 'workEntries' && <WorkEntries />}
                {ActiveComponent === 'worksiteCalendar' && <WorksiteCalendar />}
                {ActiveComponent === 'worksiteWorkers' && <WorksiteWorkers />}
                {ActiveComponent === 'products' && <Products worksiteDetails={worksiteDetails}/>}
                
            </div>
        </div>
    )
}

export default SingleWorksite;