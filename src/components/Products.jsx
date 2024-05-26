import { Form } from "react-router-dom";
import FormInput from "./Forminput";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addProductToWorksite,deleteProductFromWorksite, updateProductOnWorksite } from "../features/worksite/worksiteSlice";
import { MdDeleteOutline, MdBorderColor } from "react-icons/md";
import { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

const Products = ({worksiteDetails}) => {
    const worksiteStates = useSelector(state => state.companyState);
    // console.log("worksitestates",worksiteStates)
    
    const products = worksiteDetails?.products;
    const {t} = useTranslation()
    const dispatch = useDispatch();
    const worksiteId = worksiteDetails._id;
    const theme = useSelector(state => state.userState.theme)
    const boxShadowClass = theme === 'dracula' ? 'shadow-customDracula' : 'shadow-customWinter'


    // useEffect(() => {
    //     console.log("Päivitetään");
    // },[worksiteDetails.products])

    const handleSubmit = async (event) => {
        event.preventDefault();
       
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        console.log(data);

        dispatch(addProductToWorksite({
            worksiteId,
            productData: {
                productName: data.productName,
                quantity: Number(data.quantity)
            }
        }))

    }

    const handleDelete = async (productId) => {
        if (!productId) {
            return;
        }

        confirmAlert({
            title: t('product-delete-title') ,
            message: t('product-delete-text'),
            buttons: [
                {
                    label: "Ok",
                    onClick: () => {
                        dispatch(deleteProductFromWorksite({worksiteId, productId}))
                        .then(result => {
                            toast.success(t('succeeded'))
                        })
                        .catch(error => {
                            toast.error(t('fail'))
                        })
                    }
                },
                {
                    label: t('no'),
                    onClick: () => {}
                }

            ]
        })
        
    }

    const handleUpdate = async (event,productId) => {
        event.preventDefault();
        const modalId = `product_modal_${productId}`; // Oletetaan, että modal ID on muodostettu tuotteen ID:stä
        const modal = document.getElementById(modalId);
        modal.close();
        
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        const productData = data;
        
        
        confirmAlert({
            
            title: "Muokkaa tuotetta",
            message: "Oletko varma että haluat muokata tuotetta",
            buttons: [
                {
                    label: "Ok",
                    onClick: () => {
                        dispatch(updateProductOnWorksite({worksiteId, productId, productData}))
                            .then(response => {
                                toast.success(t('succeeded'))
                            })
                            .catch(error => {
                                toast.error(t('fail'))
                            })
                    }
                },
                {
                    label: t('no'),
                    onClick: () => {}
                }
            ]
        })
        
        

    }

    return (
        <div className="flex flex-col lg:flex-row justify-around  w-full h-full ">

        <section className="mx-auto">
            

            <Form method="post" onSubmit={handleSubmit} className={`card lg:w-96  p-8 bg-base-100  flex flex-col gap-y-4 ${boxShadowClass}`}>

                <h4 className="text-center text-3xl font-bold">Lisää tuote</h4>

                <FormInput
                    type="text" 
                    label="tuotteen nimi"
                    name="productName" 
                    defaultValue=""
                    />
                <FormInput 
                    type="text"
                    label="määrä"
                    name="quantity"
                    defaultValue=""
                    />
               
                

             

                <div className="mt-4">
                    {/* <SubmitBtn text="lisää" />
                    */}
                    <button type="submit" className="btn btn-primary btn-block">
                        {t('add')}
                    </button>
                </div>
                
            </Form>
    
        </section>
        <div className="mx-auto">
            {products.map((product,index) => {
                const modalId = `product_modal_${product._id}`
                return(

                <div className={`${boxShadowClass} lg:w-96 m-3 p-8 bg-base-200 rounded-lg flex flex-col gap-y-4`} key={index}>
                    <p>Tuote: {product.name} {product.quantity}Kpl</p>
                    <p>{product._id}</p>

                    <div className='flex flex-row justify-between'>
                        <MdDeleteOutline  className="hover:text-red-600 w-6 h-6 cursor-pointer active:bg-violet-600 " onClick={() => handleDelete(product._id)}/>
                        <MdBorderColor className="hover:text-green-600 w-6 h-6 cursor-pointer active:bg-violet-600 " onClick={() => document.getElementById(modalId).showModal()}/>
                    </div>

                    {/* Modal  */}
                    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
                        <div className="flex modal-box">
                            <section className="mx-auto ">
                                

                                <Form method="post" onSubmit={(event) => {console.log("Form submitted"); handleUpdate(event,product._id )}} className={`card lg:w-96  p-8 bg-base-100  flex flex-col gap-y-4 ${boxShadowClass}`}>

                                    <h4 className="text-center text-3xl font-bold">Muokkaa tuotetta</h4>

                                    <FormInput
                                        type="text" 
                                        label="tuotteen nimi"
                                        name="productName" 
                                        defaultValue={product.name}
                                        />
                                    <FormInput 
                                        type="text"
                                        label="määrä"
                                        name="quantity"
                                        defaultValue={product.quantity}
                                        />

                                        <div className="modal-action mt-4 mx-auto">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                {/* <button className="btn" >Close</button> */}
                                                <button className="btn" >{t('cancel')}</button>
                                            </form>
                                        </div>
                                        <div className="flex flex-row justify-around">

                                            <div className="mt-4">
                                                {/* <SubmitBtn text="lisää" />
                                                */}
                                                <button type="submit" className="btn btn-primary btn-block">
                                                    {t('update')}
                                                </button>
                                            </div>
                                        </div>                                  
                                </Form>
                        
                            </section>
                        </div>
                    </dialog>

                </div>
                )
            })}
        </div>
        </div>
    )

}

export default Products;