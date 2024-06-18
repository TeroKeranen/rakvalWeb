import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {BsCart3, BsMoonFill, BsSunFill} from 'react-icons/bs'
import { deleteAccount } from "../features/auth/authSlice";
import { confirmAlert } from 'react-confirm-alert'; // Import


const Profile = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const user = useSelector((state) => state.userState.user)
    const theme = useSelector(state => state.userState.theme)
    
    const boxShadowClass = theme === 'dracula' ? 'shadow-customDracula' : 'shadow-customWinter'

    // const handleTheme = () => {
        
    //     dispatch(toggleTheme());
        
        
    // }

    const deletesAccount = async () => {
        confirmAlert({
            title: t('deleteAccount'),
            message: t('areUsure'),
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => {
                        
                        dispatch(deleteAccount())
                            .then(response => {
                                // console.log("DELETE2", response);
                                toast.success(t('succeeded'))
                            })
                            .catch(error => {
                                toast.error(t('fail'))
                            })     
                        
                    }
                },
                {
                    label: "No",
                    onClick: () => {}
                }
            ]
        })
    }

    return (
        <section className="h-screen">

        <div className={`text-center lg:py-0 mt-20 bg-base-200 rounded-lg ${boxShadowClass} mx-auto w-full lg:w-1/2`}>

            <div className="h-3/5 py-10 lg:py-20">
                <h1 className="">{user.email}</h1>
                <h1 className="">{t('role')}: {user.role}</h1>
            </div>

            <div className="flex flex-row justify-around">

                <div className=" text-end py-5 lg:py-5">
                    <Link to="/changepassword">
                            <button className="btn border-blue-100 mr-10">vaihda salasana</button>
                    </Link>
                <button className="btn border-blue-100" onClick={() => deletesAccount()} >Poista tunnuksesi</button>
                </div>
                {/* <div className="py-5 lg:py-5 my-auto">
                    
                        <label className="swap swap-rotate">
                            <input type="checkbox" onChange={handleTheme} />
                            
                            <BsSunFill className="swap-on h-4 w-4" />
                            
                            <BsMoonFill className="swap-off h-4 w-4" />
                        </label>
                    
                </div> */}
            
            </div>
            
        </div>
        </section>
    )

}

export default Profile;