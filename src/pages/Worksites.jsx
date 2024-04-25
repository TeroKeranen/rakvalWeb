import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyWorksites } from "../features/company/companySlice";
import { WorksitesComponent } from "../components";
import logoImage from '../assets/logo-no-background.png'


const Worksites = () => {

    const dispatch = useDispatch();
    const company = useSelector(state => state.companyState);
    const user = useSelector(state=> state.userState)
    const userInfo = user.user;
    const userRole = userInfo.role
    
    
    

    useEffect(() => {
        dispatch(fetchCompanyWorksites());
    }, [dispatch])

    

    const worksite = company?.worksites;

    return (
        
        <div >
            {worksite ? <WorksitesComponent worksites={worksite} userInfo={userInfo} userRole={userRole}/> : <h1>ei dataa</h1>}
        </div>
    )
}

export default Worksites;