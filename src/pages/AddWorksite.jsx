import { Form } from 'react-router-dom';
import {FormInput, SubmitBtn } from '../components'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {addNewWorksite} from '../features/company/companySlice'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";





const AddWorksite = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const company = useSelector(state => state.companyState);
    
    const [workType, setWorkType] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Työn tyypin valitsemiseen handler
    const workTypeHandler = (event) => {
        setWorkType(event.target.value);
        // console.log("työn tyyppi", event.target.value);
    }

    const handleSubmit = async (event) => {
        
        
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        const newData = {...data, worktype:workType}
        
        try {
            
            await dispatch(addNewWorksite(newData)).unwrap()
            toast.success("Työmaan lisäys onnistui")
            navigate(-1); // Palaa takaisin edelliselle sivulle
        } catch (error) {
            toast.error('työmaan lisäys epäonnistui')
        } finally {
            setIsLoading(false)
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
    return (
        <section className="h-screen grid place-items-center">
            

                <Form method="post" onSubmit={handleSubmit} className="card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">

                    <h4 className="text-center text-3xl font-bold">Login</h4>

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
                    <FormInput 
                        type="text"
                        label="starting date"
                        name="startTime"
                        defaultValue=""
                        />
                    
                    <select className="select select-bordered w-full max-w-xs" value={workType} onChange={workTypeHandler}>
                        <option value="">Type</option>
                        <option>Private client</option>
                        <option>Construction site</option>
                    </select>

                    <FormInput 
                        type="number"
                        label="due Hours"
                        name="duehours"
                        defaultValue=""
                    />

                    <div className="mt-4">
                        {/* <SubmitBtn text="lisää" />
                         */}
                         <button type="submit" className="btn btn-primary btn-block">
                            Lisää työmaa
                         </button>
                    </div>
                    
                </Form>
            
        </section>
    )
}

export default AddWorksite;