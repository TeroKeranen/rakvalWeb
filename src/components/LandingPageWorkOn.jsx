import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, fetchUserDetails } from "../features/auth/authSlice";
import { useTranslation } from "react-i18next";


const LandingPageWorkOn = ({worksites, userInfo}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState({})
    const userRole = userInfo.user.role;
    const userId = userInfo.user._id;
   
    const theme = useSelector(state => state.userState.theme)
    const boxShadowClass = theme === 'dracula' ? 'shadow-customDracula' : 'shadow-customWinter'




    //Funktio suodattamaan näytettävät käyttäjät roolin perusteella
    const filterWorksiteForUserRole = (activeWorkerIds) => {
    if (userRole === 'admin' || userRole === 'superAdmin') {
        return activeWorkerIds; // Palautetaan kaikkien käyttäjien kellotukset
    } else {
        return activeWorkerIds.filter(id => id === userId); // Palautetaan vain käyttäjän oma kellotus
    }
    };
    /// UUUUSI 
    const calculateActiveTimeForUser = (workDays, userId) => {
        // Etsi käyttäjän käynnissä oleva kellotus
        const runningDay = workDays.find(day => day.running === true && day.workerId === userId);
    
        if (runningDay) {
            const startDate = runningDay.startDate.split('.').reverse().join('-'); // Muutetaan muotoon "YYYY-MM-DD"
            const startTime = new Date(`${startDate}T${runningDay.startTime}`);
    
            if (isNaN(startTime.getTime())) {
                console.error("Invalid date or time format for startTime:", startTime);
                return "Invalid time";
            }
    
            const currentTime = new Date(); // Nykyinen aika
            const timeDifference = currentTime - startTime; // Erotus millisekunneissa
    
            const hours = Math.floor(timeDifference / (1000 * 60 * 60)); // Tunnit
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)); // Minuutit
    
            if (hours === 0 && minutes > 0) {
                return `${minutes}m`; // Palauta vain minuutit, jos tunteja ei ole
            }
    
            return `${hours}h ${minutes}m`; // Palauta tunnit ja minuutit
        }
    
        return "N/A"; // Jos ei aktiivista kellotusta
    };



    //// UUUSI
    useEffect(() => {
        const findRunningWorksites = () => {
               // Luo uusi lista käynnissä olevista työmaista
            const runningWorkSites = worksites.reduce((acc, worksite) => {
                const activeWorkDays = worksite.workDays.filter(day => day.running);

                

                if (activeWorkDays.length > 0) {
                    acc.push({
                        worksiteInfo: worksite,
                        activeWorkerIds: activeWorkDays.map(day => day.workerId) // Kaikki käyttäjät, joilla on aktiivinen kellotus
                    });
                }
                return acc;
            }, []);
        }
        findRunningWorksites();

        const interval = setInterval(findRunningWorksites, 60000)

        return () => clearInterval(interval); 

    },[worksites])
    
    // Luo uusi lista käynnissä olevista työmaista
    const runningWorkSites = worksites.reduce((acc, worksite) => {
        const activeWorkDays = worksite.workDays.filter(day => day.running);

        if (activeWorkDays.length > 0) {
            acc.push({
                worksiteInfo: worksite,
                activeWorkerIds: activeWorkDays.map(day => day.workerId) // Kaikki käyttäjät, joilla on aktiivinen kellotus
            });
        }
        return acc;
    }, []);
    
    const filteredRunningWorksites = runningWorkSites.filter(site => {
        if (userRole === 'admin' || userRole === 'superAdmin') {
            return true;
        } else {
            return site.activeWorkerIds.includes(userId);
        }
    })

    
    
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

        
        return (
            <section className={`bg-base-200 rounded-lg p-6 ${boxShadowClass}`}>
            <div className="text-center">
                <h1 className="text-xl font-bold">{t('landingpageworkon')}</h1>
            </div>

            {filteredRunningWorksites.map((worksite, index) => (
                <div key={index} className="p-4">
                    <h2 className="text-lg font-semibold text-center">{worksite.worksiteInfo.address}</h2>
                    <ul>
                        {filterWorksiteForUserRole(worksite.activeWorkerIds).map((id, idx) => (
                            <li
                                key={idx}
                                className="bg-base-100 rounded m-2 border-indigo-600 p-3 flex flex-col justify-center items-center"
                            >
                                {userDetails[id] ? (
                                    <div className="flex flex-col w-full">
                                        <p className="truncate max-w-full overflow-hidden text-ellipsis whitespace-nowrap m-2">
                                            {userDetails[id].email}
                                            
                                        </p>
                                        
                                        <div className="w-16 h-16 bg-base-300 rounded-full flex justify-center items-center animate-heartbeat">
                                            <p className="text-xs">{calculateActiveTimeForUser(worksite.worksiteInfo.workDays, id)}</p>
                                        </div>
                                    </div>
                                ) : (
                                    'Loading...'
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className="divider"></div>
                </div>
            ))}
        </section>
    )

}


export default LandingPageWorkOn;