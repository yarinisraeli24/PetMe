import React, {createContext, useState, useContext, useEffect} from 'react';
import {getAssociationPets, getTakeMeHomeRequests } from '../common/serverApi'
import { UserDataContext } from './UserDataContext';

export const AdminContext = createContext();

export const AdminProvider = ({children}) => {
    const { userData } = useContext(UserDataContext);
    const [petsData, setPetsData] = useState([]);
    const [takeMeRequests, setTakeMeRequests] = useState([]);

    const getPetsData = async () => {
        if(userData.id){
            const {data} = await getAssociationPets(userData.id);
            setPetsData(data);
        }
    }

    const getAllTakeMeRequests = async () => {
        if(userData.id){
            const requests = await getTakeMeHomeRequests(userData.id) 
            setTakeMeRequests(requests);
        }
    }

    useEffect(()=> {
        const initAdminData = async () => {
            await Promise.all([getPetsData(), getAllTakeMeRequests()])
        }
        initAdminData()
    }, [userData.id])

    return (
        <AdminContext.Provider value={{petsData, takeMeRequests, setTakeMeRequests}}>
            {children}
        </AdminContext.Provider>
    )
}

export const AdminConsumer = AdminContext.Consumer;