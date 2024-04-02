import { FormInput, SubmitBtn } from "../components";
import { Form, Link,redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { loginUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getTokenExpiry } from "../utils/calculateTokenExp";

export const action = (store) => async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    

    try {
        const response = await customFetch.post('/signin', data)
        const tokenExpiry = getTokenExpiry(response.data.accessToken);
        
        console.log("response", response);
        const userData = {
            ...response.data,
            tokenExpiry
        }
        
        store.dispatch(loginUser(userData))
        
        // console.log(response);
        return redirect('/');
        // return null;
    } catch (error) {
        
        console.log("errormessage", error);
        
        return null;
    }
}

const Login = () => {
    
    return (
        <section className="h-screen grid place-items-center">
            

                <Form method="post" className="card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">

                    <h4 className="text-center text-3xl font-bold">Login</h4>

                    <FormInput 
                        type="email" 
                        label="email" 
                        name="email" 
                        defaultValue=""
                        />
                    <FormInput 
                        type="password"
                        label="password"
                        name="password"
                        defaultValue=""
                        />
                    <div className="mt-4">
                        <SubmitBtn text="login" />
                    </div>
                    <p className="text-center">Ei tunnuksia? Rekisteröidy tästä linkistä <Link to="/register" className="ml-2 link link-hover link-primary capitalize">rekisteröidy</Link> </p>
                </Form>
            
        </section>
    )
}

export default Login;