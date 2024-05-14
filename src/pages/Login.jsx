import { FormInput, SubmitBtn } from "../components";
import { Form, Link,redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { loginUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getTokenExpiry } from "../utils/calculateTokenExp";
import { useTranslation } from "react-i18next";
import i18n from '../utils/i18n'


export const action = (store) => async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    

    try {
        const response = await customFetch.post('/signin', data)
        
        if (response.status === 200) {
            const tokenExpiry = getTokenExpiry(response.data.accessToken);

            const userData = {
                ...response.data,
                tokenExpiry
            }
            
            store.dispatch(loginUser(userData))
                
            
            // console.log(response);
            return redirect('/');
        }
        // return null;
    } catch (error) {
        
        toast.error(i18n.t('fail'));
        
        return null;
    }
}

const Login = () => {
    const {t} = useTranslation();
    
    return (
        <section className="h-screen grid place-items-center bg-gradient-to-t from-slate-900">
            

                <Form method="post" className="card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">

                    <h4 className="text-center text-3xl font-bold">{t('loginbtn')}</h4>

                    <FormInput 
                        type="email" 
                        label={t('loginLabelEmail')} 
                        name="email" 
                        defaultValue=""
                        />
                    <FormInput 
                        type="password"
                        label={t('loginLabelPass')}
                        name="password"
                        defaultValue=""
                        />
                    <div className="mt-4">
                        <SubmitBtn text={t('loginbtn')} />
                    </div>
                    <p className="text-center">{t('loginText')} <Link to="/register" className="ml-2 link link-hover link-primary capitalize">{t('register')}</Link> </p>
                </Form>
            
        </section>
    )
}

export default Login;