import axios from "axios";

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
    if (error.response.status === 401 && !refresh) {
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

export const getAllPets = async () => {
    const response = await axios.get('/pets/getAllPets');
    return response
}

export const createNewPet = async (petData) => {
    const { data } = await axios.post('/pets/createPet', petData);
    return data;
}

//Users Endpoints
export const addPetToFavorites = async (userId, petId) => {
    await axios.post('/users/addPet', {userId, petId})
}

export const getUserFavoritePets = async (userId) => {
    const { data } = await axios.post('/users/getFavoritePets', {userId})
    return data
}
export const getUserDetails = async () => {
    const { data } = await axios.get('/users/getUserDetails')
    console.log(data)
    return data
}

