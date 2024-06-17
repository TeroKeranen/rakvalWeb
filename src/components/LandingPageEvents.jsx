import React, { useState } from 'react';
import { changeEventsTimestamp } from "../utils/eventsTimeStamp";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const LandingPageEvents = ({ events }) => {
    const {t} = useTranslation();
    const [filter, setFilter] = useState('');
    const theme = useSelector(state => state.userState.theme)
    
    const boxShadowClass = theme === 'dracula' ? 'shadow-customDracula' : 'shadow-customWinter'

    // console.log("events", events)
    const eventTypeToText = {
        "work-start": t('work-start'),
        "work-end": t('work-end'),
        "added-marker": t('added-marker'),
        "update-marker": t('update-marker'),
        "remove-marker": t('remove-marker'),
        "added-calendarmark": t('added-calendarmark'),
        "updated-calendarmark": t('updated-calendarmark'),
        "deleted-calendarmark": t('deleted-calendarmark')
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
                <div className="mx-auto border-b my-0 p-0 rounded-lg" style={{width: '300px'}} key={index}>
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
                placeholder={t('search')}
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="mb-4 p-2 border rounded w-full"
            />
            {renderEvents()}
        </div>
    );
};

export default LandingPageEvents;