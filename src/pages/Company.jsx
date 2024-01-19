import { useDispatch, useSelector } from "react-redux";
import { store } from "../store";
import { customFetch } from "../utils";
import { useEffect } from "react";
import { fetchUserDetails } from "../features/auth/authSlice";
import {fetchCompanyDetails} from '../features/company/companySlice'
import { CompanyComponent } from "../components";


const Company = () => {
    const dispatch = useDispatch();
    const user = useSelector(state=> state.userState)
    const company = useSelector(state => state.companyState)
    const id = user.user._id;
    
    

    useEffect(() => {
        dispatch(fetchUserDetails(id));
    },[id, dispatch])


    useEffect(() => {
        dispatch(fetchCompanyDetails())
    }, [dispatch]);
    
    
    const companyExists = company?.company;
    

    return (
        <section>
            {companyExists ? <CompanyComponent companyData={companyExists}/> : <h1>eilöydy</h1>}
        </section>
    )
}

export default Company;