import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {startWorkDay, endWorkDay} from '../features/worksite/worksiteSlice'
import { toast } from "react-toastify";
import WorkEntriesButton from "./WorkEntriesButton";
import {fetchUser} from '../features/auth/authSlice'


const WorkEntries = () => {

    const dispatch = useDispatch();
    const allWorkEntries = useSelector(state => state.companyState.worksiteDetails.workDays) // katsotaan kaikki työmaan kirjaukset
    const userRole = useSelector(state => state.userState?.user?.role); // otetaan ylös käyttäjän rooli
    const userId = useSelector(state => state.userState?.user._id); // otetaan ylös käyttäjän id
    const [ownWorkEntries, setOwnWorkEntries] = useState([]);
    const [workEntriesWithUserDetails, setWorkEntriesWithUserDetails] = useState([]);
    // console.log(allWorkEntries);



    
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
            const userDetailsPromises = allWorkEntries.map(workEntry => 
              dispatch(fetchUser(workEntry.workerId)).then(action => {
                if (action.type === 'user/fetchUser/fulfilled') {
                  return { ...workEntry, userName: action.payload.email };
                } else {
                  return { ...workEntry, userName: 'N/A' };
                }
              })
            );
    
            const results = await Promise.all(userDetailsPromises);
            setWorkEntriesWithUserDetails(results);
          };
    
          fetchUsers();
        }
      }, [dispatch, allWorkEntries, userRole]);

    //   console.log(workEntriesWithUserDetails)

     
    const entriesToShow = userRole === 'admin' ? workEntriesWithUserDetails : ownWorkEntries;
    
    return (
        <section className="flex flex-col border-2 w-full h-auto">
            <div className="mx-auto my-6">
                <WorkEntriesButton />
            </div>
            <div className="border-2">
                <h1 className="">Kirjaukset</h1>
                {entriesToShow.map((workEntry, index) => {
                    
                    if (workEntry.running) {
                        return (
                            <div key={index}>
                                <p>kesken</p>
                            </div>
                        )
                    } else {

                        return (
                            <div className=" bg-green-300 border-2 rounded-lg p-2 my-2 bg- w-5/6 mx-auto" key={index}>
                                {userRole === 'admin' && <p>{workEntry.userName}</p>}
                                <p className="text-neutral-800">Aloitettu: {workEntry.startDate} {workEntry.startTime}</p>
                                <p className="text-neutral-800">Lopetettu: {workEntry.endDate} {workEntry.endTime}</p>
                            </div>
                        )
                    }
                })}
            </div>
        </section>
    )
}

export default WorkEntries;