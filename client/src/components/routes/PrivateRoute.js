import React from 'react';
import { Navigate, Outlet} from 'react-router-dom';
import { getToken } from '../../common/utils';

const PrivateRoute = ({children}) => {
    const isLoggedIn = getToken();
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;