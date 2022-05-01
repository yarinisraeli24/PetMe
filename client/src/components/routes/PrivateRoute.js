import React from 'react';
import { Navigate, Outlet} from 'react-router-dom';
import { getToken } from '../../common/utils';
import Preferences from '../preferences/Preferences';

const PrivateRoute = ({children}) => {
    const token = getToken();
    const isLoggedIn = !!token
    const doneWizard = localStorage.getItem('doneWizard') === 'true'
    if(isLoggedIn){
        return !doneWizard ? <Preferences /> : <Outlet />;
    }else {
        return <Navigate to="/login" />
    }
};

export default PrivateRoute;