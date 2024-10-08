import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MarkerDetails from "./MarkerDetails";
import {fetchAwsUrl, getSignedUrl} from '../features/auth/authSlice'
import { MdDeleteOutline } from "react-icons/md";


const Floorplan = () => {
    const dispatch = useDispatch();
    
    const {id} = useParams();
    
   
    const worksiteDetails = useSelector(state => state.companyState.worksiteDetails)
    const loading = useSelector(state => state.companyState);
    const url = useSelector(state => state.userState.urls) // HAKEE routen kautta aws url...
    const [floorplans, setFloorplans] = useState([]);
    
    
    const [activeMarker, setActiveMarker] = useState(null); // asetetaan klikattavan markerin tiedot tänne, josta ne viedään MarkerDetails komponenttiin.
    
    useEffect(() => {
        dispatch(fetchAwsUrl()); // haetaan backendistä aws url
    },[])
        
        

    const worksiteFloorplankeys = worksiteDetails.floorplanKeys;
    const markers = worksiteDetails.markers;


    // presigned url hakeminen

    useEffect(() => {
        if (worksiteFloorplankeys) {
            const fetchUrls = async () => {
                const updatedFloorplans = await Promise.all(worksiteFloorplankeys.map(async floorplan => {
                    const response = await dispatch(getSignedUrl({
                        bucketName: import.meta.env.VITE_BUCKET_NAME,
                        objectKey: floorplan.key
                    })).unwrap()
                    return {...floorplan, signedUrl: response.url}
                }))
                setFloorplans(updatedFloorplans);
            }
            // Varmista, että floorplanKeys ei ole muuttunut
    if (worksiteFloorplankeys) {
        fetchUrls();
    }
        }
    },[dispatch])
    

    

    const originalImageWidth = 400; // Esimerkki alkuperäisestä leveydestä
    const originalImageHeight = 400; // Esimerkki alkuperäisestä korkeudesta
    const currentImageWidth = 600; // Oletetaan, että tämä on nykyinen leveys
    const currentImageHeight = 600; // Oletetaan, että tämä on nykyinen korkeus

    const scaleMarkerPosition = (marker) => {
        return {
            x: (marker.x / originalImageWidth) * currentImageWidth,
            y: (marker.y / originalImageHeight) * currentImageHeight,
        };
    };

    const handleMarkerClick = (marker) => {
        
        setActiveMarker(marker);
        
    }
    



    return (
        <div>
            
            
            <div className=" max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
                {floorplans.map((floorplan, index) => (
                    <div id={`item${index}`} className=" w-full flex justify-center my-4 border-2 p-5 rounded-lg" key={floorplan._id}>
                        <div className="w-full max-w-sm lg:max-w-md mx-auto relative">
                            <div className="flex flex-row justify-between my-2">
                                <h2 className="text-xl font-bold mx-auto">{floorplan.title}</h2>
                                {/* <div>
                                    <MdDeleteOutline className="w-6 h-6 cursor-pointer"/>
                                </div> */}
                            </div>
                            {/* <div style={{width: "500px", height: "600px", overflow: "hidden", position: "relative"}}>

                            </div> */}
                                <img src={floorplan.signedUrl || 'fallbackURL'} style={{ width: "100%", height: "auto",objectFit: 'contain' }}  />
                            {/* Renderöi tämän kuvan markerit */}
                            {markers.filter(marker => marker.floorplanIndex === index).map((marker, markerIndex) => {
                                
                                const scaledPosition = scaleMarkerPosition(marker);
                                return (
                                    <div 
                                        className="flex justify-center cursor-pointer"
                                        key={markerIndex} 
                                        style={{ 
                                            position: 'absolute', 
                                            left: scaledPosition.x, 
                                            top: scaledPosition.y,
                                            backgroundColor: 'red',
                                            width: "30px",
                                            height: "30px",
                                            borderRadius: 10
                                        }}
                                        onClick={() => handleMarkerClick(marker)}
                                    >
                                        {/* Markerin sisältö */}
                                        {marker.markerNumber}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {activeMarker && <MarkerDetails marker={activeMarker} setActiveMarker={setActiveMarker} />} 
            
            <div className="flex justify-center w-full py-2 gap-2">
                
            </div>
            
        </div>
    )
}

export default Floorplan;