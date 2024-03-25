import { useDispatch, useSelector } from "react-redux";
import {fetchCompanyDetails, fetchCompanyWorksites} from '../features/company/companySlice'
import { useEffect } from "react";
import { fetchUserDetails } from "../features/auth/authSlice";




export const loader = () => {
    return null;
}
const Landing = () => {

    const dispatch = useDispatch();
    const testi = useSelector(state => state.companyState);
    const user = useSelector(state => state.userState);
    const userId = user?.user?._id
    console.log("landing", user);
    
    useEffect(() => {
        
        
        // dispatch(fetchCompanyDetails())
        dispatch(fetchUserDetails(userId))
        
        
        
    }, [dispatch]);
    
    // console.log("käyttäjä", user);

    return (
        <h1>Landing </h1>
    )
}

export default Landing;