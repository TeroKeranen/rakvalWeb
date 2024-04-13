import { useState } from "react";
import LandingPageEvents from "./LandingPageEvents";
import LandingPageEventsButton from "./LandingPageEventsButton";

const LoggedInLanding = ({events}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 10;
    const totalPages = Math.ceil(events.length / eventsPerPage);
  
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    return (
        <div className="flex flex-row justify-between border">
            <div className="">
                <div className="grid grid-cols-2 gap-4">

                    <div className="border">
                        <p>tänne jotain</p>
                    </div>
                    <div className="border">
                        <p>tänne jotain</p>
                    </div>
                    <div className="border">
                        <p>tänne jotain</p>
                    </div>

                </div>

            </div>

            <div className="flex flex-col border mr-5">
                     
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