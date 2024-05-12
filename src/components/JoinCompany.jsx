import { Form } from "react-router-dom";
import FormInput from "./Forminput";
import SubmitBtn from "./SubmitBtn";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCompany, joinCompany } from "../features/company/companySlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";



const JoinCompany = ({userInfo}) => {
    const {role, _id} = userInfo.user;
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const isCompany = userInfo.user.company;
    const [isLoading, setIsLoading] = useState(false);
    const theme = useSelector(state => state.userState.theme) 
    const boxShadowClass = theme === 'dracula' ? 'shadow-customDracula' : 'shadow-customWinter'

    

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        
        try {
            const result = await dispatch(addCompany(data)).unwrap()
            
            if (result.success) {
                setIsLoading(false);
                toast.success(t('JoinCompany-createCompanySuccess'))
            } else {
                setIsLoading(false);
                toast.error(t('fail'))
            }
        } catch (error) {
            setIsLoading(false);
            console.log("error");
            toast.error(t('fail'))
        }



        
    }

    const handleUserSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        
        try {
            const result = await dispatch(joinCompany({
                userId: _id,
                companyCode: data.companyCode
            })).unwrap();
            if (result.success) {
                toast.success(t('succeeded'));
            }
        } catch (error) {
            toast.error(t('fail'));
            
        }
    }


    if (isLoading) {
        return (

    <section className="text-center">
                        <span className="loading loading-spinner loading-xs bg-green-900"></span>
                        <span className="loading loading-spinner loading-sm bg-green-800"></span>
                        <span className="loading loading-spinner loading-md bg-green-700"></span>
                        <span className="loading loading-spinner loading-lg bg-green-600"></span>
                    </section>
        )
    }

    

    const renderAdminForm = () => {
        return (
            <section className="">
                
                <Form onSubmit={handleSubmit} method="post" className={`card w-full md:w-96 mx-auto  p-8 bg-base-100 flex flex-col gap-y-4 ${boxShadowClass}`}>

                    <FormInput 
                        type="text"
                        label={t('name')}
                        name="name"
                        defaultValue=""
                        />

                    <FormInput 
                        type="text"
                        label={t('address')}
                        name="address"
                        defaultValue=""
                        />
                    <FormInput 
                        type="text"
                        label={t('city')}
                        name="city"
                        defaultValue=""
                        />
                    <div className="mt-4">
                        <SubmitBtn text="Lähetä" />
                    </div>

                </Form>                       

            </section>
        )
    }

    const renderUserForm = () => {
        return (
            <section>
                
                <Form onSubmit={handleUserSubmit} method="post" className={`card w-full md:w-96 mx-auto  p-8 bg-base-100 flex flex-col gap-y-4 ${boxShadowClass}`}>
                    <p>{t('joinCompanyText')}</p>
                    <FormInput 
                        type="text"
                        label={t('joinCompanyCode')}
                        name="companyCode"
                        defaultValue=""
                        />


                    <div className="mt-4">
                        <SubmitBtn text="Lähetä" />
                    </div>

                </Form> 
        </section>
        )
    }
    return (
        <div>
            {role === 'admin' ? renderAdminForm() : renderUserForm()}
        </div>
    )

}


export default JoinCompany;