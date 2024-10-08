import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {startWorkDay, endWorkDay,worksiteReady} from '../features/worksite/worksiteSlice'
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { confirmAlert } from "react-confirm-alert";


const WorkEntriesButton = ({companyWorksites}) => {
    const {t} = useTranslation();
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

    const datePicker = () => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Muista lisätä 1 kuukauteen
        const year = currentDate.getFullYear();
        const thisDay = `${day}.${month}.${year}`;
    
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    
        const timeOnly = `${hours}:${minutes}:${seconds}`;
        
        return timeOnly;
    }

    const handleEndDay = () => {
        const endTime = datePicker();
        const onGoingWorkDay = workDay.find((workDay) => workDay.workerId === userId && workDay.running === true);
        const workDayId = onGoingWorkDay?._id;
        
        if (onGoingWorkDay) {
            setDayIsOn(false);
            dispatch(endWorkDay({worksiteId, workDayId,  endTime}))
            toast.success("Nauhoitus suljettu")
        } else {
            toast.error("Tapahtui virhe");
        }

    }
    



    const handleStartDay = () => {

        
        // Katsotana onko käyttäjällä työpäivä käynnissä jossain työmaalla
        const onGoingWorkDayAnyWorksite = isRunningWorkDayOnAnyWorksite(userId);
        const onGoingWorkDay = workDay.find((workDay) => workDay.workerId === userId && workDay.running === true);
        const startTime = datePicker();
        
        if (onGoingWorkDayAnyWorksite || onGoingWorkDay) {
            toast.error('Nauhoitus päällä jossain')
        } else {
            setDayIsOn(true);
            toast.success('Aloitetaan nauhoitus')
            dispatch(startWorkDay({ worksiteId,userId, startTime }));
        }
        // console.log("jatketaan");
     
    };

    const handleWorksiteReady = () => {
        const onGoingWorkDay = workDay.find((workDay) => workDay.workerId === userId && workDay.running === true);

        if (onGoingWorkDay) {
            toast.error(t('workEntries-btn-recordOn'))
        } else {

            confirmAlert({
                title: t('confirmTitle'),
                message: t('confirmText'),
                buttons: [
                    {
                        label: 'Ok',
                        onClick: () => {
                            
                            dispatch(worksiteReady({ worksiteId }))
                                .then(response => {
                                    
                                        toast.success(t('workEntries-btn-worksiteReady-success'))
                                    })
                                .catch(error => {
                                    toast.error(t('fail'))
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
        
    }

    return (
        <section>
            <div className="flex justify-around">

            {!worksiteIsReady && (dayIsOn ?
                <button className="btn border-blue-100 bg-base-300" onClick={handleEndDay}>{t('workEntries-btn-worksiteReady-endDay')}</button> :
                <button className="btn border-blue-100 bg-base-300" onClick={handleStartDay}>{t('workEntries-btn-worksiteReady-startDay')}</button>
                
                )}
            {!worksiteIsReady && !dayIsOn ? 
                <button className="btn border-blue-100 bg-base-300" onClick={handleWorksiteReady}>{t('workEntries-btn-worksiteReady')}</button> : null
            }
            </div>

             {/* {dayIsOn ? <button className="btn border-blue-100 bg-red-600" onClick={handleEndDay}>Lopeta työpäivä</button> : <button className="btn border-blue-100 bg-green-400" onClick={handleStartDay}>Aloita työpäivä</button>} */}
            {/* <button onClick={handleStartDay}>{onGoingWorkDay ? "Lopeta työpäivä" : "aloita työpäivö"}</button> */}
        </section>
    )
}

export default WorkEntriesButton;