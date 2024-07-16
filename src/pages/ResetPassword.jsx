import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {resetPassword} from '../features/auth/authSlice'
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {token} = useParams();
    const navigate = useNavigate();

    const handleResetSubmit = async (event) => {

        event.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error(t('resetPassword-failPasswordNotSame'));
            return;
        }

        try {
            const actionResult = await dispatch(resetPassword({ token, newPassword }));
            const result = unwrapResult(actionResult);
            if (result.success) {

                toast.success(t('resetPassword-succesMessage'))
                navigate('/login')
            }
            
        } catch (error) {
            
            if (error.passwordtypeError) {
                toast.error(t('resetPassword-failTypeError'))
            } else {

                toast.error(t('resetPassword-fail'))
            }
        }
    }
    return (
        <section className="h-screen grid place-items-center bg-gradient-to-t from-slate-900">
            <form method="post" className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4" onSubmit={handleResetSubmit}>
                <h4 className="text-center text-3xl font-bold">{t('resetPassword-title')}</h4>
                <input type="password" placeholder={t('resetPassword-newpassPlaceholder')} value={newPassword} onChange={e => setNewPassword(e.target.value)} className="input input-bordered w-full" />
                <input type="password" placeholder={t('resetPassword-newpassAgainPlaceholder')} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="input input-bordered w-full" />
                <div className="mt-4">
                    <button type="submit" className="btn btn-primary w-full">{t('resetPassword-button')}</button>
                </div>
            </form>
        </section>

    )
}


export default ResetPassword;