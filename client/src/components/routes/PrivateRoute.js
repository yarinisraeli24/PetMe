import React from 'react';
import { useContext } from 'react';
import { Navigate, Outlet} from 'react-router-dom';
import { getToken } from '../../common/utils';
import { UserDataContext } from '../../contexts/UserDataContext';
import Preferences from '../preferences/Preferences';

const PrivateRoute = ({children}) => {
    const { isAdmin } = useContext(UserDataContext);
    const isLoggedIn = !!getToken();
    const doneWizard = localStorage.getItem('doneWizard') === 'true'
    if(isLoggedIn){
        if(isAdmin)
            return <Outlet />
        return !doneWizard ? <Preferences /> : <Outlet />;
    }else {
        return <Navigate to="/login" />
    }
};

export default PrivateRoute;