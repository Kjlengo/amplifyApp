import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import {LOGIN} from '../../config/router/paths';
import useAuthContext from '../../hooks/useAuthContext';

const PrivateRoute = ({children}) => {
    const auth = useAuthContext();
    const location = useLocation();

    if(!auth.user){
        return <Navigate to={LOGIN} state={{from: location }} replace/>;
    }

    return children;
};
  
export default PrivateRoute;