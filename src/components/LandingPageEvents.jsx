import { changeEventsTimestamp } from "../utils/eventsTimeStamp";


const LandingPageEvents = ({events}) => {

    const eventTypeToText = {
        "work-start": "Työ aloitettu",
        "work-end": "Työ lopetettu",
        "added-marker": "Merkintä lisätty",
        "update-marker": "Merkintää muokattu",
        "remove-marker": "Merkintä poistettu",
        "added-calendarmark": "Lisätty kalenteri merkintä",
        "updated-calendarmark": "Kalenteri merkintää muokattu",
        "deleted-calendarmark": "Kalenteri merkintä poistettu"


    };

    const renderEvents = () => {

        
        return events.map((event, index) => {
            
            const displayText = eventTypeToText[event.type] || event.type;
            const userEmail = event.user && event.user.email ? event.user.email : "Ei sähköpostia";
            const workSite = event.worksite && event.worksite.address ? event.worksite.address : "Ei löydy työmaan tietoja";
            return (
                <div className="border-b-4 my-2 p-2 rounded-lg" key={index}>
                        <div className="border rounded p-1">
                            <h1 className="text-lg text-center">{workSite}</h1>
                        </div>
                        {event.timestamp && <p>{changeEventsTimestamp(event.timestamp)}</p>}
                        <p>{displayText}</p>
                        <p>{userEmail}</p>
                        
                    </div>
                )

        })
    }

    return (
        <div>
            {renderEvents()}
        </div>
    )
}

export default LandingPageEvents