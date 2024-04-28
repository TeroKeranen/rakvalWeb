import { useState } from "react";
import { uploadData } from 'aws-amplify/storage';
import { useDispatch } from "react-redux";
import { addWorksiteFloorplanKey } from "../features/company/companySlice";
import { useTranslation } from "react-i18next";

const AddFloorplanImg = ({worksiteId}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(null); // Käytetään tätä näytttämään kuvan preview
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState('');
    
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        
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
            <button className="btn border-blue-100" onClick={()=>document.getElementById('my_modal_1').showModal()}>{t('addImg')}</button>
            <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{t('selectImg')}</h3>
                <input type="file" className="file-input w-full max-w-xs" onChange={handleImageChange}/>
                <input className="p-2 rounded-lg mt-3" type="text" placeholder={t('title')} value={title} onChange={handleTitleChange} />
                {selectedImage && <img src={selectedImage} alt="Preview" className="mt-4" />}
                <p className="py-4">{t('exit')}</p>
                <div className="modal-action">
                {selectedFile && <button onClick={uploadImageToS3}>{t('save')}</button>}
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">{t('close')}</button>
                </form>
                </div>
            </div>
            </dialog>
        </section>
    )
}

export default AddFloorplanImg;