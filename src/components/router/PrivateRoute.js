import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import {LOGIN} from '../../config/router/paths';
import useAuthContext from '../../hooks/useAuthContext';

const PrivateRoute = () => {
    const {user} = useAuthContext();

    if(!user){
        return <Navigate to={LOGIN} />;
    }

    return (
        <div>
            <Outlet />
        </div>
    )
};
  
export default PrivateRoute;