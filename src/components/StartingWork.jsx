import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";



const StartingWork = ({futureStart}) => {

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const theme = useSelector(state => state.userState.theme)
    const boxShadowClass = theme === 'dracula' ? 'shadow-customDracula' : 'shadow-customWinter'


    // const handleClick = (address, city, startTime) => {
    //     console.log(`Address: ${address}, City: ${city}, Start Time: ${startTime}`);
    // };

    if (futureStart.length < 1) {
        return (
            <div>
                <p>Ei alkavia työmaita</p>
            </div>
        )
    }

    return (
             
        <div className={`bg-base-200 rounded-lg p-6  grid grid-cols-1 lg:grid-cols-3 gap-4 ${boxShadowClass}`}>

            {futureStart.map((item, index) => {

                
                const {_id, address, city, startTime} = item;
                return (
                    <Link to={`/worksites/${_id}`} key={_id} >
                        <div key={_id}  className="bg-white p-2 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:scale-110">
                                <p className="text-black ">{address}</p>
                                <p className="text-black ">{city}</p>
                                <p className="text-black ">{startTime}</p>
                        </div>
                    </Link>
                )

            })}
        </div>
    )

}


export default StartingWork;