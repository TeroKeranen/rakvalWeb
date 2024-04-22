import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUser, fetchUserDetails } from "../features/auth/authSlice";


const LandingPageWorkOn = ({worksites}) => {

    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState({})
   

    
    if (!worksites) {
        return (
            <section className="text-center">
                <span className="loading loading-spinner loading-xs bg-green-900"></span>
                <span className="loading loading-spinner loading-sm bg-green-800"></span>
                <span className="loading loading-spinner loading-md bg-green-700"></span>
                <span className="loading loading-spinner loading-lg bg-green-600"></span>
            </section>
        )
    }
    const runningWorkSites = worksites.reduce((acc, worksite) => {
        // Vain ne työmaat, joilla on aktiivisia työpäiviä
        const activeWorkDays = worksite.workDays.filter(day => day.running);
        if (activeWorkDays.length > 0) {
            // Luo uusi objekti jokaiselle työmaalle, joka sisältää työmaan tiedot ja aktiiviset workerId:t
            acc.push({
                worksiteInfo: worksite,
                activeWorkerIds: activeWorkDays.map(day => day.workerId)
            });
        }
        return acc;
    }, []);

    useEffect(() => {
        runningWorkSites.forEach(site => {
            site.activeWorkerIds.forEach(id => {
                dispatch(fetchUser(id)).unwrap()
                    .then(data => {
                        setUserDetails(prevDetails => ({
                            ...prevDetails,
                            [id]: data
                        }))
                    })
                    .catch(error => console.error("failed to fetch details", error))
            })
        })
    }, [dispatch, worksites])

   
   
    
    
    return (
        <div className="bg-base-200 rounded-lg p-6 h-full">
            <div className="text-center">
                <h1 className="text-xl font-bold ">Nauhoitukset päällä</h1>
            </div>
            {runningWorkSites.map((worksite, index) => (
                <div className="" key={index}>
                    <h2 className="text-lg font-semibold">{worksite.worksiteInfo.address}</h2>
                    <ul>
                        {worksite.activeWorkerIds.map((id, idx) => (
                            <li key={idx}>
                                
                                {userDetails[id] ? userDetails[id].email : 'Loading...'}
                                
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )

}


export default LandingPageWorkOn;