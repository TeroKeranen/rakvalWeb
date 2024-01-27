import { useState } from "react";
import { uploadData } from 'aws-amplify/storage';
import { useDispatch } from "react-redux";
import { addWorksiteFloorplanKey } from "../features/company/companySlice";

const AddFloorplanImg = ({worksiteId}) => {
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(null); // Käytetään tätä näytttämään kuvan preview
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState('');
    
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        console.log("fiilee", file);
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(URL.createObjectURL(file));
            setSelectedFile(file); // Tallenna tiedosto lähetykseen
        }
    }
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const uploadImageToS3 = async () => {

        if (selectedFile && title) {
            
            try {
                const key = `${new Date().getTime()}-my-image.jpg`;
                const result = await uploadData({
                    key: key,
                    data: selectedFile,
                    options: {
                        contentType: 'image/jpeg'
                    }
                    
                }).result;
                dispatch(addWorksiteFloorplanKey({worksiteId, key, title}))
                setSelectedFile(null);
                setTitle('');
                console.log("onnistui", result);
            } catch (error) {
                console.log("errore", error);
            }
        }
       
    };
    return (
        <section>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>Lisää kuva</button>
            <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Valitse kuva </h3>
                <input type="text" placeholder="Anna otsikko kuvalle" value={title} onChange={handleTitleChange} />
                <input type="file" className="file-input w-full max-w-xs" onChange={handleImageChange}/>
                {selectedImage && <img src={selectedImage} alt="Preview" className="mt-4" />}
                <p className="py-4">Press ESC key or click the button below to close</p>
                <div className="modal-action">
                {selectedFile && <button onClick={uploadImageToS3}>tallenna</button>}
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                </form>
                </div>
            </div>
            </dialog>
        </section>
    )
}

export default AddFloorplanImg;