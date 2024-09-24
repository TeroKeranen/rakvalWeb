import { useDispatch, useSelector } from "react-redux";
import { store } from "../store";
import { customFetch } from "../utils";
import { useEffect, useState } from "react";
import { fetchUserDetails, fetchUser } from "../features/auth/authSlice";
import {fetchCompanyDetails, fetchCompanyWorksites,updateUsersRole} from '../features/company/companySlice'
import { CompanyComponent, JoinCompany } from "../components";
import logoImage from '../assets/logo-no-background.png'
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";



const Company = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const user = useSelector(state=> state.userState)
    const theme = useSelector(state => state.userState.theme)
    const companyLoading = useSelector(state => state.companyState)
    const company = useSelector(state => state.companyState.company);
    const id = user.user._id;
    const role = user.user.role;    
     const boxShadowClass = theme === 'dracula' ? 'shadow-customDracula' : 'shadow-customWinter'
    const [workersDetails, setWorkersDetails] = useState([]);
    const [checkedState, setCheckedState] = useState({});
    const [workersLoading, setWorkersLoading] = useState(true);

    
    

    useEffect(() => {
        if (!company) {
            
            dispatch(fetchCompanyDetails());
            
        }
    }, [dispatch]);
    
    useEffect(() => {

        if (company && company.workers.length > 0) {
            const fetchWorkersDetails = async () => {
                setWorkersLoading(true);
                const workersData = await Promise.all(
                    company.workers.map(workerId => 
                        dispatch(fetchUser(workerId)).unwrap()
                    )
                )
                setWorkersDetails(workersData)

                     // Alusta checkboxien tila vastaamaan työntekijöiden nykyisiä rooleja
                    const initialCheckedState = workersData.reduce((state, worker) => {
                        state[worker._id] = worker.role === "admin" || worker.role === "superAdmin";
                        return state;
                    }, {});
                    setCheckedState(initialCheckedState);
                    setWorkersLoading(false); 
            }
            fetchWorkersDetails();
        } else {
            setWorkersLoading(false); 
        }

    }, [dispatch, company])
    
    const companyExists = company;

    const confirmRoleChange = (worker, newRole) => {
        confirmAlert({
            title: t('companyScreen-roleChange'),
            message: `${t('companyScreen-roleChange-sure')} ${newRole === 'admin' ? t('companyScreen-roleChange-admin') : t('companyScreen-roleChange-user')}?`,
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => {
                        
                        dispatch(updateUsersRole({userId:worker._id, newRole}))
                            .then(response => {
                                toast.success(t('succeeded'))
                                // Päivitä checkboxin tila, kun roolin vaihto on vahvistettu
                                setCheckedState(prevState => ({
                                    ...prevState,
                                    [worker._id]: newRole === "admin"
                                }));
                            })
                            .catch(error => {
                                toast.error(t('fail'))
                            })
                    }
                },
                {
                    label: t('no'),
                    onClick: () => {
                        // Jos roolin vaihto perutaan, palautetaan checkboxin tila
                        setCheckedState(prevState => ({
                            ...prevState,
                            [worker._id]: worker.role === "admin" || worker.role === "superAdmin"
                        }));
                    }
                    
                }
            ]
        })
    }
    
    
    
    

    if (companyLoading.loading || workersLoading ) {
        return (
            <section className="text-center h-screen">
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
                {companyExists ? (
                    <>
                        <CompanyComponent companyData={companyExists} role={role} />

                        <div className="m-10">

                                {role === "admin" || role === "superAdmin" &&
                            <div className={` bg-base-200 rounded-lg ${boxShadowClass} mx-auto w-full lg:w-1/2`}>
                                <div className=" text-center p-4">
                                    
                                    <h2 className="text-2xl font-bold">{t('companyScreen-titleTwo')}</h2>
                                </div>
                                <div className={` text-center py-10 lg:py-20 bg-base-200 rounded-lg  mx-auto w-full lg:w-1/2`}>

                                {/* <div className="bg-base-200 mt-5 border flex flex-col  items-center w-1/2"> */}
                                    <ul>
                                        {workersDetails.map(worker => (
                                            
                                            // <li key={worker._id} className="my-2">
                                            //     <p>{worker.email} - {worker.name}</p>
                                            // </li>
                                            
                                            <div className="form-control" key={worker._id}>
                                                <label className="label cursor-pointer">
                                                <span className="label-text">{worker.email}</span>
                                                <input type="checkbox" className="toggle" checked={checkedState[worker._id] || false} onChange={(e) => {const newRole = e.target.checked ? 'admin' : 'user'; confirmRoleChange(worker, newRole)}}/>
                                                </label>
                                            </div>

                                    ))}
                                    </ul>
                                </div>
                            </div>
                                }
                        
                        </div>
                    </>
                ) : (
                    <JoinCompany userInfo={user} />
                )}
            </div>
            
        </section>
    )
}

export default Company;