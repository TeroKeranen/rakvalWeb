import { useDispatch, useSelector } from "react-redux";
import {fetchCompanyDetails, fetchCompanyWorksites, fetchEvents} from '../features/company/companySlice'
import { useEffect, useState } from "react";
import { fetchUserDetails } from "../features/auth/authSlice";
import { LoggedInLanding, LoggedOutLanding } from "../components";




export const loader = () => {
    return null;
}
const Landing = () => {

    const dispatch = useDispatch();
    const companyState = useSelector(state => state.companyState);
    const userState = useSelector(state => state.userState);
    const userId = userState?.user?._id

    // const company = useSelector(state => state.companyState.company);

    // useEffect(() => {
    //     if (!company) {
    //         console.log("ei companyä")
    //         dispatch(fetchCompanyDetails());
    //     }
    // }, [dispatch]);
    

    const worksites = companyState.worksites || [];

    const [events, setEvents] = useState([])
    
    
    
    
    useEffect(() => {
        
        if (userId) {

            // dispatch(fetchCompanyDetails())
            dispatch(fetchUserDetails(userId))
            // dispatch(fetchCompanyDetails())
            dispatch(fetchCompanyWorksites());
            dispatch(fetchEvents());
        }
    
    }, [dispatch]);


    
    // Etsitään tapahtumat ja käännetään ne siten että uusimmat tulee listan ekaksi...
    useEffect(() => {
        if (companyState.events) {
            const reservedEvents = [...companyState.events].reverse();
            setEvents(reservedEvents);
        }
    }, [companyState.events])
    
    

    

    if (!userState.user) {
        return (
            <LoggedOutLanding />
        )
    }
    return (
        <LoggedInLanding events={events} worksites={worksites} userInfo={userState}/>
    )
}

export default Landing;