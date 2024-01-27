import { useEffect } from "react";


const MarkerDetails = ({marker, setActiveMarker}) => {
    const url = "https://rakval7aa91a47d6bf4bffbcb7aa26cf06c2b294331-rakval.s3.eu-west-1.amazonaws.com/public/"
    console.log("markerdetails",marker)
    useEffect(() => {
        // Avaa dialogi, kun komponentti on ladattu
        const dialog = document.getElementById('my_modal_2');
        if (dialog) {
            dialog.showModal();
        }
    },[])

    const handleClose = () => {
        setActiveMarker(null);
    }

    return (
        <section>
             {/* Open the modal using document.getElementById('ID').showModal() method */}
            
            <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
                <div className="mb-5">
                    <p>{marker.created}</p>
                    <p>{marker.creator}</p>
                </div>
                <h3 className="font-bold text-lg">{marker.info}</h3>
                {marker.imageUri && <img src={`${url}${marker.imageUri}`} style={{width: '100%', height: '100%'}} alt="image" className="mt-4" />}
                
                
               
                <p className="py-4"></p>
                <div className="modal-action">
                
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn" onClick={handleClose}>Close</button>
                </form>
                </div>
            </div>
            </dialog>
        </section>
    )
}

export default MarkerDetails;