import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {startWorkDay, endWorkDay} from '../features/worksite/worksiteSlice'
import { toast } from "react-toastify";
import WorkEntriesButton from "./WorkEntriesButton";
import {fetchUser} from '../features/auth/authSlice'


const WorkEntries = () => {

    const dispatch = useDispatch();
    const testi = useSelector(state => state.userState);
    const allWorkEntries = useSelector(state => state.companyState.worksiteDetails.workDays) // katsotaan kaikki työmaan kirjaukset
    const userRole = useSelector(state => state.userState?.user?.role); // otetaan ylös käyttäjän rooli
    const userId = useSelector(state => state.userState?.user._id); // otetaan ylös käyttäjän id
    const [ownWorkEntries, setOwnWorkEntries] = useState([]);
    const [workEntriesWithUserDetails, setWorkEntriesWithUserDetails] = useState([]);

    const usersById = useSelector(state => state.userState.usersById);

    console.log("testi", testi);



    
    useEffect(() => {

        if (userRole === 'admin') {
            setOwnWorkEntries(allWorkEntries);
        } else {
            const ownWorksites = allWorkEntries.filter(workEntry => workEntry.workerId === userId);
            setOwnWorkEntries(ownWorksites);

        }

    },[allWorkEntries, userId])

    useEffect(() => {
        if (userRole === 'admin' && allWorkEntries.length > 0) {
            const fetchUsers = async () => {
                const userDetailsPromises = allWorkEntries.map(workEntry => {
                    const userInStore = usersById[workEntry.workerId];
    
                    if (userInStore) {
                        return Promise.resolve({ ...workEntry, userName: userInStore.email });
                    } else {
                        return dispatch(fetchUser(workEntry.workerId)).then(action => {
                            if (action.type === 'user/fetchUser/fulfilled') {
                                return { ...workEntry, userName: action.payload.email };
                            } else {
                                return { ...workEntry, userName: 'N/A' };
                            }
                        });
                    }
                });
    
                const results = await Promise.all(userDetailsPromises);
                const reservedEvents = [...results].reverse();
                setWorkEntriesWithUserDetails(reservedEvents);
            };
    
            fetchUsers();
        }
    }, [dispatch, allWorkEntries, userRole, usersById]);
    //   console.log(workEntriesWithUserDetails)

     
    const entriesToShow = userRole === 'admin' ? workEntriesWithUserDetails : ownWorkEntries;
    
    return (
        <section className="flex flex-col  w-full h-auto">
            <div className="mx-auto my-6">
                <WorkEntriesButton />
            </div>
            <div className="">
                
                {entriesToShow.map((workEntry, index) => {
                    
                    if (workEntry.running) {
                        return (
                            <div className=" bg-red-400 border-2 rounded-lg p-2 my-2 w-3/5 mx-auto" key={index}>
                                {userRole === 'admin' && <p className="text-neutral-800 font-bold">{workEntry.userName}</p>}
                                <p className="text-neutral-800 text-lg">Aloitettu: {workEntry.startDate} {workEntry.startTime}</p>
                                <p className="text-neutral-800 text-lg">Lopetettu: {workEntry.endDate}</p>
                            </div>
                        )
                    } else {

                        return (
                            <div className=" bg-green-200 border-2 rounded-lg p-2 my-2 bg- w-3/5 mx-auto" key={index}>
                                {userRole === 'admin' && <p className="text-neutral-800 font-bold">{workEntry.userName}</p>}
                                <p className="text-neutral-800 text-lg">Aloitettu: {workEntry.startDate} {workEntry.startTime}</p>
                                <p className="text-neutral-800 text-lg">Lopetettu: {workEntry.endDate} {workEntry.endTime}</p>
                            </div>
                        )
                    }
                })}
            </div>
        </section>
    )
}

export default WorkEntries;