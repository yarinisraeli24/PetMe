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
        const response = await axios.post('/users/refreshToken', {}, {headers: {'Authorization': `Basic `}});
        debugger;
        
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

export const getAllPets = async () => {
    const response = await axios.get('/pets/getAllPets');
    return response
}

