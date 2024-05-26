import { Form, Link, redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { FormInput, SubmitBtn } from "../components";
import i18n from '../utils/i18n'



export const action = async ({request}) => {
    const formData = await request.formData();
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
        role: 'admin',
        companyDetails: {  // Muodosta companyDetails oikeaksi objektiksi
            name: formData.get('companyDetails[name]'),
            address: formData.get('companyDetails[address]'),
            city: formData.get('companyDetails[city]')
        }
    };
    // console.log("DATA",data);
    try {
        const response = await customFetch.post('/signupAdmin', data);
        // console.log("RESPONSE", response);

        
        toast.success(i18n.t('succeeded'));
        return redirect('/verifycode')
        // return redirect('/dashboard'); // Oletetaan, että käyttäjä ohjataan hallintapaneeliin
    } catch (error) {
        
        if (error.response.data.invalidData) {
            toast.error(i18n.t('signup-missingDataError'))
        } else if (error.response.data.existingUser) {
            toast.error(i18n.t('signup-userExist'))
        } else {
            // Yleinen virheviesti, jos error.response.data ei ole saatavilla
            toast.error(i18n.t('fail'));
        }
    }
    return null;
}

const AdminRegister = () => {

    const { t } = useTranslation();
    return (
        <section className="h-screen grid place-items-center bg-gradient-to-t from-slate-900">
            <Form method="post" className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
                <h4 className="text-center text-3xl font-bold">{t('adminregister-Linktext')}</h4>
                
                <FormInput type="email" label={t('loginLabelEmail')} name="email" />
                <FormInput type="password" label={t('loginLabelPass')} name="password" />
                
                {/* Yritystiedot */}
                <FormInput type="text" label={t('name')} name="companyDetails[name]" />
                <FormInput type="text" label={t('companyAddress')} name="companyDetails[address]" />
                <FormInput type="text" label={t('companyCity')} name="companyDetails[city]" />

                <div className="mt-4">
                    <SubmitBtn text={t('register')} />
                </div>
                
                {/* <p className="text-center">
                    {t('alreadyRegistered')} <Link to="/login" className="ml-2 link-hover link-primary capitalize">{t('login')}</Link>
                    
                </p> */}
                <p className="text-center">{t('adminregister-text')} <Link to="/register" className="ml-2 link-hover link-primary capitalize" >{t('registerStandardUser')}</Link> </p>
            </Form>
        </section>
    )

}


export default AdminRegister;