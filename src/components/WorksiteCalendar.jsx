import { useSelector } from "react-redux";
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { useState,useEffect } from "react";
import './CalendarStyles.css'

const WorksiteCalendar = () => {
    const [activeDates, setActiveDates] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const calendarEntries = useSelector(state => state.companyState.worksiteDetails.calendarEntries);

    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    useEffect(() => {
        const datesWithEntries = calendarEntries
            .filter(entry => entry && entry.date)
            .map(entry => ({
                ...entry,
                date: new Date(entry.date + "T00:00:00")
            }));
        setActiveDates(datesWithEntries);
    }, [calendarEntries]);
    
    const tileClassName = ({ date, view }) => {
        if (view === 'month' && date) {
            const calendarDate = formatDate(date);
            if (activeDates.some(d => formatDate(d.date) === calendarDate)) {
                return 'activeDate';
            }
        }
    };
    
    const handleDayClick = (value, event) => {
        const clickedDate = formatDate(value);
        const entry = activeDates.find(d => formatDate(d.date) === clickedDate);
        console.log(entry)
        setSelectedEntry(entry);
    };


    // console.log("calendar",testi);

    return (
        <div>
            <style>
            {`
                .activeDate {
                    background-color: red; /* tai haluamasi väri */
                    color: white;
                }
            `}
        </style>
            <h1>Calendar</h1>
            <Calendar
                tileClassName={tileClassName}
                onClickDay={handleDayClick}
                
            />
            {selectedEntry && (
                <div className="my-3 p-3  bg-stone-200">
                    <h2 className="text-neutral-800 font-bold">{selectedEntry._id}</h2>
                    <h2 className="text-neutral-800 font-bold">{selectedEntry.title}</h2>
                    <h2 className="text-neutral-800 font-bold">{selectedEntry.text}</h2>
                </div>
            )}
        </div>
    )
}

export default WorksiteCalendar;