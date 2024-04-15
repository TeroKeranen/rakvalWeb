

const LandingPageWorkOn = ({worksites}) => {

   

  

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

   
   
    console.log("aktiiviset työmaat", runningWorkSites);
    
    return (
        <div>
            {runningWorkSites.map((worksite, index) => (
                <div key={index}>
                    <h2>{worksite.worksiteInfo.address}</h2>
                    <ul>
                        {worksite.activeWorkerIds.map((id, idx) => (
                            <li key={idx}>{id}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )

}


export default LandingPageWorkOn;