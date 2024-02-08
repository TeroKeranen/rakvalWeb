import { useDispatch, useSelector } from "react-redux";
import {fetchCompanyDetails, fetchCompanyWorksites} from '../features/company/companySlice'
import { useEffect } from "react";




export const loader = () => {
    return null;
}
const Landing = () => {

    const dispatch = useDispatch();
    const testi = useSelector(state => state.companyState);

    


    useEffect(() => {
        

            dispatch(fetchCompanyDetails())
        
        
        
    }, [dispatch]);


    return (
        <h1>Landing </h1>
    )
}

export default Landing;