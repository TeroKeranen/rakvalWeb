import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyWorksites,fetchCompanyDetails } from "../features/company/companySlice";
import {fetchUserDetails} from "../features/auth/authSlice"
import { WorksitesComponent } from "../components";

import { useTranslation } from "react-i18next";


const Worksites = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const company = useSelector(state => state.companyState);
    const user = useSelector(state=> state.userState)
    const userInfo = user.user;
    const userRole = userInfo.role
    const isCompany = user.user?.company;
    
 


    useEffect(() => {
        if (userInfo) {
            
            dispatch(fetchUserDetails(user.user._id));
        }
       
    },[])
    
    useEffect(() => {
        if (isCompany) {

            dispatch(fetchCompanyWorksites());
        }
    }, [dispatch, isCompany])

    const renderNoCompany = () => {
        return(
            <div className="mt-10 h-screen">

                <h1 className="text-center text-lg">{t('nodata')}</h1>
            </div>
        )
    }

    const worksite = company?.worksites;

    return (
        
        <div className="">
            {worksite ? <WorksitesComponent worksites={worksite} userInfo={userInfo} userRole={userRole}/> : renderNoCompany()}
        </div>
    )
}

export default Worksites;