import { useDispatch, useSelector } from "react-redux";
import { store } from "../store";
import { customFetch } from "../utils";
import { useEffect } from "react";
import { fetchUserDetails } from "../features/auth/authSlice";
import {fetchCompanyDetails, fetchCompanyWorksites} from '../features/company/companySlice'
import { CompanyComponent } from "../components";


const Company = () => {
    const dispatch = useDispatch();
    const user = useSelector(state=> state.userState)
    const company = useSelector(state => state.companyState)
    const id = user.user._id;
    
    
    


    useEffect(() => {
        console.log("Company useEffect called");

            
            dispatch(fetchCompanyDetails())
        
        
        
    }, [dispatch]);
    
    
    const companyExists = company?.company;
    

    if (company.loading || !companyExists) {
        return (
            <section className="text-center">
                <span className="loading loading-spinner loading-xs bg-green-900"></span>
                <span className="loading loading-spinner loading-sm bg-green-800"></span>
                <span className="loading loading-spinner loading-md bg-green-700"></span>
                <span className="loading loading-spinner loading-lg bg-green-600"></span>
            </section>
        )
    }
    

    return (
        <section className="">
            {companyExists ? <CompanyComponent companyData={companyExists}/> : <h1>eilöydy</h1>}
        </section>
    )
}

export default Company;