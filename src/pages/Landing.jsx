import { useDispatch, useSelector } from "react-redux";
import {fetchCompanyDetails, fetchCompanyWorksites} from '../features/company/companySlice'
import { useEffect } from "react";
import { fetchUserDetails } from "../features/auth/authSlice";
import { LoggedInLanding, LoggedOutLanding } from "../components";




export const loader = () => {
    return null;
}
const Landing = () => {

    const dispatch = useDispatch();
    const testi = useSelector(state => state.companyState);
    const userState = useSelector(state => state.userState);
    const userId = userState?.user?._id
    
    
    useEffect(() => {
        
        
        // dispatch(fetchCompanyDetails())
        dispatch(fetchUserDetails(userId))
        
        
        
    }, [dispatch]);
    
    // console.log("käyttäjä", user);

    if (!userState.user) {
        return (
            <LoggedOutLanding />
        )
    }
    return (
        <LoggedInLanding />
    )
}

export default Landing;