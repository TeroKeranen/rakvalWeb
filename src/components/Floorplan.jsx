import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MarkerDetails from "./MarkerDetails";


const Floorplan = () => {
    const url = "https://rakval7aa91a47d6bf4bffbcb7aa26cf06c2b294331-rakval.s3.eu-west-1.amazonaws.com/public/"
    const {id} = useParams();
    const worksiteDetails = useSelector(state => state.companyState.worksiteDetails)
    
    const [activeMarker, setActiveMarker] = useState(null); // asetetaan klikattavan markerin tiedot tänne, josta ne viedään MarkerDetails komponenttiin.
    

    const worksiteFloorplankeys = worksiteDetails.floorplanKeys;
    const markers = worksiteDetails.markers;

    

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
                {worksiteFloorplankeys.map((floorplan, index) => (
                    <div id={`item${index}`} className=" w-full flex justify-center" key={floorplan._id}>
                        <div className="w-full max-w-sm lg:max-w-md mx-auto relative">
                            <h2>{floorplan.title}</h2>
                            {/* <div style={{width: "500px", height: "600px", overflow: "hidden", position: "relative"}}>

                            </div> */}
                                <img src={`${url}${floorplan.key}`} style={{ width: "100%", height: "auto",objectFit: 'contain' }} />
                            {/* Renderöi tämän kuvan markerit */}
                            {markers.filter(marker => marker.floorplanIndex === index).map((marker, markerIndex) => {
                                
                                const scaledPosition = scaleMarkerPosition(marker);
                                return (
                                    <div 
                                        key={markerIndex} 
                                        style={{ 
                                            position: 'absolute', 
                                            left: scaledPosition.x, 
                                            top: scaledPosition.y,
                                            backgroundColor: 'red',
                                            width: "10px",
                                            height: "20px",
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