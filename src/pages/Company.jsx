import { useDispatch, useSelector } from "react-redux";
import { store } from "../store";
import { customFetch } from "../utils";
import { useEffect } from "react";
import { fetchUserDetails } from "../features/auth/authSlice";
import {fetchCompanyDetails, fetchCompanyWorksites} from '../features/company/companySlice'
import { CompanyComponent } from "../components";
import logoImage from '../assets/logo-no-background.png'
import { useTranslation } from "react-i18next";


const Company = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const user = useSelector(state=> state.userState)
    const company = useSelector(state => state.companyState)
    const id = user.user._id;
    console.log("company", company)
    
    


    useEffect(() => {
        console.log("Company useEffect called");

            
                dispatch(fetchCompanyDetails())
                
            
        
        
        
    }, [dispatch]);
    
    
    const companyExists = company?.company;
    

    if (company.loading ) {
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
        <section className="h-screen" style={{backgroundImage: `url(${logoImage})`, backgroundSize: '50%', backgroundRepeat: 'no-repeat',backgroundPosition: "center", }}>
            <div className="mt-10">
            {companyExists ? <CompanyComponent companyData={companyExists}/> : <h1 className="text-center text-xl">{t('companyPageNoCompany')}</h1>}
            </div>
        </section>
    )
}

export default Company;