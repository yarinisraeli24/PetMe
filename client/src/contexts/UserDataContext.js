import React, {createContext, useState} from 'react';
import { useEffect } from 'react';
import { getToken } from '../common/utils';
export const UserDataContext = createContext();

export const UserDataProvider = ({children}) => {
    useEffect(()=> {
        const getUserData = async () => {
            const data = await getUserDetials();
            setData(data)
        }
        getUserData()
    }, [])
    const [token, setToken] = useState(getToken())
    const [data, setData] = useState({});
    return (
        <UserDataContext.Provider value={{
            token,
            setToken,
            setData,
            ...data
        }}>
            {children}
        </UserDataContext.Provider>
    )
}

export const UserDataConsumer = UserDataContext.Consumer;