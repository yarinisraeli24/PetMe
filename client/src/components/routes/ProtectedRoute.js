import React from 'react';
import { Navigate, Outlet} from 'react-router-dom';
import { getToken } from '../../common/utils';

const ProtectedRoute = ({children}) => {
    const isLoggedIn = getToken();
    return isLoggedIn ? <Navigate to="/users/swipes" /> : <Outlet /> ;
};

export default ProtectedRoute;