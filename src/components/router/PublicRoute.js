import useAuthContext from "../../hooks/useAuthContext";
import { Navigate, Outlet } from "react-router-dom";
import {PRIVATE} from '../../config/router/paths';


const PublicRoute = () => {
    const {user} = useAuthContext();

    if(user){
        return <Navigate to={PRIVATE} />;
    }

    return (
        <div> 
            <Outlet /> 
        </div>
    )
};
  
export default PublicRoute;