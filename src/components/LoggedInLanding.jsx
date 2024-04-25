import { useState } from "react";
import LandingPageEvents from "./LandingPageEvents";
import LandingPageEventsButton from "./LandingPageEventsButton";
import LandingPageWorkOn from "./LandingPageWorkOn";
import LandingpageWorksiteProgress from "./LandingpageWorksiteProgress";
import logoImage from '../assets/logo-no-background.png'

const LoggedInLanding = ({events, worksites}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 5;
    const totalPages = Math.ceil(events.length / eventsPerPage);
  
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    

    return (
        <div className="flex flex-row justify-between" >
            <div className=" w-4/5 mx-auto " style={{backgroundImage: `url(${logoImage})`, backgroundSize: '50%', backgroundRepeat: 'no-repeat',backgroundPosition: "center", }}>
                

                    <div className="flex justify-around min-h-100" >

                        <div className="my-5 w-1/4">
                            <LandingPageWorkOn worksites={worksites}/>
                        </div>
                        <div className="my-5 w-1/3 ">
                            
                            <LandingpageWorksiteProgress worksites={worksites}/>
                        </div>
                    </div>

                   


            </div>

            <div className="flex flex-col border rounded p-1 mr-5 my-5 bg-base-200">
                     
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