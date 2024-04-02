
import { useDispatch, useSelector } from 'react-redux';
import {companyWorkers, addWorkerToWorksite, deleteWorkerfromWorksite} from '../features/company/companySlice'
import {fetchUser, clearWorksiteWorkersNames} from '../features/auth/authSlice'
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";

const WorksiteWorkers = () => {
    const dispatch = useDispatch();
    const worksiteId = useSelector(state => state.companyState.worksiteDetails._id); // haetan työmaan id
    const company = useSelector(state => state.companyState.company); // haetaan yritys
    
    const workers = useSelector(state => state.companyState.companyWorkers); // haetaan yrityksen työntekijät
    const companyId = company?._id; // haetaan yrityksen id
    const worksiteWorkers = useSelector(state => state.companyState.worksiteDetails.workers); // haetaan työmaahan liitetyt työntekijöitten id:t
    const worksiteWorkersNames = useSelector(state => state.userState.usersById); // haetaan kaikki työntekijät jotka on lisätty työmaalle
    
    const [selectedWorker, setSelectedWorker] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    

    

    
    const handleSelectChange = (event) => {
        setSelectedWorker(event.target.value);
    }


    

   
    
    // Haetaan työntekijät jotka ovat yrityksessa ja tallennetaan ne companyStaten companyWorkers 
    useEffect(() => {
        // Vain, jos companyId on saatavilla ja työntekijöitä ei ole vielä haettu
        if (company && company._id && !workers) {
            dispatch(companyWorkers(companyId));
        }
    }, [dispatch,companyId, workers,worksiteWorkersNames]);


    // Tyhjennetään usersById userStatesta ja haetaan työntekijöitten tiedot uudestaan sinne...
    useEffect(() => {
        if (worksiteWorkers && worksiteId) {
            dispatch(clearWorksiteWorkersNames());

            worksiteWorkers.map((userId) => {
                setIsLoading(true);
                dispatch(fetchUser(userId)) // tuodaan työntekijöitten tiedot tämän kautta useStaten.usersById
                    .unwrap()
                    .then(data => {
                        if(data) {

                            setIsLoading(false);   
                        } else {
                            setIsLoading(true);
                        }
                    })
            })
            
        }
    },[dispatch,worksiteId, worksiteWorkers])


    // Lisätään työntekijä työmaalle
    const handleSendWorker = () => {
        setIsLoading(true);
        

            dispatch(addWorkerToWorksite({worksiteId,workerId:selectedWorker}))
                .unwrap()
                .then(updatedWorksite => {
                    setIsLoading(false);
                    
                    if (updatedWorksite.message) {
                        toast.error(updatedWorksite.message);
                    } else {
                        toast.success("Työntekijä lisätty työmaalle")
                    }
                })
                
                .catch(error => {
                    console.log("hääää", error);
                })
        
    }
    
    // Työntekijän poistamiseen
    const handleDelete = (userId) => {
        setIsLoading(true);
        dispatch(deleteWorkerfromWorksite({worksiteId, workerId:userId}))
            .unwrap()
            .then (updateWorksite => {
                setIsLoading(false);
                if (updateWorksite.message) {
                    toast.success(updateWorksite.message)
                } else {
                    toast.error("jotain meni pieleen");
                }
            })
            .catch(error => {
                toast.error("Jotain meni vikaan")
                console.log("error työntekijän poistamisessa");
                
            })
        
    }



   
    

    return (
        <div className='flex flex-col  w-full h-full '>

            <div className='flex justify-center flex-col my-5'>
                
                    <div className='mx-auto'>
                        <select className='p-2 rounded-md' value={selectedWorker} onChange={handleSelectChange}>
                            <option value="">Valitse työntekijä</option>
                            {workers && workers.map((worker, index) => (
                                <option key={index} value={worker._id}>
                                    {worker.email}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='mx-auto my-3'>
                        <button className='btn p-1border-blue-100 bg-green-600' onClick={handleSendWorker}>Lisää</button>
                    </div>
                
                
            </div>
            <div className='mx-auto w-3/4 p-4'>
                <h1 className='flex justify-center text-2xl font-bold'>Työmaalle lisätyt henkilöt</h1>
                {isLoading ? (
                    <section className="text-center">
                        <span className="loading loading-spinner loading-xs bg-green-900"></span>
                        <span className="loading loading-spinner loading-sm bg-green-800"></span>
                        <span className="loading loading-spinner loading-md bg-green-700"></span>
                        <span className="loading loading-spinner loading-lg bg-green-600"></span>
                    </section>
                ): (
                    worksiteWorkersNames && Object.values(worksiteWorkersNames).map((user, index) => (
                    

                        <div className='border-2 flex flex-row justify-between rounded-lg p-2 my-2' key={index}>
                            <p>{user.email}</p>
                            <MdDeleteOutline onClick={() => handleDelete(user._id)} className="w-6 h-6 cursor-pointer active:bg-violet-600 "/>
                        </div>
                        
                    ))
                )}
                
                
            </div>
            
        </div>
    )
}

export default WorksiteWorkers;