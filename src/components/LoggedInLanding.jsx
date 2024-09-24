import { useState } from "react";
import LandingPageEvents from "./LandingPageEvents";
import LandingPageEventsButton from "./LandingPageEventsButton";
import LandingPageWorkOn from "./LandingPageWorkOn";
import LandingpageWorksiteProgress from "./LandingpageWorksiteProgress";
import logoImage from '../assets/logo-no-background.png'
import { useSelector } from "react-redux";
import { futureStartTime } from "../utils/calcFutureWOrksite";
import StartingWork from "./StartingWork";

const LoggedInLanding = ({events, worksites, userInfo}) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 5;
    const totalPages = Math.ceil(events.length / eventsPerPage);
  
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const theme = useSelector(state => state.userState.theme)
    const boxShadowClass = theme === 'dracula' ? 'shadow-customDracula' : 'shadow-customWinter'

    const userRole = userInfo?.user?.role;
    const userId = userInfo?.user?._id;

    let worksitesToShow = worksites;
    
    if (userRole === "user") {
        worksitesToShow = worksites.filter(worksite => 
            worksite.workers.includes(userId)
        )
    }

    let futureStart = []; // luodaan muuttuja johon laitetaan tulevaisuudessa alkavat työmaat
    let notReadyWorksites = []; // luodaan muuttuja johon laitetaan työmaat jotka on aloitettu mutta ei ole valmiina
    const readyWorksites = worksitesToShow.filter(worksite => worksite.isReady === true);


    worksitesToShow.forEach(worksite => {

        // console.log("SKSKSK TYÖMÄÄT", worksite)
        if (!worksite) {
            return;
        }

        if (worksite.workDays || worksite.workDays.length === 0) {

            // jos workDays on tyhjä, tarkista onko työmaan aloitusaika tulevaisuudessa
           
            if (futureStartTime(worksite.startTime)) {
                futureStart.push(worksite);
            }

        } else if (!worksite.isReady) {
            notReadyWorksites.push(worksite);
        }
    })




    
    

    return (
        <div className="min-h-screen flex flex-col">
        {/* Pääsisältö */}
        <div className="flex-grow flex flex-col lg:flex-row justify-between">
            <div className="w-full md:w-4/5 mx-auto" style={{backgroundImage: `url(${logoImage})`, backgroundSize: '50%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
                <div className="flex flex-col md:flex-row justify-around min-h-100">
                    <div className="my-5 w-full md:w-1/4">
                        <LandingPageWorkOn worksites={worksites} userInfo={userInfo}/>
                    </div>
                    <div className="my-5 w-full md:w-2/4">
                        <h1 className="">Alkavat työmaat</h1> 
                        <StartingWork futureStart={futureStart}/>
                    </div>
                </div>
            </div>

            <div className={`flex flex-col w-full md:w-auto rounded p-1 mr-5 my-5 bg-base-200 ${boxShadowClass} max-h-[500px] overflow-auto`}>
                <LandingPageEvents events={currentEvents}/>
                <LandingPageEventsButton
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>

        {/* Footer */}
       
    </div>
    )

}


export default LoggedInLanding;