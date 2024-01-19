import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyDetails } from "../features/company/companySlice";
import { useEffect } from "react";


const CompanyComponent = ({companyData}) => {
    
    const {id, name, address, city, code} = companyData;
    

    return (
        <div>
            <h1>{name}</h1>
            <h1>{address}</h1>
            <h1>{city}</h1>
            <h1>{code}</h1>
        </div>
    )
    
}


export default CompanyComponent;