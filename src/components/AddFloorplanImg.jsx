import { useState } from "react";
import { uploadData } from 'aws-amplify/storage';
import { useDispatch } from "react-redux";
import { addWorksiteFloorplanKey } from "../features/company/companySlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const AddFloorplanImg = ({worksiteId}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(null); // Käytetään tätä näytttämään kuvan preview
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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

    const closeModal = () => {
        setSelectedFile(null);
        setSelectedImage(null);
        setTitle("")
    }

    const uploadImageToS3 = async () => {
        setIsLoading(true);
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
                    .then(result => {
                        toast.success(t('addfloorplanimg-succes'))
                        setIsLoading(false);
                        setSelectedFile(null);
                        setSelectedImage(null);
                        setTitle('');
                    })
                    .catch(error => {
                        
                        setIsLoading(false);
                        toast.error(t('addfloorplanimg-error'))
                    })
                
            } catch (error) {
                
                setIsLoading(false);
                toast.error(t('addfloorplanimg-error'))
            }
        } if (!selectedFile || !title) {

            setIsLoading(false);
            toast.error(t('addfloorplanimg-errorNoTitle'))
        }
       
    };

    if (isLoading) {
        return (

    <section className="text-center">
                        <span className="loading loading-spinner loading-xs bg-green-900"></span>
                        <span className="loading loading-spinner loading-sm bg-green-800"></span>
                        <span className="loading loading-spinner loading-md bg-green-700"></span>
                        <span className="loading loading-spinner loading-lg bg-green-600"></span>
                    </section>
        )
    }
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
                    <button onClick={closeModal} className="btn">{t('close')}</button>
                </form>
                </div>
            </div>
            </dialog>
        </section>
    )
}

export default AddFloorplanImg;