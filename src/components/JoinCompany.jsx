import { Form } from "react-router-dom";
import FormInput from "./Forminput";
import SubmitBtn from "./SubmitBtn";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCompany, joinCompany } from "../features/company/companySlice";



const JoinCompany = ({userInfo}) => {
    const {role, _id} = userInfo.user;
    const dispatch = useDispatch();
    
    const isCompany = userInfo.user.company;
    const theme = useSelector(state => state.userState.theme) 
    const boxShadowClass = theme === 'dracula' ? 'shadow-customDracula' : 'shadow-customWinter'

    

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        
        try {
            await dispatch(addCompany(data)).unwrap()
        } catch (error) {
            console.log("error");
        }



        
    }

    const handleUserSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        
        try {
            await dispatch(joinCompany({
                userId: _id,
                companyCode: data.companyCode
            })).unwrap();
        } catch (error) {
            console.log("Error joining company:", error);
        }
    }

    

    const renderAdminForm = () => {
        return (
            <section className="">
                
                <Form onSubmit={handleSubmit} method="post" className={`card w-full md:w-96 mx-auto  p-8 bg-base-100 flex flex-col gap-y-4 ${boxShadowClass}`}>

                    <FormInput 
                        type="text"
                        label="name"
                        name="name"
                        defaultValue=""
                        />

                    <FormInput 
                        type="text"
                        label="address"
                        name="address"
                        defaultValue=""
                        />
                    <FormInput 
                        type="text"
                        label="city"
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
                    <p>Tarvitset yrityskoodin admin tason käyttäjältä</p>
                    <FormInput 
                        type="text"
                        label="company code"
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