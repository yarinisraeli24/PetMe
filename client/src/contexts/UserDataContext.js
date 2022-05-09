import React, {createContext, useState} from 'react';
import { useEffect } from 'react';
import { getToken } from '../common/utils';
import {getUserDetails } from '../common/serverApi'
export const UserDataContext = createContext();

export const UserDataProvider = ({children}) => {
    const [token, setToken] = useState(getToken())
    const [userData, setUserData] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [finishedWizard, setFinishedWizard] = useState(true);

    const clearData = () => {
        setUserData({})
        setIsAdmin(false)
        setFinishedWizard(true)
    }

    useEffect(()=> {
        if(token){
        const getUserData = async () => {
            const data = await getUserDetails();
            setUserData(data)
            setIsAdmin(data.permissions === 'admin')
            setFinishedWizard(!!data?.preferences) 
        }
        getUserData()
    } else {
        clearData()
    }
    }, [token])
    return (
        <UserDataContext.Provider value={{
            token,
            setToken,
            setUserData,
            finishedWizard,
            setFinishedWizard,
            userData,
            isAdmin,
        }}>
            {userData && children}
        </UserDataContext.Provider>
    )
}

export const UserDataConsumer = UserDataContext.Consumer;