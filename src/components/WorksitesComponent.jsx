import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyDetails,deleteWorksite } from "../features/company/companySlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";



const WorksitesComponent = ({worksites, userInfo}) => {
    const dispatch = useDispatch();
    const {email, _id, role} = userInfo;
    const theme = useSelector(state => state.userState.theme);
    

    
    
    

    const boxBgColor = theme === 'dracula' ? 'bg-white' : 'bg-'
    const boxShadowClass = theme === 'dracula' ? 'shadow-customDracula' : 'shadow-customWinter'
    
     // Suodata työmaat tyypin perusteella
     const regularWorksites = worksites.filter(worksite => worksite.worktype === 'Construction site' && (role ==='admin' || worksite.workers.includes(_id)));
     const smallWorksites = worksites.filter(worksite => worksite.worktype === 'Private client' &&( role ==='admin' || worksite.workers.includes(_id)));


     useEffect(() => {
        
     },[worksites])
     
    const handleDelete = async (worksiteId) => {

        try {
            
            await dispatch(deleteWorksite(worksiteId)).unwrap();
            toast.success('työmaa poistettu onnistuneesti')

        } catch (error) {
            toast.error('Virhe työmaan poistossa: ', + error.message)
        }
            
    }

    
       // Renderöi työmaat collapse-komponentissa
    const renderWorksites = (worksites) => (
        
        worksites.map(({ address, city, _id }, index) => (
            <div key={_id} className={`bg-slate-100 py-4 ${boxShadowClass} rounded-lg overflow-hidden mb-4 text-center mx-auto w-full lg:w-1/2 ${index === 0 ? 'mt-4' : ''}`}>

            <MdDeleteOutline onClick={() => handleDelete(_id)} className="w-6 h-6 cursor-pointer active:bg-violet-600 "/>
            <Link to={`/worksites/${_id}`} key={_id} className="block">
                
                <div >
                    <h1 className="text-lg font-semibold text-gray-800">{address}</h1>
                    <h1 className="text-md text-gray-600">{city}</h1>
                </div>
            </Link>
            </div>
        ))
    );

 

    return (
        <section className="w-9/12 mx-auto mt-10">
            <div className="flex justify-center py-3">
                {role === 'admin' && 
                
                    <Link to="/addworksite">
                        <button className="btn border-blue-100">add worksite</button>
                    </Link>
                }
            </div>
            <div className="collapse bg-base-200">
                <input type="checkbox" className="peer" /> 
                <div className="text-slate-950 text-center text-lg font-semibold lg:text-xl lg:font-bold text- collapse-title bg-slate-100 text-primary-content peer-checked:bg-slate-100 peer-checked:text-secondary-content">
                    Työmaat
                </div>
                <div className="collapse-content bg-slate-100 text-primary-content peer-checked:bg-slate-800 peer-checked:text-secondary-content"> 
                    {renderWorksites(regularWorksites)}
                </div>
            </div>

            <div className="collapse bg-base-200 mt-4 ">
                <input type="checkbox" className="peer" /> 
                <div className="text-slate-950 text-center text-lg font-semibold lg:text-xl lg:font-bold collapse-title bg-slate-100 text-primary-content peer-checked:bg-slate-100 peer-checked:text-secondary-content ">
                    Pikkukeikat
                </div>
                <div className="collapse-content bg-slate-100 text-primary-content peer-checked:bg-slate-800 peer-checked:text-secondary-content"> 
                    {renderWorksites(smallWorksites)}
                </div>
            </div>
        
        </section>
    )
    
}


export default WorksitesComponent;