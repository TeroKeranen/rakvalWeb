import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({children}) => {
    const user = useSelector((state) => state.userState.user);
    // console.log(user);
    if (!user) {
        return <Navigate to="/login" />


    }

    if (user && !user.isVerified) {
        return <Navigate to="/verifycode" />
    }

    return children;
}


export default ProtectedRoute;