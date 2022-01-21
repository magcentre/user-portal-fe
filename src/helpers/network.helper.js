import axios from 'axios';
import config from '../config'
const networkInstance = axios.create({
    baseURL: config.apiEnd,
    responseType: "json",
});

networkInstance.interceptors.request.use(
    request => {
        let currentuser = sessionStorage.getItem('currentUser');
        if (currentuser) {
            currentuser = JSON.parse(currentuser);
            request.headers = {
                
                "Authorization": `Bearer ${currentuser.access.token}`,
            }
        }
        request.headers["content-type"] = 'application/json'
        return request;
    },
)

const netwotk = {
    get: async (url) => {
        return await networkInstance.get(url);
    },
    post: async (url, data) => {
        return await networkInstance.post(url, JSON.stringify(data));
    },
    patch: async (url, data) => {
        return await networkInstance.patch(url, data);
    },
    delete: async (url, data) => {
        return await networkInstance.delete(url, data);
    },
}

export default netwotk;