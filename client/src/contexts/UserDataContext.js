import React, {createContext, useState} from 'react';
import { useEffect } from 'react';
import { getToken } from '../common/utils';
import {getUserDetails } from '../common/serverApi'
export const UserDataContext = createContext();

export const UserDataProvider = ({children}) => {
    useEffect(()=> {
        const getUserData = async () => {
            const data = await getUserDetails();
            setData(data)
            setIsAdmin(data.permissions === 'admin')
        }
        getUserData()
    }, [])
    const [token, setToken] = useState(getToken())
    const [data, setData] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    return (
        <UserDataContext.Provider value={{
            token,
            setToken,
            setData,
            data,
            isAdmin,
        }}>
            {children}
        </UserDataContext.Provider>
    )
}

export const UserDataConsumer = UserDataContext.Consumer;