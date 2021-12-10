
import { AxiosResponse } from 'axios';
import { api, ErrorHandler } from './index';
import { AuthResponse } from './interface';
export class AuthService {
    static async registration(name:string,email:string,password:string):Promise<any> {
        try {
            const  response = await api.post<AuthResponse>("/user/registration",{name,password,email});
            localStorage.setItem("token",response.data.accessToken);
            return response.data

        } catch(e) {
            if(e.status = 500) {
                return e.response.data
            }
        }
    }
    static async login(email:string,password:string) {
            try {
                const  response = await api.post<AuthResponse>("/user/login",{password,email});
                localStorage.setItem("token",response.data.accessToken);
                return response.data
            }
            catch(e) {
                return e.response
            }
    }
    static async isAuth() {
        try {
            if(!localStorage.getItem("token")) return "";
            const response = await api.get("/user/refresh")
            localStorage.setItem("token",response.data.accessToken);
            return response.data.user;
        } catch(e) {
            const {message,type,errors} = e.response.data
            return({message,type,errors})

        }
    }
    static async activateEmail(link:string) {
        try{
            const {data} = await api.post('/user/activate/:link',{link})
            return data
        }
        catch(e) {
            const {message,type,errors} = e.response.data
            throw new ErrorHandler(message,type,errors)
        }
    }
    static async forgotPassword(email:string) {
        try {
            await api.post('/user/resetpassword',{email})
        }
        catch(e) {
            const {message,type,errors} = e.response.data
            throw new ErrorHandler(message,type,errors)
        }
    }
    static async setNewPassword(token:string,password:string) {
        try {
            await api.post('/user/setnewpassword',{token,password})
        }
        catch(e) {
            const {message,type,errors} = e.response.data
            throw new ErrorHandler(message,type,errors)
        }
    }
    static async validateToken(token:string) {
        try {
            const {data} = await api.post('/user/validatetoken',{token})
            return data
        }
        catch(e) {
            const {message,type,errors} = e.response.data
            throw new ErrorHandler(message,type,errors)
        }
    }
}