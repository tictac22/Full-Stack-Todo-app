
export interface AuthResponse {
    accessToken:string,
    refreshToken:string,
    user : {
        id:string,
        isActivated:boolean,
    }
}