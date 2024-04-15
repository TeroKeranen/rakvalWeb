import { useState } from "react";
import LandingPageEvents from "./LandingPageEvents";
import LandingPageEventsButton from "./LandingPageEventsButton";
import LandingPageWorkOn from "./LandingPageWorkOn";

const LoggedInLanding = ({events, worksites}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 5;
    const totalPages = Math.ceil(events.length / eventsPerPage);
  
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    

    return (
        <div className="flex flex-row justify-between">
            <div className=" w-4/5 mx-auto">
                <div className="grid grid-cols-2 gap-4 h-full">

                    <div className="border my-5 bg-testi h-4/5">
                        <LandingPageWorkOn worksites={worksites}/>
                    </div>
                    <div className="border my-5 bg-testi h-4/5">
                        <p>tänne jotain</p>
                    </div>
                    <div className="border my-5 bg-testi h-4/5">
                        <p>tänne jotain</p>
                    </div>

                </div>

            </div>

            <div className="flex flex-col border rounded p-1 mr-5 my-5 bg-testi">
                     
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