import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyDetails } from "../features/company/companySlice";
import { useEffect } from "react";


const CompanyComponent = ({companyData}) => {
    const theme = useSelector(state => state.userState.theme)
    
    const {id, name, address, city, code} = companyData;
    
    const boxShadowClass = theme === 'dracula' ? 'shadow-customDracula' : 'shadow-customWinter'
    return (
        <section className={`text-center py-10 lg:py-20 bg-slate-100 rounded-lg ${boxShadowClass} mx-auto w-full lg:w-1/2`}>
            <h1 className="text-slate-950">{name}</h1>
            <h1 className="text-slate-950">{address}</h1>
            <h1 className="text-slate-950">{city}</h1>
            <h1 className="text-slate-950">{code}</h1>
        </section>
    )
    
}


export default CompanyComponent;