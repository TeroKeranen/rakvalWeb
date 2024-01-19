import { FormInput, SubmitBtn } from "../components";
import { Form, Link,redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";

export const action = async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    
    try {
        const response = await customFetch.post('/signup', data)
        toast.success("account created successfully")
        return redirect('/verifycode')
    } catch (error) {
        console.log(error);
    }
    return null;
}



const Register = () => {
    return (
        <section className="h-screen grid place-items-center">
            

              <Form method="post" className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
                <h4 className="text-center text-3xl font-bold">Register</h4>
                
                <FormInput type="email" label="email" name="email" />
                <FormInput type="password" label="password" name="password" />

                <div className="mt-4">
                    <SubmitBtn text="register" />
                </div>
              
                <p className="text-center">Ei tunnuksia? Rekisteröidy tästä linkistä <Link to="/register" className="ml-2 link-hover link-primary capitalize" >rekisteröidy</Link> </p>
              
              </Form>
            
        </section>
    )
}

export default Register;