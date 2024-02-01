import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {startWorkDay, endWorkDay} from '../features/worksite/worksiteSlice'
import { toast } from "react-toastify";


const WorkEntries = () => {

    const dispatch = useDispatch();
    const details = useSelector(state => state.companyState.worksiteDetails); // Valitun työmaan tiedot
    const companyWorksites = useSelector(state => state.companyState.worksites);
    const userId = useSelector(state => state.userState.user._id); // Käyttäjän id
    const workDay = details.workDays // valitun työmaan workDays tiedot
    const worksiteId = details._id; // valitun työmaan id;

    

    const [dayIsOn, setDayIsOn] = useState(false);
    
    

    const isRunningWorkDayOnAnyWorksite = () => {
        // Käydään läpi jokainen työmaa
        for (const worksite of companyWorksites) {
            // Tarkistetaan, onko työmaalla käynnissä olevia työpäiviä
            const runningWorkDay = worksite.workDays.find(workDay => workDay.running === true);
            if (runningWorkDay) {
                return true; // Löytyi käynnissä oleva työpäivä
            }
        }
        return false; // Ei löytynyt käynnissä olevaa työpäivää
    };

    
    
    
    useEffect(() => {
        const onGoingWorkDay = workDay.find((workDay) => workDay.workerId === userId && workDay.running === true);
        // console.log("onkoonko", onGoingWorkDay.running);
        if (onGoingWorkDay && onGoingWorkDay.running) {
            setDayIsOn(true);
        } else {
            setDayIsOn(false);
        }

    },[workDay,worksiteId])


    const handleEndDay = () => {
        const onGoingWorkDay = workDay.find((workDay) => workDay.workerId === userId && workDay.running === true);

        if (onGoingWorkDay) {
            setDayIsOn(false);
            dispatch(endWorkDay({worksiteId}))
            toast.success("Nauhoitus suljettu")
        } else {
            toast.error("Tapahtui virhe");
        }

    }
    const handleStartDay = () => {

        
        // Katsotana onko käyttäjällä työpäivä käynnissä jossain työmaalla
        const onGoingWorkDayAnyWorksite = isRunningWorkDayOnAnyWorksite();
        const onGoingWorkDay = workDay.find((workDay) => workDay.workerId === userId && workDay.running === true);
        
        if (onGoingWorkDayAnyWorksite || onGoingWorkDay) {
            toast.error('Nauhoitus päällä jossain')
        } else {
            setDayIsOn(true);
            toast.success('Aloitetaan nauhoitus')
            dispatch(startWorkDay({ worksiteId }));
        }
        console.log("jatketaan");
     
    };

    return (
        <div>
            {dayIsOn ? <button className="btn border-blue-100 bg-red-600" onClick={handleEndDay}>Lopeta työpäivä</button> : <button className="btn border-blue-100 bg-green-400" onClick={handleStartDay}>Aloita työpäivä</button>}
            {/* <button onClick={handleStartDay}>{onGoingWorkDay ? "Lopeta työpäivä" : "aloita työpäivö"}</button> */}
        </div>
    )
}

export default WorkEntries;