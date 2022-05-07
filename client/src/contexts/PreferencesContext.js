import React, {createContext, useState, useEffect} from 'react';

export const PreferencesContext = createContext();

export const PreferencesProvider = ({children}) => {

    const [preferencesData, setPreferencesData] = useState({})

    const updatePreferences = (data) => {
        setPreferencesData((prevState) => {
            return{
                ...prevState, 
                ...data,
            }
        })
    }
    return (
        <PreferencesContext.Provider value={{updatePreferences, preferencesData}}>
            {children}
        </PreferencesContext.Provider>
    )
}

export const PreferencesConsumer = PreferencesContext.Consumer;