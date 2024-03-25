import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyWorksites } from "../features/company/companySlice";
import { WorksitesComponent } from "../components";


const Worksites = () => {

    const dispatch = useDispatch();
    const company = useSelector(state => state.companyState);
    const user = useSelector(state=> state.userState)
    const userInfo = user.user;
    
    ///CONSOLE LOGGAA USER, COMAPNY, USERiNFO
    console.log("companyInfo", company);
    console.log("userInfo", user)
    

    useEffect(() => {
        dispatch(fetchCompanyWorksites());
    }, [dispatch])

    

    const worksite = company?.worksites;

    return (
        <>
            {worksite ? <WorksitesComponent worksites={worksite} userInfo={userInfo}/> : <h1>ei dataa</h1>}
        </>
    )
}

export default Worksites;