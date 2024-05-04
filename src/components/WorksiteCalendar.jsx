import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { useState,useEffect } from "react";
import './CalendarStyles.css'
import FormInput from "./Forminput";
import { addCalendarEntry, deleteCalendarEntry } from "../features/worksite/worksiteSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { MdDeleteOutline } from "react-icons/md";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Default styles


const WorksiteCalendar = () => {

    const dispatch = useDispatch();
    const {t} = useTranslation();
    const company = useSelector(state => state.companyState)
    const worksiteDetails = company?.worksiteDetails
    const worksiteId = worksiteDetails?._id;
    

    const [activeDates, setActiveDates] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState([]); // Jos kalenterissa on merkintöjä, käytetään tätä apuna
    const [selectedDay, setSelectedDay] = useState(null); // Käytetään tätä ottamaan päivämäärä ylös kun lisätään merkintä
    

    const [formData, setFormData] = useState({
        title: "",
        text: "",
        
    })

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
        
        // const entry = activeDates.find(d => formatDate(d.date) === clickedDate);
        const entries = activeDates.filter(d => formatDate(d.date) === clickedDate)
        
        setSelectedEntry(entries);
        setSelectedDay(clickedDate);
    };


    const addNewCalendarMark = () => {
        
        document.getElementById('my_modal_5').showModal()
    }

    // kalenterimerkinnän lisäykseen 
    const handleChange = (e) => {
        
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // kalenterimerkinnän lisäyksen formiin
    const handleSubmit = (e) => {
        e.preventDefault();
        const entryData = {
            date: selectedDay,
            title: formData.title,
            text: formData.text
        }

        dispatch(addCalendarEntry({worksiteId, entryData}))
            .then(unwrapResult)
            .then((result) => {
                toast.success(t('worksiteCalendarAddedSucc'))
            })
            .catch((error) => {
                toast.error(t('worksiteCalendarError'), error);
            })
        
       
    };
    
   
    const handleDelete = (id) => {
        confirmAlert({
            title: t('worksiteCalendarConfirmDel'),
            message: t('worksiteCalendarSure'),
            buttons: [
                {
                    label: "Ok",
                    onClick: () => {
                        dispatch(deleteCalendarEntry({worksiteId, entryId: id}))
                            .then(response => {
                                toast.success(t('worksiteCalendarDeleteSucc'))
                            })
                            .catch(error => {
                                toast.error(t('worksiteCalendarError'))
                            })
                    }
                    
                },
                {
                    label: "No",
                    onClick: () => {}
                }
            ]
        })
    }
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
            
            <Calendar
                tileClassName={tileClassName}
                onClickDay={handleDayClick}
                locale="en-GB"
                
            />
            {selectedEntry.length > 0 && (
                <div className="my-3 p-3  bg-stone-200">
                    {selectedEntry.map((entry, index) => (
                    
                    <div key={index} className='flex flex-col rounded-lg p-2 my-2 bg-base-200'>

                        <div className='flex flex-row justify-between rounded-lg p-2 my-2 bg-base-200'>
                                <MdDeleteOutline onClick={() => handleDelete(entry._id)} className="w-6 h-6 cursor-pointer active:bg-violet-600 "/>
                        </div>

                        
                        
                        <h2 className=" font-bold">{entry.title}</h2>
                        <h2 className=" font-bold">{entry.text}</h2>
                    </div>
                    ))}

                    
                   
                </div>
                
            )}
            {selectedDay && (
                <button onClick={addNewCalendarMark} className="btn my-5 bg-base-300 border-blue-100">
                    {t('add')}
                </button>
            )}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                
            <div className="modal-box">
                <form method="dialog">
                    <div className="modal-action">
                        <button className="btn">{t('close')}</button>
                    </div>
                </form>
                
                <div className="modal-action flex flex-col">
                    {/* if there is a button in form, it will close the modal */}
                    <div className="mx-auto">
                        <p className="py-4">{selectedDay}</p>

                        <input 
                            type="text" 
                            placeholder={t('title')} 
                            value={formData.title} 
                            onChange={handleChange} 
                            name="title" 
                            className="input input-bordered w-full max-w-xs "
                            />
                        <input 
                            type="text" 
                            name="text" 
                            placeholder="Text" 
                            value={formData.text} 
                            onChange={handleChange} 
                            className="input input-bordered w-full max-w-xs mt-3"
                            />
                    </div>
                    <button onClick={handleSubmit} className="btn border-blue-100 mt-5">{t('save')}</button>

                

                </div>
            </div>
            </dialog>
        </div>
    )
}

export default WorksiteCalendar;