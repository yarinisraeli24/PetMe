import React, {createContext, useState} from 'react';
import { getToken } from '../common/utils';
export const UserDataContext = createContext();

export const UserDataProvider = ({children}) => {
    const [token, setToken] = useState(getToken())
    return (
        <UserDataContext.Provider value={{
            token,
            setToken,
        }}>
            {children}
        </UserDataContext.Provider>
    )
}

export const UserDataConsumer = UserDataContext.Consumer;