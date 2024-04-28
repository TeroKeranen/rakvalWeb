import mapImage from '../assets/map.jpg'
import { calculateTotaWorkTime, convertDate, convertToMinutes } from '../utils/calculateWorkhours';
import { useTranslation } from 'react-i18next';

const SingleWorksiteLanding = ({worksiteDetails}) => {

    
    const {t} = useTranslation(); 
    const duehours = worksiteDetails?.duehours // otetaan talteen varatut työtunnit
    
    console.log("WORKdAYS", worksiteDetails.workDays)



        // Kutsutaan calculateTotaWorkTime saadaksemme tehdyt työtunnit
    const workTimeString = calculateTotaWorkTime(worksiteDetails.workDays);  // "0h 34min"
    const workedMinutes = convertToMinutes(workTimeString);
    // Lasketaan käytetty aika prosentteina
    const totalDueMinutes = duehours * 60;  // Muunna duehours minuuteiksi
    const usedPercentage = (workedMinutes / totalDueMinutes) * 100;

    console.log("used", usedPercentage)
    return (
        
            <div className="bg-base-200 h-full w-full">
                <div className="card w-96 bg-base-100 shadow-xl image-full mx-auto w-full">
                    <figure><img src={mapImage} alt="Shoes" style={{opacity: 0.7}}/></figure>
                    <div className="card-body">
                        <h1 className="card-title mx-auto">{worksiteDetails.city}</h1>
                        <h2 className="mx-auto">{worksiteDetails.address}</h2>

                        <div className='flex flex-col justify-between h-full '>

                        <div>
                            <p>{t('singleWorksiteLandingEstimated')}: {duehours} {t('hours')}</p>
                            <p>{t('singleWorksiteLandingSpent')}: {(workedMinutes / 60).toFixed(2)} {t('hours')}</p>
                        </div>

                        <div>

                        {duehours &&
                        
                        
                        <div className="bg-primary-content skeleton mt-20 w-24 h-24 md:w-32 md:h-32 flex justify-center items-center">
                                
                                <div className=''>
                                    <div className="radial-progress" style={{"--value":usedPercentage.toFixed(0)}} role="progressbar">{usedPercentage.toFixed(2)}%</div>
                                </div>
                            </div>
                        
                    }

                    </div>
                    </div>
                    
                        <div className="card-actions justify-end">
                            
                        </div>
                    </div>
                </div>
            </div>
        
    )

}


export default SingleWorksiteLanding;