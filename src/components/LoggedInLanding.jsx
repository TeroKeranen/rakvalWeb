import { useState } from "react";
import LandingPageEvents from "./LandingPageEvents";
import LandingPageEventsButton from "./LandingPageEventsButton";
import LandingPageWorkOn from "./LandingPageWorkOn";
import LandingpageWorksiteProgress from "./LandingpageWorksiteProgress";
import logoImage from '../assets/logo-no-background.png'
import { useSelector } from "react-redux";

const LoggedInLanding = ({events, worksites, userInfo}) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 5;
    const totalPages = Math.ceil(events.length / eventsPerPage);
  
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const theme = useSelector(state => state.userState.theme)
    const boxShadowClass = theme === 'dracula' ? 'shadow-customDracula' : 'shadow-customWinter'
    

    return (
        <div className="flex flex-col md:flex-row justify-between h-screen" >
            <div className="w-full md:w-4/5 mx-auto " style={{backgroundImage: `url(${logoImage})`, backgroundSize: '50%', backgroundRepeat: 'no-repeat',backgroundPosition: "center", }}>
                

                    <div className="flex flex-col md:flex-row justify-around min-h-100" >

                        <div className="my-5 w-full md:w-1/4">
                            <LandingPageWorkOn worksites={worksites} userInfo={userInfo}/>
                        </div>
                        <div className="my-5 w-full md:w-2/4">
                            
                            <LandingpageWorksiteProgress worksites={worksites} userInfo={userInfo}/>
                        </div>
                    </div>

                   


            </div>

            <div className={`flex flex-col w-full md:w-auto rounded p-1 mr-5 my-5 bg-base-200 ${boxShadowClass}`}>
                     
                    <LandingPageEvents events={currentEvents}/>
                    <LandingPageEventsButton
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />  
            </div>

        </div>
    )

}


export default LoggedInLanding;