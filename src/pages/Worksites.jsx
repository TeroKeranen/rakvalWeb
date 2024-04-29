import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyWorksites } from "../features/company/companySlice";
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
        if (isCompany) {

            dispatch(fetchCompanyWorksites());
        }
    }, [dispatch, isCompany])

    const renderNoCompany = () => {
        return(
            <div className="mt-10">

                <h1 className="text-center text-lg">{t('nodata')}</h1>
            </div>
        )
    }

    const worksite = company?.worksites;

    return (
        
        <div >
            {worksite ? <WorksitesComponent worksites={worksite} userInfo={userInfo} userRole={userRole}/> : renderNoCompany()}
        </div>
    )
}

export default Worksites;