import { Form, redirect } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { customFetch } from "../utils";
import { verifyUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import i18n from '../utils/i18n'
import { useTranslation } from "react-i18next";


export const action = (store)=> async({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    
    

    try {
        const response = await customFetch.post('/verify', data);
        console.log(response);
            if (response.status === 200) {
                store.dispatch(verifyUser())
                toast.success(i18n.t('verification-Success'))
                console.log("mennään profiiliin")
                return redirect('/profile');
            } else {
                toast.error(i18n.t('verification-error'))
                return null;
            }
            
        
        
        
    } catch (error) {
        console.log(error);
        toast.error(i18n.t('verification-error'))
        return null;
    }
}


const Verification = () => {
    const {t} = useTranslation();

    return (
        <section className="h-screen grid place-items-center">
            <Form method="post" className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
                <h4 className="text-center text-3xl font-bold">{t('verificationCode')}</h4>

                <FormInput type="email" label="email" name="email"/>
                <FormInput type="text" label="verification" name="verificationCode"/>

                <div className="mt-4">
                    <SubmitBtn text={t('verify')} />
                </div>
            </Form>
        </section>
    )

}

export default Verification;