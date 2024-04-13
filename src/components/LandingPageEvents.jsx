import { changeEventsTimestamp } from "../utils/eventsTimeStamp";


const LandingPageEvents = ({events}) => {


    const renderEvents = () => {

        
        return events.map((event, index) => {
            console.log(event.timestamp)
            const userEmail = event.user && event.user.email ? event.user.email : "Ei sähköpostia";
            return (
                <div className="border my-2 p-2 rounded-lg" key={index}>
                        {event.timestamp && <p>{changeEventsTimestamp(event.timestamp)}</p>}
                        <p>{event.type}</p>
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