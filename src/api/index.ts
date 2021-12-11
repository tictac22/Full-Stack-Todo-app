import axios from "axios";

export const BASE_URL = "https://todoapp231.herokuapp.com"

export const api = axios.create({
    withCredentials:true,
    baseURL:BASE_URL
})

api.interceptors.request.use(config=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
})
api.interceptors.response.use(config=>config, async error=>{
    const originalRequest = error.config;
    if(error.response.status === 401 && originalRequest && !originalRequest.retry) {
        originalRequest.retry = true
        try {
            const response = await axios.get(`${BASE_URL}/user/refresh`,{withCredentials: true})
            localStorage.setItem("token",response.data.accessToken);
            return api.request(originalRequest)
        }
        catch(e) {
        }
    }
    throw error; 
})
export class ErrorHandler extends Error {
    message;
    type;
    errors;
    constructor(message:string,type:string,errors:[]) {
        super(message)
        this.message = message
        this.type = type
        this.errors = errors
    }
}