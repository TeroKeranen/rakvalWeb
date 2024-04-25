import { calculateTotaWorkTime, convertToMinutes } from "../utils/calculateWorkhours";

const LandingpageWorksiteProgress = ({worksites}) => {




    return (
        <div className="bg-base-200 max-h-100 grid grid-cols-3 gap-1 rounded-lg">
            
            {worksites.map((item, index) => {
            
            const duehours = item?.duehours // otetaan talteen varatut työtunnit
            
            // Kutsutaan calculateTotaWorkTime saadaksemme tehdyt työtunnit
            

                const workTimeString = calculateTotaWorkTime(item.workDays);  // "0h 34min"
                const workedMinutes = convertToMinutes(workTimeString);
                // Lasketaan käytetty aika prosentteina
                const totalDueMinutes = duehours * 60;  // Muunna duehours minuuteiksi
                const usedPercentage = (workedMinutes / totalDueMinutes) * 100;
            
                
                if (item.workDays.length > 0) {
                    
                    return (

                        <div key={index} className="bg-base-100 m-3 p-1 rounded">
                            <div className="">

                                <p className="text-center">{item.address}</p>
                                {usedPercentage && <progress className="progress w-full" value={usedPercentage} max="100"></progress>}
                            </div>
                            

                        </div>
                    )
                }
            })}
        </div>
    )

}

export default LandingpageWorksiteProgress;