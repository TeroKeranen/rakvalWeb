import { Form } from "react-router-dom";
import FormInput from "./Forminput";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addProductToWorksite,deleteProductFromWorksite, updateProductOnWorksite } from "../features/worksite/worksiteSlice";
import { fetchCompanyProducts, fetchCompanyDetails} from "../features/company/companySlice"
import { MdDeleteOutline, MdBorderColor } from "react-icons/md";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";


const Products = ({worksiteDetails}) => {
    const worksiteStates = useSelector(state => state.companyState);
    const companyState = useSelector(state => state.companyState);
   
    const [selectedProduct, setSelectedProduct] = useState({
        productName: "",
        quantity: "",
        description: "",
        price: "",
        barcode: ""
      });
      
    
    const companyId = companyState?.company?._id;
    
    
    const products = worksiteDetails?.products;
    const {t} = useTranslation()
    const dispatch = useDispatch();
    const worksiteId = worksiteDetails._id;
    const theme = useSelector(state => state.userState.theme)
    const boxShadowClass = theme === 'dracula' ? 'shadow-customDracula' : 'shadow-customWinter'
    
    const companyProducts = companyState?.company?.products; // Yrityksen tietokanta tuotteet


      const handleProductClick = (product) => {
        setSelectedProduct({
        productName: product.name,
        quantity: product.quantity,
        description: product.description,
        price: product.price,
        barcode: product.barcode
        });
        document.getElementById('my_modal_1').close(); // Suljetaan modal
    }
    
    const handleSubmit = async (event) => {

        try {
            event.preventDefault();
           
            const formData = new FormData(event.currentTarget);
            const data = Object.fromEntries(formData);

   
            
            dispatch(addProductToWorksite({
                worksiteId,
                productData: {
                    productName: data.productName,
                    quantity: Number(data.quantity),
                    description: data.description,
                    barcode: data.barcode,
                    price: Number(data.price),
                    companyId
    
                },
            })).then((response) => {
                
                if (response.payload.success) {
                    dispatch(fetchCompanyProducts(companyId));
                    toast.success(t('succeeded'))

                } else {
                    toast.error(t('fail'))
                }
            }).catch((error) => {
                toast.error(t('fail'))
            })
            
        } catch (error) {
            toast.error(t('fail'))
        }

        

        


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
            
            title: t('productScreen-updateTitle'),
            message: t('productScreen-updateSure'),
            buttons: [
                {
                    label: "Ok",
                    onClick: () => {
                        dispatch(updateProductOnWorksite({worksiteId, productId, productData, companyId}))
                            .then(response => {
                                dispatch(fetchCompanyProducts(companyId));
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

  

        <section  className={`mx-auto card lg:w-96  p-8 bg-base-100  flex flex-col gap-y-4 ${boxShadowClass} max-h-screen `}>
            

            

            <Form method="post" onSubmit={handleSubmit} >

                <h4 className="text-center text-3xl font-bold">{t('add-product-title')}</h4>

                <div className="form-control">
                <label className="label">
                    <span className="label-text">{t('product')}</span>
                </label>
                <input
                    type="text"
                    name="productName"
                    value={selectedProduct.productName} // Input-kenttä sidottu tilaan
                    onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, productName: e.target.value })
                    }
                    className="input input-bordered"
                />
                </div>

                <div className="form-control">
                <label className="label">
                    <span className="label-text">{t('quantity')}</span>
                </label>
                <input
                    type="text"
                    name="quantity"
                    value={selectedProduct.quantity}
                    onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, quantity: e.target.value })
                    }
                    className="input input-bordered"
                />
                </div>

                <div className="form-control">
                <label className="label">
                    <span className="label-text">{t('description')}</span>
                </label>
                <input
                    type="text"
                    name="description"
                    value={selectedProduct.description}
                    onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, description: e.target.value })
                    }
                    className="input input-bordered"
                />
                </div>

                <div className="form-control">
                <label className="label">
                    <span className="label-text">{t('price')}</span>
                </label>
                <input
                    type="number"
                    name="price"
                    value={selectedProduct.price?.$numberDecimal || ''}
                    step="0.01"
                    onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, price: { $numberDecimal: e.target.value }})
                    }
                    className="input input-bordered"
                />
                </div>

                <div className="form-control">
                <label className="label">
                    <span className="label-text">{t('barcodeNumber')}</span>
                </label>
                <input
                    type="number"
                    name="barcode"
                    value={selectedProduct.barcode}
                    onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, barcode: e.target.value })
                    }
                    className="input input-bordered"
                />
                </div>

                

             

                <div className="mt-4">
                    {/* <SubmitBtn text="lisää" />
                    */}
                    <button type="submit" className="btn btn-primary btn-block">
                        {t('add')}
                    </button>
                </div>
                
            </Form>

    
  
            <>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>{t('productDatabase-open-btn')}</button>
                <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{t('products')}</h3>
                    {companyProducts.map((product, index) => {
                        return (
                            <div key={index} className="flex justify-center cursor-pointer border m-2" onClick={() => handleProductClick(product)}>
                                <div className="flex justify-between border w-full p-2">
                                    <p>{product.name}</p>
                                    <p>{product.quantity}</p>
                                </div>
                                
                            </div>
                        )
                    })}
                    <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                    </div>
                </div>
                </dialog>
            </>
 
                  
        </section>
        <div className="mx-auto">
            {products.map((product,index) => {
                
                const modalId = `product_modal_${product._id}`
                return(

                <div className={`${boxShadowClass} lg:w-96 m-3 p-8 bg-base-200 rounded-lg flex flex-col gap-y-4`} key={index}>
                    <p>{t('product')}: {product.name}</p>
                    <p>{t('quantity')}: {product.quantity} {t('kpl')}</p>

                    <div className='flex flex-row justify-between'>
                        <MdDeleteOutline  className="hover:text-red-600 w-6 h-6 cursor-pointer active:bg-violet-600 " onClick={() => handleDelete(product._id)}/>
                        <MdBorderColor className="hover:text-green-600 w-6 h-6 cursor-pointer active:bg-violet-600 " onClick={() => document.getElementById(modalId).showModal()}/>
                    </div>

                    {/* Modal  */}
                    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
                        <div className="flex modal-box">
                            <section className="mx-auto ">
                                

                                <Form method="post" onSubmit={(event) => {console.log("Form submitted"); handleUpdate(event,product._id )}} className={`card lg:w-96  p-8 bg-base-100  flex flex-col gap-y-4 ${boxShadowClass}`}>

                                    <h4 className="text-center text-3xl font-bold">{t('productScreen-updateTitle')}</h4>

                                    <FormInput
                                        type="text" 
                                        label={t('product')}
                                        name="productName" 
                                        defaultValue={product.name}
                                        />
                                    <FormInput 
                                        type="text"
                                        label={t('quantity')}
                                        name="quantity"
                                        defaultValue={product.quantity}
                                        />
                                    <FormInput 
                                        type="text"
                                        label={t('barcodeNumber')}
                                        name="barcode"
                                        defaultValue={product.barcode}
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