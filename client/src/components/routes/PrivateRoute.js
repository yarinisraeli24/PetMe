import React from 'react';
import { useContext } from 'react';
import { Navigate, Outlet} from 'react-router-dom';
import { getToken } from '../../common/utils';
import { UserDataContext } from '../../contexts/UserDataContext';
import Preferences from '../preferences/Preferences';

const PrivateRoute = ({children}) => {
    const { isAdmin, finishedWizard } = useContext(UserDataContext);
    const isLoggedIn = !!getToken();
    if(isLoggedIn){
        if(isAdmin)
            return <Outlet />
        return !finishedWizard ? <Preferences /> : <Outlet />;
    }else {
        return <Navigate to="/login" />
    }
};

export default PrivateRoute;