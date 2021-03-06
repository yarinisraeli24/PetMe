import axios from "axios";
import { getToken } from "./utils";

let refresh = false;

axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
);

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh && getToken()) {
        refresh = true;
        localStorage.setItem('token', localStorage.getItem('refreshToken'))
        const response = await axios.get('/users/refreshToken');
        
        if (response.status === 200) {
            const {accessToken,refreshToken, data} = response.data;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            
            return axios(error.config);
        }
    }
    refresh = false;
    return error;
});

//General Endpoints

export const login = async (payload) => {
    const { data } = await axios.post('/login', payload);
    return data;
}

export const logout = async () => {
    await axios.get('/logout')
}

export const register = async (payload) => {
    await axios.post('/register', payload)
}

//Pets Endpoints

export const takeMeHome = async (petId, associationId, userId) => {
    const { data } = await axios.get(`/pets/takeMeHome?petId=${petId}&associationId=${associationId}&userId=${userId}`)
    return data
}

export const getAllPets = async () => {
    const response = await axios.get('/pets/getAllPets');
    return response
}

//Admin Endpoints

export const createNewPet = async (petData) => {
    const { data } = await axios.post('/admin/createPet', petData);
    return data;
}
export const getAssociationPets = async (associationId) => {
    const response = await axios.get(`/admin/getAllPets?id=${associationId}`);
    return response
}

export const getTakeMeHomeRequests = async (associationId) => {
    const {data} = await axios.get(`/admin/getAllTakeMeHome?associationId=${associationId}`);
    return data
}

export const removeTakeMeHome = async (requestId) => {
    await axios.get(`/admin/removeTakeMeHome?requestId=${requestId}`)
}

export const getBiEvents = async(eventType, associationId, withUsersData, withPetsData ) => {
    const {data} = await axios.get(`/admin/getBiEvents?eventType=${eventType}&associationId=${associationId}&withUsersData=${withUsersData}&withPetsData=${withPetsData}`)
    return data; 
}

//Users Endpoints

export const userUpdate = async (payload) => {
    const { data } = await axios.post('/users/userUpdate', payload);
    return data;
}

export const addPetToFavorites = async (userId, petId) => {
    await axios.post('/users/addPet', {userId, petId})
}
export const addPetToViewed= async (userId, petId) => {
    await axios.post('/users/addPetToViewed', {userId, petId})
}
export const getUserFavoritePets = async (userId) => {
    const { data } = await axios.post('/users/getFavoritePets', {userId})
    return data
}
export const getUserDetails = async () => {
    const { data } = await axios.get('/users/getUserDetails')
    return data
}
export const setUserDetails = async (paylod) => {
    await axios.put('/users/setUserDetails',paylod)
}

export const getSimilarPets = async (userId) => {
    const { data } = await axios.post('/users/getSimilarPets', {userId})
    return data
}

