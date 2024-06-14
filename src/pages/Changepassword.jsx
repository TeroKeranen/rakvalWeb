import { Form, useNavigate } from "react-router-dom";
import { FormInput } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { useTranslation } from "react-i18next";


const Changepassword = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const user = useSelector(state => state.userState)
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        
        
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        
        // const newData = {...data, worktype:workType}
        
        if (data.newPassword !== data.newPasswordAgain) {
            toast.error(t('fail'))
            setIsLoading(false)
            return;
        }
        
            
            dispatch(changePassword({oldPassword:data.oldPassword, newPassword:data.newPassword}))
                .unwrap()
                .then((response) => {
                    
                    if (response.passwordtypeError) {
                        toast.error(t('register-passregexErr'))
                        setIsLoading(false)
                    } else if (response.success) {
                        toast.success(t('succeeded'))
                        navigate(-1); // Palaa takaisin edelliselle sivulle
                        setIsLoading(false)

                    }

                })
                .catch((error) => {
                    
                    toast.error(error.message || 'error changing password')
                    setIsLoading(false)
                })
                
        
        
        
    
    
        
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

    return (
        <section className="h-screen grid place-items-center">
            

                <Form method="post" onSubmit={handleSubmit} className="card lg:w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">

                    <h4 className="text-center text-3xl font-bold">{t('changePassword')}</h4>

                    <FormInput 
                        type="password" 
                        label={t('changePasswordOld')}
                        name="oldPassword" 
                        defaultValue=""
                        />
                    <FormInput 
                        type="password"
                        label={t('changePasswordNew')}
                        name="newPassword"
                        defaultValue=""
                        />
                    <FormInput 
                        type="password"
                        label={t('changePasswordNewRepeat')}
                        name="newPasswordAgain"
                        defaultValue=""
                        />
                    
                   

                   

                    <div className="mt-4">
                        {/* <SubmitBtn text="lisää" />
                         */}
                         <button type="submit" className="btn btn-primary btn-block">
                            {t('changePassword')}
                         </button>
                    </div>
                    
                </Form>
            
        </section>
    )

}


export default Changepassword;