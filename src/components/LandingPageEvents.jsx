import React, { useState } from 'react';
import { changeEventsTimestamp } from "../utils/eventsTimeStamp";

const LandingPageEvents = ({ events }) => {
    const [filter, setFilter] = useState('');

    console.log("events", events)
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
        // Suodatetaan tapahtumat hakuehdon perusteella
        const filteredEvents = events.filter(event => {
            // Tarkistetaan tapahtumatyyppi ja kuvaus
            const eventTypeDescription = eventTypeToText[event.type] || event.type;
            const typeMatch = eventTypeDescription.toLowerCase().includes(filter.toLowerCase()) || event.type.toLowerCase().includes(filter.toLowerCase());
    
            // Tarkistetaan käyttäjän sähköposti
            const userEmail = event.user && event.user.email ? event.user.email : "";
            const emailMatch = userEmail.toLowerCase().includes(filter.toLowerCase());
    
            // Tarkistetaan työmaan nimi
            const workSite = event.worksite && event.worksite.address ? event.worksite.address : "";
            const workSiteMatch = workSite.toLowerCase().includes(filter.toLowerCase());
    
            return typeMatch || emailMatch || workSiteMatch;
        });
    
        return filteredEvents.map((event, index) => {
            const displayText = eventTypeToText[event.type] || event.type;
            const userEmail = event.user && event.user.email ? event.user.email : "Ei sähköpostia";
            const workSite = event.worksite && event.worksite.address ? event.worksite.address : "Ei löydy työmaan tietoja";
            return (
                <div className="border-b-4 my-0 p-0 rounded-lg" style={{width: '300px'}} key={index}>
                    <div className="p-1 flex flex-col items-center">
                        <h1 className="text-lg text-center">{workSite}</h1>
                        {event.timestamp && <p>{changeEventsTimestamp(event.timestamp)}</p>}
                        <p>{displayText}</p>
                        <p>{userEmail}</p>
                    </div>
                </div>
            );
        });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Hae tapahtumatyypeillä..."
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="mb-4 p-2 border rounded w-full"
            />
            {renderEvents()}
        </div>
    );
};

export default LandingPageEvents;