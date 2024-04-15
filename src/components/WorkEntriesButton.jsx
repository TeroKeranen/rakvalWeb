import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {startWorkDay, endWorkDay,worksiteReady} from '../features/worksite/worksiteSlice'
import { toast } from "react-toastify";


const WorkEntriesButton = ({companyWorksites}) => {

    const dispatch = useDispatch();
    const details = useSelector(state => state.companyState.worksiteDetails); // Valitun työmaan tiedot
    const worksiteIsReady = useSelector(state => state.companyState.worksiteDetails.isReady); // Valitun työmaan tiedot
    // const companyWorksites = useSelector(state => state.companyState.worksites);
    const userId = useSelector(state => state.userState.user._id); // Käyttäjän id
    const workDay = details.workDays // valitun työmaan workDays tiedot
    const worksiteId = details._id; // valitun työmaan id;
    const user = useSelector(state => state.userState.user);

    
    
    const [dayIsOn, setDayIsOn] = useState(false);
    
    

    // Käydään työmaat läpi, ja katsotaan onko käyttäjällä jokin työmää nauhoituksella
    const isRunningWorkDayOnAnyWorksite = (userId) => {
        // Käydään läpi jokainen työmaa
        for (const worksite of companyWorksites) {
            // Tarkistetaan, onko työmaalla käynnissä olevia työpäiviä
            
            const runningWorkDay = worksite.workDays.find(workDay => workDay.running === true && workDay.workerId === userId);
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
        const onGoingWorkDayAnyWorksite = isRunningWorkDayOnAnyWorksite(userId);
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

    const handleWorksiteReady = () => {
        const onGoingWorkDay = workDay.find((workDay) => workDay.workerId === userId && workDay.running === true);

        if (onGoingWorkDay) {
            toast.error('Nauhoitus päällä jossain')
        } else {
            
            toast.success('Työmaa merkitty valmiiski')
            dispatch(worksiteReady({ worksiteId }));
        }
        console.log("jatketaan");
    }

    return (
        <section>
            <div className="flex justify-around">

            {!worksiteIsReady && (dayIsOn ?
                <button className="btn border-blue-100 bg-red-600" onClick={handleEndDay}>Lopeta työpäivä</button> :
                <button className="btn border-blue-100 bg-green-400" onClick={handleStartDay}>Aloita työpäivä</button>
                
                )}
            {!worksiteIsReady && !dayIsOn ? 
                <button className="btn border-blue-100 bg-green-400" onClick={handleWorksiteReady}>Merkitse työmaa valmiiksi</button> : null
            }
            </div>

             {/* {dayIsOn ? <button className="btn border-blue-100 bg-red-600" onClick={handleEndDay}>Lopeta työpäivä</button> : <button className="btn border-blue-100 bg-green-400" onClick={handleStartDay}>Aloita työpäivä</button>} */}
            {/* <button onClick={handleStartDay}>{onGoingWorkDay ? "Lopeta työpäivä" : "aloita työpäivö"}</button> */}
        </section>
    )
}

export default WorkEntriesButton;