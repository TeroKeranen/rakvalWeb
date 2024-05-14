import { FormInput, SubmitBtn } from "../components";
import { Form, Link,redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import i18n from '../utils/i18n'
import { useTranslation } from "react-i18next";

export const action = async ({request}) => {
    
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    
    try {
        const response = await customFetch.post('/signup', data)
        console.log("RESPONSE", response)
        toast.success(i18n.t('register-success'))
        return redirect('/verifycode')
    } catch (error) {
        console.log("ERRORRR",error.response.data.existingUser);
        if (error && error.response.data.existingUser) {
            toast.error(i18n.t('register-userExist'))
        }
    }
    return null;
}



const Register = () => {

    const {t} = useTranslation();
    return (
        <section className="h-screen grid place-items-center bg-gradient-to-t from-slate-900">
            

              <Form method="post" className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
                <h4 className="text-center text-3xl font-bold">{t('register')}</h4>
                
                <FormInput type="email" label={t('loginLabelEmail')} name="email" />
                <FormInput type="password" label={t('loginLabelPass')} name="password" />

                <div className="mt-4">
                    <SubmitBtn text={t('register')} />
                </div>
              
                <p className="text-center">{t('RegisterText')} <Link to="/login" className="ml-2 link-hover link-primary capitalize" >{t('login')}</Link> </p>
              
              </Form>
            
        </section>
    )
}

export default Register;