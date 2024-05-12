import { useDispatch, useSelector } from "react-redux";
import { clearCompanyDetails, fetchCompanyDetails, leaveCompany } from "../features/company/companySlice";
import { useEffect } from "react";
import logoImage from '../assets/logo-no-background.png'
import { useTranslation } from "react-i18next";
import { MdDeleteOutline } from "react-icons/md";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Default styles
import { toast } from "react-toastify";


const CompanyComponent = ({companyData,role}) => {
    
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const theme = useSelector(state => state.userState.theme)
    const userId = useSelector(state => state.userState.user._id);
    
    const {id, name, address, city, code} = companyData;
    
    const boxShadowClass = theme === 'dracula' ? 'shadow-customDracula' : 'shadow-customWinter'

    // const handleDelete = () => {
    //     dispatch(clearCompanyDetails())
    //     dispatch(leaveCompany(userId));
    // }

    const handleDelete = () => {
        confirmAlert({
            title: t('companyComponentCompanyDelete'),
            message: t('companyComponentCompanySure'),
            buttons: [
                {
                    label: "ok",
                    onClick: () => {
                        dispatch(clearCompanyDetails());
                        dispatch(leaveCompany(userId))
                            .then(response => {
                                toast.success(t('succeeded'))
                            })
                            .catch(error => {
                                toast.error(t('fail'))
                            })
                    }
                },
                {
                    label: "No",
                    onClick: () => {}
                }
            ]
        })
    }
    return (
        <section className={`text-center py-10 lg:py-20 bg-base-200 rounded-lg ${boxShadowClass} mx-auto w-full lg:w-1/2`}>
            {role === 'user' &&
            <div className='flex flex-row justify-between rounded-lg p-2 my-2 bg-base-200'>
                <MdDeleteOutline onClick={handleDelete} className="w-6 h-6 cursor-pointer active:bg-violet-600 "/>
            </div>
            }
            <h1 className="">{name}</h1>
            <h1 className="">{address}</h1>
            <h1 className="">{city}</h1>
            <h1 className="">{t('companyComponentCompanyCode')}: {code}</h1>
            
        </section>
    )
    
}


export default CompanyComponent;