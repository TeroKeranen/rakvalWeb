import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {resetPasswordRequest} from '../features/auth/authSlice';
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleResetPasswordRequest = async (event) => {
        event.preventDefault();

        if (email.includes('@')) {
            try {
                const actionResult = await dispatch(resetPasswordRequest(email));
                const result = unwrapResult(actionResult);

                if (result.success) {
                    toast.success('Resetointilinkki lähetetty onnistuneest, jos sähköpostia ei löydy saapuneista, tarkista roskaposti')
                    navigate('/');
                }

                
            } catch (error) {

                
                if (error.noUser) {
                    toast.error("Jotain meni väärin, yritä uudestaan.")
                } else {
                    toast.error(t('fail'))
                }
                
                
            }
        }
    }

    return (
        <section className="h-screen grid place-items-center bg-gradient-to-t from-slate-900">
            <form method="post" className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4" onSubmit={handleResetPasswordRequest}>
                <h4 className="text-center text-3xl font-bold">Syötä sähköpostiosoitteesi</h4>
                <input type="text" placeholder="Sähköpostiosoite" value={email} onChange={e => setEmail(e.target.value)} className="input input-bordered w-full" />
                <div className="mt-4">
                    <button type="submit" className="btn btn-primary w-full">Lähetä resetointilinkki</button>
                </div>
            </form>
        </section>
    )
}

export default ForgotPassword;