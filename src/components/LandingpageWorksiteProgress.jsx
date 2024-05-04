import { useSelector } from "react-redux";
import { calculateTotaWorkTime, convertToMinutes } from "../utils/calculateWorkhours";

const LandingpageWorksiteProgress = ({worksites,  userInfo}) => {


    const theme = useSelector(state => state.userState.theme)
    const boxShadowClass = theme === 'dracula' ? 'shadow-customDracula' : 'shadow-customWinter'
    const userRole = userInfo.user.role;
    const userId = userInfo.user._id;

    
    // filteröidään työmaat ja näytetään peruskäyttäjälle vain ne johon hänet on liitetty
    const filteredWorksites = worksites.filter(worksite => {
        if (userRole === 'admin') {
            return true;
        } else {
            return worksite.workers.includes(userId);
        }
    })
    
    return (
        <div className={`bg-base-200 max-h-100 grid grid-cols-3 gap-1 rounded-lg ${boxShadowClass}`}>
            
            {filteredWorksites.map((item, index) => {
            
                
                // Kutsutaan calculateTotaWorkTime saadaksemme tehdyt työtunnit
                
                
                const duehours = item?.duehours || 0; // otetaan talteen varatut työtunnit
                const workTimeString = calculateTotaWorkTime(item.workDays || []);  // "0h 34min"
                const workedMinutes = convertToMinutes(workTimeString);
                // Lasketaan käytetty aika prosentteina
                const totalDueMinutes = duehours * 60;  // Muunna duehours minuuteiksi
                const usedPercentage = totalDueMinutes > 0 ? (workedMinutes / totalDueMinutes) * 100 : 0;
            
                
                if (item.workDays?.length > 0 && duehours > 0) {
                    
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